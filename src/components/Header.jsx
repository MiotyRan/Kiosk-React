import React from "react"
import ProgressSteps from './ProgressSteps'
import ConnectionIndicator from './ConnectionIndicator'

function Header() {
    return (
        <header className="modern-header py-4 px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="text-4xl">🍽️</div>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 bg-clip-text text-transparent">
                            Brasserie Claouey
                        </h1>
                        <p className="text-gray-600">
                            Commande en libre service
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <ConnectionIndicator />
                </div>
            </div>

            <ProgressSteps />
        </header>
    )
}

export default Header