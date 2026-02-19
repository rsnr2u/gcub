import { useSearchParams } from 'react-router-dom';
import AdminAboutUs from './AdminAboutUs';
import AdminChairman from './AdminChairman';
import AdminBoardDirectors from './AdminBoardDirectors';
import AdminBoardManagement from './AdminBoardManagement';
import AdminDICGCCertificate from './AdminDICGCCertificate';

const AdminBankInfo = () => {
    const [searchParams] = useSearchParams();

    const tabMap = {
        'about-us': 'About Us',
        'chairman': 'Chairman’s Desk',
        'board-directors': 'Board of Directors',
        'board-of-management': 'Board of Management',
        'dicgc': 'DICGC Certificate',
        'ombudsman': 'Ombudsman'
    };

    const tabSlug = searchParams.get('tab') || 'about-us';
    const activeTab = tabMap[tabSlug] || 'About Us';

    // Tabs that handle their own full layout (Header + Content)
    const isCustomLayoutTab = ['Board of Directors', 'Board of Management'].includes(activeTab);

    return (
        <div className="max-w-5xl mx-auto border-b border-gray-100 bg-white rounded-2xl font-inter min-h-[calc(100vh-120px)] overflow-hidden">
            {!isCustomLayoutTab && (
                <header className="px-8 py-6 flex justify-between items-center border-b border-gray-50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{activeTab}</h2>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Content Management</p>
                    </div>
                </header>
            )}

            <div className={isCustomLayoutTab ? "" : "p-8"}>
                {activeTab === 'About Us' ? (
                    <AdminAboutUs />
                ) : activeTab === 'Chairman’s Desk' ? (
                    <AdminChairman isEmbedded={true} />
                ) : activeTab === 'Board of Directors' ? (
                    <AdminBoardDirectors isEmbedded={false} />
                ) : activeTab === 'Board of Management' ? (
                    <AdminBoardManagement isEmbedded={false} />
                ) : activeTab === 'DICGC Certificate' ? (
                    <AdminDICGCCertificate />
                ) : (
                    /* Generic Content Editor for other tabs */
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex gap-4 items-start">
                            <div className="text-[#003399] mt-1"><i className="fas fa-info-circle text-lg"></i></div>
                            <div>
                                <h4 className="text-sm font-bold text-[#003399]">{activeTab} Editor</h4>
                                <p className="text-xs text-blue-800 mt-1">Use the editor below to manage the content for this section. All changes will reflect on the public website immediately after saving.</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2.5 px-0.5">Page Title</label>
                            <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-base font-medium text-gray-900 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50" defaultValue={activeTab} />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2.5 px-0.5">Content Body</label>
                            <textarea rows="15" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 focus:border-[#003399] outline-none transition-all focus:ring-2 focus:ring-blue-50 resize-none leading-relaxed" placeholder={`Enter content for ${activeTab}...`}></textarea>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button className="bg-[#003399] hover:bg-black text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-100 transition transform hover:-translate-y-0.5">
                                Update {activeTab}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBankInfo;
