import React from "react"

function TableButton({ number, isOccupied, isSelected, onClick}) {
    const getButtonClass = () => {
        if (isOccupied) return 'table-button occupied'
        if (isSelected) return 'table-button selected'
        return 'table-button'
    }

    const getIcon = () => {
        if (isOccupied) return '🔴'
        if (isSelected) return '🟢'
        return '🪑' 
    }

    const getStatus = () => {
        if (isOccupied) return 'Occupée'
        return 'Disponible'
    }

    return (
        <div
            className={`${getButtonClass()} touch-feedback`}
            onClick={!isOccupied ? onClick : undefined}
            style={{ cursor: isOccupied ? 'not-allowed' : 'pointer' }}
        >
            <div className="text-center">
                <div className="text-2xl mb-2">{getIcon()}</div>
                <div className="text-xl font-bold">Table {number}</div>
                <div className="text-sm text-gray-500">{getStatus()}</div>
            </div>
        </div>
    )
}

export default TableButton