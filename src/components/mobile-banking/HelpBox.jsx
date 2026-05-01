const HelpBox = ({ data }) => {
    if (!data || data.enabled === false) return null;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#E61111]">
            <h3 className="text-lg font-bold text-[#003399] mb-3 flex items-center gap-2">
                <i className={`fas ${data.icon || 'fa-question-circle'}`}></i>
                {data.title || 'Registration Help?'}
            </h3>
            <p className="text-gray-600 text-xs mb-4 leading-relaxed">{data.description}</p>
            <a 
                href={data.action === 'call' ? `tel:${data.phone}` : data.link} 
                className="block w-full bg-[#003399] text-white text-center py-3 rounded hover:bg-blue-800 transition font-medium shadow-md hover:shadow-lg"
            >
                <i className={`fas ${data.action === 'call' ? 'fa-phone-alt' : (data.icon || 'fa-link')} mr-2`}></i>
                {data.buttonText || data.phone}
            </a>
        </div>
    );
};

export default HelpBox;
