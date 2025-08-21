import React from "react"

function ServiceCard({ icon, title, description, color, onClick }) {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        yellow: 'bg-yellow-100 text-yellow-600',
        purple: 'bg-purple-100 text-purple-600',
    }

    return (
        <div className="service-card touch-feedback" onClick={onClick}>
            <div className="text-center">
                <div className={`${colorClasses[color]} w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <i className={`${icon} text-6xl`}></i>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{title}</h3>
                <p className="text-gray-600 text-lg">{description}</p>
            </div>
        </div>
    )
}

export default ServiceCard