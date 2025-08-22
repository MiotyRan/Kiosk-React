import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import PaymentMethodCard from '../components/PaymentMethodCard'
import Button from '../components/Button'

function Payment() {
  const { cart, finalTotal, actions } = useAppContext()
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')

  const handleCashPayment = () => {
    setPaymentMethod('cash')
    setShowPaymentModal(true)
  }

  const handleCardPayment = () => {
    setPaymentMethod('card')
    actions.showToast('Initialisation du terminal CB...', 'info')
    
    // Simuler le traitement CB
    setTimeout(() => {
      actions.showToast('Présentez votre carte', 'info')
      
      setTimeout(() => {
        actions.showToast('Saisissez votre code PIN', 'info')
        
        setTimeout(() => {
          processPayment()
        }, 2000)
      }, 2000)
    }, 1500)
  }

  const handleCashConfirm = () => {
    setShowPaymentModal(false)
    actions.showToast('Traitement du paiement espèces...', 'info')
    
    setTimeout(() => {
      processPayment()
    }, 2000)
  }

  const processPayment = () => {
    actions.showToast('🎉 Paiement confirmé avec succès !', 'success')
    
    // Aller à l'écran de confirmation
    setTimeout(() => {
      actions.setScreen('confirmation')
      // Vider le panier après confirmation
      actions.clearCart()
    }, 1500)
  }

  const handleGoBack = () => {
    actions.setStep(2)
    actions.setScreen('menu')
  }

  if (cart.length === 0) {
    return (
      <div className="slide-in-up text-center">
        <div className="text-center py-12">
          <i className="fas fa-shopping-cart text-6xl text-gray-400 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Panier vide
          </h2>
          <p className="text-gray-600 mb-8">
            Ajoutez des articles avant de procéder au paiement
          </p>
          <Button onClick={() => actions.setScreen('menu')}>
            Retour au menu
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="slide-in-up">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          <span className="bg-gradient-to-r from-blue-700 via-green-700 to-yellow-500 bg-clip-text text-transparent">
            Choisir le mode de paiement
          </span>
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Total à payer : <span className="font-bold text-2xl text-green-600">{finalTotal.toFixed(2)}€</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
        <PaymentMethodCard
          icon="fas fa-money-bill-wave"
          title="Espèces"
          description="Paiement en liquide"
          color="green"
          onClick={handleCashPayment}
        />
        
        <PaymentMethodCard
          icon="fas fa-credit-card"
          title="Carte Bancaire"
          description="Paiement par carte"
          color="blue"
          onClick={handleCardPayment}
        />
      </div>

      <div className="text-center">
        <Button 
          variant="secondary" 
          onClick={handleGoBack}
          icon="fas fa-arrow-left"
        >
          Retour au menu
        </Button>
      </div>

      {/* Modal Paiement Espèces */}
      {showPaymentModal && (
        <div className="modern-modal">
          <div className="modal-content">
            <h3 className="text-2xl font-bold text-center mb-6">Paiement en espèces</h3>
            
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-money-bill-wave text-4xl text-green-600"></i>
              </div>
              <p className="text-xl mb-2">Montant à régler :</p>
              <p className="text-3xl font-bold text-green-600">{finalTotal.toFixed(2)}€</p>
              <p className="text-gray-600 mt-4">
                Présentez-vous à la caisse avec le montant exact
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button 
                variant="secondary"
                onClick={() => setShowPaymentModal(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button 
                onClick={handleCashConfirm}
                className="flex-1"
              >
                Confirmer le paiement
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Payment