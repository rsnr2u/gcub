const IntroSection = ({ data }) => {
    if (!data || data.enabled === false) return null;

    return (
        <div className="mb-12">
            <div className="prose prose-lg text-gray-600 max-w-none">
                <h2 className="text-3xl font-bold text-[#003399] mb-6 border-b-2 border-yellow-400 inline-block pb-2">
                    {data.title}
                </h2>
                {data.heading && (
                    <h3 className="text-xl font-bold text-gray-800 mb-4 tracking-tight">
                        {data.heading}
                    </h3>
                )}
                <div className="leading-relaxed mb-8 text-justify whitespace-pre-line text-gray-600">
                    {data.description}
                </div>
            </div>
        </div>
    );
};

export default IntroSection;
