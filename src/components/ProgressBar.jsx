import React from "react"
import { useAppContext } from "../context/AppContext"

function ProgressBar() {
    const { cartCount } = useAppContext()

    const progress = Math.min((cartCount / 3) * 100, 100)

    return (
        <div className="max-w-4xl mx-auto mb-8">
            <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
                <span>Selectionnez vos plats</span>
                <span>3 arcticles minimum pour -10% ! 🎁</span>
            </div>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    )
}

export default ProgressBar