import React from 'react'
const Model = ({ children }, modelSize) => {
    const size = modelSize || "small";
    return (
        <div className="h-screen bg-mint-50 flex items-center justify-center">
            <div className={`bg-yellow-100 rounded-2xl p-8 shadow-lg w-full text-center flex items-center justify-center ${size=="big"?"":"max-w-sm"}` }>
                {children}
            </div>
        </div>
    )
}

export default Model