const ProjectFinance = () => {
    return (
        <div className="project-finance-page">
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-light text-gray-700 mb-6 font-outfit">Project Finance</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-3/4">
                        <div className="mb-6 rounded-lg overflow-hidden shadow-sm h-72 relative">
                            <img src="/assets/images/project_finance/banner.png" alt="Project Finance Banner" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                <div className="p-6 text-white text-left">
                                    <h2 className="text-3xl font-bold mb-2">Powering Major Projects</h2>
                                    <p>End-to-end financial solutions for large-scale infrastructure and industrial projects.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8 text-sm text-gray-600 leading-relaxed text-justify">
                            <p className="mb-4">
                                Our Project Finance services are tailored to support the setting up of new industrial undertakings or the expansion of existing ones. We evaluate projects based on their viability and cash flow, providing the necessary capital to turn your vision into reality.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-light text-gray-700 mb-4 border-b pb-2">Features and Benefits</h2>
                            <ul className="space-y-4">
                                <FeatureBenefit text="Customized financing structure." />
                                <FeatureBenefit text="Expert appraisal and advisory." />
                            </ul>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/4 space-y-6">
                        <div className="bg-[#0056b3] text-white overflow-hidden rounded shadow-sm">
                            <a href="/interest-rates" className="block px-4 py-3 border-b border-blue-400/30 hover:bg-[#003399] transition text-sm font-medium">Interest Rates</a>
                        </div>
                        <div className="bg-gray-100 border border-gray-200 rounded overflow-hidden">
                            <div className="bg-[#0056b3] text-white px-4 py-2 text-sm font-bold">Contact Us</div>
                            <div className="p-4 text-sm text-gray-700">
                                <p className="mb-2">Visit your nearest branch for more details.</p>
                                <a href="/branch-locator" className="text-[#003399] font-medium hover:underline">Branch Locator</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const FeatureBenefit = ({ text }) => (
    <li className="bg-gray-50 p-4 border-l-4 border-[#003399] shadow-sm text-sm text-gray-700 flex justify-between items-center group cursor-pointer hover:bg-white transition">
        <span>{text}</span>
        <span className="text-[#003399] group-hover:translate-x-1 transition-transform">▶</span>
    </li>
);

export default ProjectFinance;
