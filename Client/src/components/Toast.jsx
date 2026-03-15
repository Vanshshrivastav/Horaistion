import React from 'react';

const Toast = ({ message, type, onClose }) => {
    const variants = {
        success: {
            bg: 'bg-[#23252B]',
            border: 'border-[#F47521]/30',
            icon: '✅',
            textColor: 'text-white',
            accent: 'bg-[#F47521]'
        },
        error: {
            bg: 'bg-[#23252B]',
            border: 'border-red-500/30',
            icon: '❌',
            textColor: 'text-white',
            accent: 'bg-red-500'
        },
        info: {
            bg: 'bg-[#23252B]',
            border: 'border-blue-500/30',
            icon: 'ℹ️',
            textColor: 'text-white',
            accent: 'bg-blue-500'
        }
    };

    const style = variants[type] || variants.info;

    return (
        <div className={`
            ${style.bg} ${style.border} border
            min-w-[320px] max-w-md p-5 rounded-2xl shadow-2xl flex items-center gap-4
            animate-in slide-in-from-top-8 fade-in duration-500
            backdrop-blur-xl relative overflow-hidden group
        `}>
            {/* Accent strip */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${style.accent}`} />
            
            <div className="text-2xl">{style.icon}</div>
            
            <div className="flex-grow">
                <p className={`text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5`}>
                    {type === 'success' ? 'Transmission Secure' : type === 'error' ? 'System Breach' : 'Notification'}
                </p>
                <p className={`${style.textColor} font-bold text-sm tracking-tight leading-tight`}>
                    {message}
                </p>
            </div>

            <button 
                onClick={onClose}
                className="text-gray-500 hover:text-white transition-colors p-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default Toast;
