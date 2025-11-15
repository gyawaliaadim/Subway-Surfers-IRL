import React from 'react'
const Model = ({ children }) => {
    return (
        <div className="h-screen bg-mint-50 flex items-center justify-center">
            <div className="bg-yellow-100 rounded-2xl p-8 shadow-lg max-w-sm w-full text-center flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}

export default Model