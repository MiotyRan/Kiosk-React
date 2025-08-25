import React from 'react'
import { useAppContext } from '../context/AppContext'
import CartItem from './CartItem'
import Button from './Button'

function CartModal() {
  const { 
    modals, 
    cart, 
    cartTotal, 
    finalTotal, 
    hasDiscount, 
    actions 
  } = useAppContext()

  if (!modals.cart) return null

  const handleClose = () => {
    actions.closeModal('cart')
  }

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      actions.showToast('Votre panier est vide', 'error')
      return
    }

    actions.setStep(3)
    actions.setScreen('payment')
    handleClose()
  }

  return (
    <div className="modern-modal">
      <div className="modal-content">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <i className="fas fa-times text-2xl"></i>
        </button>
        
        <h3 className="text-2xl font-bold mb-6 text-center">
          <span className="bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 bg-clip-text text-transparent">
            Votre commande 🛒
          </span>
        </h3>
        
        <div className="space-y-4 mb-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <i className="fas fa-shopping-cart text-6xl mb-4 opacity-50"></i>
              <p className="text-xl">Votre panier est vide</p>
            </div>
          ) : (
            cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="border-t pt-4">
            {hasDiscount && (
              <div className="text-center text-green-600 font-semibold p-4 bg-green-50 rounded mb-4">
                🎉 Réduction de 10% appliquée !
              </div>
            )}
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-lg">Sous-total</span>
                <span className="text-lg">{cartTotal.toFixed(2)}€</span>
              </div>
              
              {hasDiscount && (
                <div className="flex justify-between items-center text-green-600">
                  <span>Remise (-10%)</span>
                  <span>-{(cartTotal * 0.1).toFixed(2)}€</span>
                </div>
              )}
              
              <div className="flex justify-between items-center border-t pt-2">
                <span className="text-xl font-semibold">Total</span>
                <span className="text-2xl font-bold text-green-600">
                  {finalTotal.toFixed(2)}€
                </span>
              </div>
            </div>
            
            <Button 
              onClick={handleProceedToCheckout}
              className="w-full"
            >
              Procéder au paiement 🎉
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartModal