import React from "react"
import { useAppContext } from "../context/AppContext"

function FloatingCart() {
    const { cartCount, actions } = useAppContext()

    const handleClick = () => {
        actions.openModal('cart')
    }

    return (
        <div
            className={`floating-cart touch-feeback ${cartCount > 0 ? 'has-item' : ''}`}
            onClick={handleClick}
        >
            <i className="fas fa-shopping-cart text-3xl"></i>
            {cartCount > 0 && (
                <span className="quantity-badge">{cartCount}</span>
            )}
        </div>
    )
}

export default FloatingCart