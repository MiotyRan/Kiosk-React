import React from "react"

function AllergenCard({ allergen, isSelected, onClick }) {
    const getCardClass = () => {
        return `allergen-card touch-feedback ${isSelected ? 'selected' : ''}`
    }

    const getIcon = () => {
        return isSelected ? '✅' : allergen.icon
    }

    return (
        <div className={getCardClass()} onClick={onClick}>
            <input 
                type="checkbox" 
                className="allergen-checkbox hidden" 
                value={allergen.id}
                checked={isSelected}
                onChange={() => {}} // Controlled by parent
            />
            <div className="text-center">
                <div className="text-4xl mb-2">{getIcon()}</div>
                <div className="font-semibold">{allergen.name}</div>
                <div className="text-xs text-gray-500">{allergen.code}</div>
            </div>
        </div>
    )
}

export default AllergenCard