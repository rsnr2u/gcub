import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NewsDetail = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/news/show/${id}`);
                if (!response.ok) {
                    throw new Error('News not found');
                }
                const data = await response.json();
                setNews(data);
            } catch (err) {
                console.error('Error fetching news detail:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNewsDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center font-inter">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003399]"></div>
            </div>
        );
    }

    if (error || !news) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center font-inter px-4 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || 'News not found'}</h2>
                <Link to="/" className="text-[#003399] font-bold hover:underline">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="font-inter bg-white">
            <Helmet>
                <title>{news.title} | Global Co-operative Urban Bank</title>
                <meta name="description" content={news.title} />
            </Helmet>

            {/* Hero / Header Section */}
            <div className="bg-[#002b5c] py-12 md:py-20 text-white">
                <div className="max-w-4xl mx-auto px-4 md:px-6">
                    <nav className="flex gap-2 text-xs md:text-sm font-medium text-blue-100/60 mb-6 items-center">
                        <Link to="/" className="hover:text-white transition">Home</Link>
                        <i className="fas fa-chevron-right text-[10px]"></i>
                        <span className="text-blue-100/80">Latest News</span>
                    </nav>
                    <h1 className="text-2xl md:text-4xl font-black leading-tight max-w-4xl">
                        {news.title}
                    </h1>
                    <div className="mt-8 flex items-center gap-4 text-sm font-bold text-blue-100/80">
                        <span className="flex items-center gap-2">
                            <i className="far fa-calendar-alt"></i>
                            {new Date(news.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
                <div className="max-w-4xl mx-auto">
                    {news.image && (
                        <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-gray-100">
                            <img
                                src={`http://localhost:8080/${news.image}`}
                                alt={news.title}
                                className="w-full h-auto object-cover max-h-[500px]"
                            />
                        </div>
                    )}

                    <div
                        className="prose text-gray-700 max-w-none prose-headings:text-[#003399] prose-a:text-[#003399] prose-img:rounded-3xl whitespace-normal"
                        dangerouslySetInnerHTML={{ __html: news.content.replace(/&nbsp;/g, ' ') }}
                    ></div>

                    <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <Link to="/" className="group flex items-center gap-3 text-[#003399] font-bold text-sm uppercase tracking-widest">
                            <i className="fas fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
                            Back to Home
                        </Link>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Share this news:</span>
                            <div className="flex gap-2">
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#003399] hover:text-white transition shadow-sm"
                                    title="Share on Facebook"
                                >
                                    <i className="fab fa-facebook-f text-sm"></i>
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(news.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition shadow-sm"
                                    title="Share on X"
                                >
                                    <i className="fab fa-twitter text-sm"></i>
                                </a>
                                <a
                                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(news.title + ' ' + window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition shadow-sm"
                                    title="Share on WhatsApp"
                                >
                                    <i className="fab fa-whatsapp text-sm"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;
