import React from 'react'
import { useAppContext } from '../context/AppContext'

function CartItem({ item }) {
  const { actions } = useAppContext()

  const handleRemove = () => {
    actions.removeFromCart(item.id)
    actions.showToast('Article supprimé du panier', 'info')
  }

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity === 0) {
      handleRemove()
      return
    }
    
    const newTotalPrice = (item.total_price / item.quantity) * newQuantity
    
    actions.updateCartItem(item.id, {
      quantity: newQuantity,
      total_price: newTotalPrice
    })
  }

  return (
    <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
      <div className="text-3xl">{item.product_emoji}</div>
      
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{item.product_name}</h4>
        
        <div className="flex items-center space-x-2 mt-1">
          <button 
            onClick={() => handleUpdateQuantity(item.quantity - 1)}
            className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm hover:bg-gray-300"
          >
            -
          </button>
          <span className="text-sm text-gray-600 min-w-[60px] text-center">
            Quantité: {item.quantity}
          </span>
          <button 
            onClick={() => handleUpdateQuantity(item.quantity + 1)}
            className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm hover:bg-gray-300"
          >
            +
          </button>
        </div>
        
        {item.special_instructions && (
          <p className="text-xs text-blue-600 mt-1">
            Note: {item.special_instructions}
          </p>
        )}
        
        {item.options && (
          <div className="text-xs text-gray-500 mt-1">
            {item.options.size && <span>Taille: {item.options.size} • </span>}
            {item.options.extras.length > 0 && (
              <span>Extras: {item.options.extras.length}</span>
            )}
          </div>
        )}
      </div>
      
      <div className="text-right">
        <p className="font-bold text-green-600">{item.total_price.toFixed(2)}€</p>
        <button 
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 text-sm mt-1"
        >
          <i className="fas fa-trash"></i> Supprimer
        </button>
      </div>
    </div>
  )
}

export default CartItem