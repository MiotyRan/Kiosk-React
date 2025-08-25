import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import Button from './Button'

function ConfirmationScreen() {
  const { currentScreen, actions } = useAppContext()

  // Créer les confettis
  useEffect(() => {
    if (currentScreen === 'confirmation') {
      createConfetti()
    }
  }, [currentScreen])

  const createConfetti = () => {
    const colors = ['#1e40af', '#16a34a', '#eab308', '#f59e0b', '#22c55e']
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div')
      confetti.style.position = 'fixed'
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.width = '10px'
      confetti.style.height = '10px'
      confetti.style.zIndex = '3000'
      confetti.style.animation = 'confetti-fall 3s ease-in-out'
      confetti.style.animationDelay = Math.random() * 3 + 's'
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`
      document.body.appendChild(confetti) // ✅ CORRIGÉ : appendChild avec C majuscule
      
      setTimeout(() => confetti.remove(), 6000)
    }
  }

  const handleStartNewOrder = () => {
    actions.resetApp()
    actions.setScreen('service-mode')
    actions.showToast('Nouvelle commande démarrée', 'info')
  }

  const generateOrderNumber = () => {
    return `BC-${Date.now().toString().slice(-6)}`
  }

  const getEstimatedTime = () => {
    return '15-20 minutes'
  }

  if (currentScreen !== 'confirmation') return null

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center p-8 bounce-in">
        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <i className="fas fa-check text-6xl text-green-600"></i>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Commande confirmée !
        </h2>
        
        <p className="text-xl text-gray-600 mb-2">Numéro de commande :</p>
        <p className="text-3xl font-bold text-blue-600 mb-8">
          #{generateOrderNumber()}
        </p>
        
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            Votre commande est en cours de préparation
          </p>
          <p className="text-gray-600">
            Temps d'attente estimé : 
            <span className="font-semibold"> {getEstimatedTime()}</span>
          </p>
        </div>
        
        <Button 
          onClick={handleStartNewOrder}
          className="mt-8"
          size="large"
        >
          Nouvelle commande
        </Button>
      </div>
    </div>
  )
}

export default ConfirmationScreen