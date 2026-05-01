import React from 'react';

const BenefitsSection = ({ data }) => {
    const list = data.items || data.cards || [];
    if (!data || data.enabled === false || list.length === 0) return null;

    // Strictly dynamic icon resolver
    const getIcon = (benefit) => {
        const icon = benefit.icon || 'circle-check';
        return icon.startsWith('fa-') ? icon : `fa-${icon}`;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 my-10">
            {list.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-5 group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#f0f7ff] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-100">
                        <i className={`fas ${getIcon(benefit)} text-xl text-[#0055ff]`}></i>
                    </div>
                    <div className="flex-grow pt-0.5">
                        <h4 className="text-[1.1rem] font-bold text-[#1a1a1a] mb-1.5 leading-tight tracking-tight">
                            {benefit.title}
                        </h4>
                        <p className="text-[#666666] text-[0.925rem] leading-relaxed">
                            {benefit.description || benefit.desc}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BenefitsSection;
