import React from "react"
import { useAppContext } from "../context/AppContext"
import ServiceCard from '../components/ServiceCard'

function ServiceMode() {
    const { actions } = useAppContext()

    const handleServiceModeSelect = (mode) => {
        actions.setServiceMode(mode)
        actions.showToast(
            `Mode "${mode === 'sur_place' ? 'Sur place' : 'À emporter'}" sélectionné`,
            'success'
        )

        if (mode === 'sur_place') {
            actions.setScreen('table-selection')
        } else {
            actions.setScreen('allergen-selection')
        }
    }

    return (
        <div className="slide-in-up">
            <div className="text-center mb-12 bounce-in">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-blue-700 via-green-700 to-yellow-500 bg-clip-text text-transparent">
                        Que désirez-vous aujourd'hui ?
                    </span>
                </h2>
                <p className="text-gray-600 text-xl md:text-2xl">Commandez en quelques clics et profitez ! 🎉</p>
                <p className="text-gray-500 text-lg mt-2">Choisissez votre mode de service</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <ServiceCard 
                    icon="fas fa-utensils"
                    title="Sur place"
                    description="Dégustez nos plats sur place dans une ambiance conviviale."
                    color="blue"
                    onClick={() => handleServiceModeSelect('sur_place')}
                />

                <ServiceCard 
                    icon="fas fa-shopping-bag"
                    title="À emporter"
                    description="Commandez vos plats à emporter pour déguster où vous voulez."
                    color="green"
                    onClick={() => handleServiceModeSelect('a_emporter')}
                />
            </div>
        </div>
    )
}

export default ServiceMode