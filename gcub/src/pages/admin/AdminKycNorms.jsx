import { useState, useEffect } from 'react';

const AdminKycNorms = () => {
    const [content, setContent] = useState({
        header_title: '',
        header_description: '',
        header_subtitle: '',
        companies_title: '',
        companies_subtitle: ''
    });
    const [identityDocs, setIdentityDocs] = useState([]);
    const [addressDocs, setAddressDocs] = useState([]);
    const [companyDocs, setCompanyDocs] = useState([]);
    const [editingDoc, setEditingDoc] = useState(null);
    const [newDoc, setNewDoc] = useState({ category: '', document_name: '', display_order: 0 });
    const [showAddForm, setShowAddForm] = useState({ identity: false, address: false, company: false });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchContent();
        fetchDocuments();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/kyc-norms-content');
            const data = await res.json();
            if (data) {
                setContent({
                    header_title: data.header_title || '',
                    header_description: data.header_description || '',
                    header_subtitle: data.header_subtitle || '',
                    companies_title: data.companies_title || '',
                    companies_subtitle: data.companies_subtitle || ''
                });
            }
        } catch (err) {
            console.error('Error fetching content:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchDocuments = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/kyc-documents');
            const data = await res.json();
            if (Array.isArray(data)) {
                setIdentityDocs(data.filter(d => d.category === 'identity'));
                setAddressDocs(data.filter(d => d.category === 'address'));
                setCompanyDocs(data.filter(d => d.category === 'company'));
            }
        } catch (err) {
            console.error('Error fetching documents:', err);
        }
    };

    const handleContentSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: '', type: '' });

        try {
            const res = await fetch('http://localhost:8080/api/kyc-norms-content/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content)
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'Content updated successfully!', type: 'success' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setMessage({ text: 'Error: ' + JSON.stringify(result.messages || result), type: 'error' });
            }
        } catch (err) {
            setMessage({ text: 'Network Error: ' + err.message, type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const handleAddDocument = async (category) => {
        try {
            const res = await fetch('http://localhost:8080/api/kyc-documents/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newDoc, category })
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'Document added successfully!', type: 'success' });
                setNewDoc({ category: '', document_name: '', display_order: 0 });
                setShowAddForm({ identity: false, address: false, company: false });
                fetchDocuments();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateDocument = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/kyc-documents/update/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingDoc)
            });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'Document updated successfully!', type: 'success' });
                setEditingDoc(null);
                fetchDocuments();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteDocument = async (id) => {
        if (!window.confirm('Are you sure you want to delete this document?')) return;
        try {
            const res = await fetch(`http://localhost:8080/api/kyc-documents/delete/${id}`, { method: 'POST' });
            const result = await res.json();
            if (result.status === 'success') {
                setMessage({ text: 'Document deleted successfully!', type: 'success' });
                fetchDocuments();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const renderDocumentList = (docs, category, title, icon) => (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <i className={`fas ${icon} text-${category === 'identity' ? 'green' : category === 'address' ? 'red' : 'blue'}-600`}></i>
                    {title}
                </h3>
                <button onClick={() => setShowAddForm({ ...showAddForm, [category]: !showAddForm[category] })} className="bg-[#003399] hover:bg-black text-white px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all">
                    <i className="fas fa-plus-circle mr-1"></i> Add
                </button>
            </div>

            {showAddForm[category] && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <input type="text" placeholder="Document Name" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm" value={newDoc.document_name} onChange={e => setNewDoc({ ...newDoc, document_name: e.target.value })} />
                        <input type="number" placeholder="Display Order" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm" value={newDoc.display_order} onChange={e => setNewDoc({ ...newDoc, display_order: parseInt(e.target.value) })} />
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => handleAddDocument(category)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg font-bold text-xs">Save</button>
                        <button onClick={() => setShowAddForm({ ...showAddForm, [category]: false })} className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs">Cancel</button>
                    </div>
                </div>
            )}

            <ul className="space-y-2">
                {docs.map(doc => (
                    <li key={doc.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        {editingDoc?.id === doc.id ? (
                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm" value={editingDoc.document_name} onChange={e => setEditingDoc({ ...editingDoc, document_name: e.target.value })} />
                                    <input type="number" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm" value={editingDoc.display_order} onChange={e => setEditingDoc({ ...editingDoc, display_order: parseInt(e.target.value) })} />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleUpdateDocument(doc.id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold">Save</button>
                                    <button onClick={() => setEditingDoc(null)} className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">{doc.document_name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400">Order: {doc.display_order}</span>
                                    <button onClick={() => setEditingDoc(doc)} className="text-gray-400 hover:text-[#003399] transition"><i className="fas fa-edit text-xs"></i></button>
                                    <button onClick={() => handleDeleteDocument(doc.id)} className="text-gray-400 hover:text-red-500 transition"><i className="fas fa-trash-alt text-xs"></i></button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );

    const inputStyle = "w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50";
    const labelStyle = "block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 px-0.5";

    if (loading) return <div className="p-8 text-center text-gray-500 font-inter">Loading content...</div>;

    return (
        <div className="font-inter">
            <header className="px-8">
                <h2 className="text-xl font-bold text-gray-800">KYC Norms</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Manage KYC Norms Content</p>
            </header>

            <div className="px-8 py-6 space-y-6">
                {message.text && (
                    <div className={`p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        <i className="fas fa-info-circle mr-2"></i> {message.text}
                    </div>
                )}

                {/* Header Content Form */}
                <form onSubmit={handleContentSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 space-y-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Header Content</h3>

                    <div>
                        <label className={labelStyle}>Header Title</label>
                        <input type="text" className={inputStyle} value={content.header_title} onChange={e => setContent({ ...content, header_title: e.target.value })} required placeholder="What is KYC?" />
                    </div>

                    <div>
                        <label className={labelStyle}>Header Description</label>
                        <textarea className={inputStyle} rows="3" value={content.header_description} onChange={e => setContent({ ...content, header_description: e.target.value })} required placeholder="Describe what KYC is..."></textarea>
                    </div>

                    <div>
                        <label className={labelStyle}>Header Subtitle</label>
                        <input type="text" className={inputStyle} value={content.header_subtitle} onChange={e => setContent({ ...content, header_subtitle: e.target.value })} placeholder="Please submit one document from each..." />
                    </div>

                    <div>
                        <label className={labelStyle}>Companies Section Title</label>
                        <input type="text" className={inputStyle} value={content.companies_title} onChange={e => setContent({ ...content, companies_title: e.target.value })} placeholder="For Companies / Firms" />
                    </div>

                    <div>
                        <label className={labelStyle}>Companies Section Subtitle</label>
                        <input type="text" className={inputStyle} value={content.companies_subtitle} onChange={e => setContent({ ...content, companies_subtitle: e.target.value })} placeholder="Additional documents required:" />
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={saving} className="w-full bg-[#003399] hover:bg-black text-white py-4 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-900/10">
                            {saving ? 'Updating...' : 'Update Content'}
                        </button>
                    </div>
                </form>

                {/* Document Lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderDocumentList(identityDocs, 'identity', 'Proof of Identity', 'fa-id-card')}
                    {renderDocumentList(addressDocs, 'address', 'Proof of Address', 'fa-map-marker-alt')}
                </div>

                {renderDocumentList(companyDocs, 'company', 'For Companies / Firms', 'fa-building')}
            </div>
        </div>
    );
};

export default AdminKycNorms;
