import React from "react"

function PaymentMethodCard({ icon, title, description, color, onClick }) {
    const colorClasses = {
        blue: 'bg-blue-500 text-blue-600',
        green: 'bg-green-500 text-green-600',
        yellow: 'bg-yellow-500 text-yellow-600',
        purple: 'bg-purple-500 text-purple-600',
    }

    return (
        <div 
            className={`${colorClasses[color]} text-white p-8 rounded-xl text-xl font-semibold cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl touch-feedback`}
            onClick={onClick}
        >
            <div className="text-center">
                <i className={`${icon} text-6xl mb-4 block`}></i>
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="opacity-90">{description}</p>
            </div>
        </div>
    )
}

export default PaymentMethodCard