import React from 'react'
import { useAppContext } from '../context/AppContext'
import AllergenCard from '../components/AllergenCard'
import Button from '../components/Button'
import { ALLERGENS } from '../constants/allergens'

function AllergenSelection() {
  const { customerAllergens, serviceMode, actions } = useAppContext()

  const handleAllergenToggle = (allergenId) => {
    if (customerAllergens.includes(allergenId)) {
      actions.removeAllergen(allergenId)
    } else {
      actions.addAllergen(allergenId)
    }
  }

  const handleSkip = () => {
    actions.setAllergens([])  // ✅ CORRIGÉ : setAllergens avec S
    proceedToMenu()
  }

  const handleConfirm = () => {
    if (customerAllergens.length > 0) {
      actions.showToast(
        `Filtre appliqué pour ${customerAllergens.length} allergène(s)`,
        'success'
      )
    }
    proceedToMenu()
  }

  const proceedToMenu = () => {
    actions.setStep(2) // ✅ CORRIGÉ : setStep au lieu de setSteps
    actions.setScreen('menu')
  }

  const handleGoBack = () => {
    actions.setAllergens([]) // ✅ CORRIGÉ : setAllergens au lieu de setAllergen

    if (serviceMode === 'sur_place') {
      actions.setScreen('table-selection')
    } else {
      actions.setServiceMode(null)
      actions.setStep(1)
      actions.setScreen('service-mode')
    }
  }

  return (
    <div className="slide-in-up">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          <span className="bg-gradient-to-r from-blue-700 via-green-700 to-yellow-500 bg-clip-text text-transparent">
            Allergies et intolérances
          </span>
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Sélectionnez vos allergies pour filtrer automatiquement le menu
        </p>
        <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 max-w-2xl mx-auto rounded">
          <p className="text-yellow-800">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Cette information nous aide à vous proposer des produits adaptés
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-8">
        {Object.entries(ALLERGENS).map(([id, allergen]) => (
          <AllergenCard
            key={id}
            allergen={{ ...allergen, id: parseInt(id) }}
            isSelected={customerAllergens.includes(parseInt(id))}
            onClick={() => handleAllergenToggle(parseInt(id))}
          />
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row sm:justify-center gap-4 items-center">
        <Button variant="secondary" onClick={handleSkip}>
          Aucune allergie
        </Button>
        
        <Button onClick={handleConfirm}>
          Confirmer et voir le menu
        </Button>
        
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

export default AllergenSelection