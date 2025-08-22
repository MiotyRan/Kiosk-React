import React from "react"
import { useAppContext } from "../context/AppContext"
import TableButton from "../components/TableButton"
import Button from "../components/Button"

function TableSelection() {
    const { tableNumber, actions} = useAppContext()

    // simuler quelques tables occupées
    const occupiedTables = [3, 7, 12]
    const tableNumbers = Array.from({ length: 20 }, (_, i) => i + 1)

    const handleTableSelect = (number) => {
        if (occupiedTables.includes(number)) {
            actions.showToast(`Table ${number} sélectionnée`, 'success')
            return
        }

        actions.setTableNumber(number)

        setTimeout(() => {
            actions.setScreen('allergen-selection')
            actions.showToast({
                message: `Vous avez sélectionné la table ${number}.`,
                type: 'success'
            })
        }, 500)
    }

    const handleGoBack = () => {
        actions.setTableNumber(null)
        actions.setServiceMode(null)
        actions.setStep(1)
        actions.setScreen('service-mode')
    }

    return (
        <div className="slide-in-up">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                <span className="bg-gradient-to-r from-blue-700 via-green-700 to-yellow-500 bg-clip-text text-transparent">
                    Choisissez votre table
                </span>
                </h2>
                <p className="text-lg text-gray-600">Sélectionnez le numéro de votre table</p>
            </div>
            
            {/* Légende */}
            <div className="flex justify-center gap-8 mb-8">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
                    <span className="text-sm">Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-200 border-2 border-red-400 rounded"></div>
                    <span className="text-sm">Occupée</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 rounded"></div>
                    <span className="text-sm">Sélectionnée</span>
                </div>
            </div>
            
            <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto mb-8">
                {tableNumbers.map(number => (
                <TableButton
                    key={number}
                    number={number}
                    isOccupied={occupiedTables.includes(number)}
                    isSelected={tableNumber === number}
                    onClick={() => handleTableSelect(number)}
                />
                ))}
            </div>
            
            <div className="text-center">
                <Button
                variant="secondary"
                onClick={handleGoBack}
                icon="fas fa-arrow-left"
                >
                Retour
                </Button>
            </div>
        </div>
    )
}

export default TableSelection