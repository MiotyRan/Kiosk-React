import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { ALLERGENS } from '../constants/allergens'
import { PRODUCT_OPTIONS } from '../constants/productOptions'
import Button from './Button'

function ProductModal() {
  const { modals, selectedProduct, actions } = useAppContext()
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState({
    size: null,
    sizePrice: 0,
    extras: [],
    extrasPrice: 0,
    sauce: null,
    saucePrice: 0
  })
  const [specialInstructions, setSpecialInstructions] = useState('')

  if (!modals.product || !selectedProduct) return null

  const handleClose = () => {
    actions.closeModal('product')
    setQuantity(1)
    setSelectedOptions({
      size: null,
      sizePrice: 0,
      extras: [],
      extrasPrice: 0,
      sauce: null,
      saucePrice: 0
    })
    setSpecialInstructions('')
  }

  const handleSizeSelect = (sizeId, price) => {
    setSelectedOptions(prev => ({
      ...prev,
      size: sizeId,
      sizePrice: price
    }))
  }

  const handleExtraToggle = (extraId, price) => {
    setSelectedOptions(prev => {
      const isSelected = prev.extras.some(e => e.id === extraId)
      
      if (isSelected) {
        return {
          ...prev,
          extras: prev.extras.filter(e => e.id !== extraId),
          extrasPrice: prev.extrasPrice - price
        }
      } else {
        return {
          ...prev,
          extras: [...prev.extras, { id: extraId, price }],
          extrasPrice: prev.extrasPrice + price
        }
      }
    })
  }

  const handleSauceSelect = (sauceId, price) => {
    setSelectedOptions(prev => ({
      ...prev,
      sauce: sauceId,
      saucePrice: price
    }))
  }

  const getTotalPrice = () => {
    return (selectedProduct.price + selectedOptions.sizePrice + selectedOptions.extrasPrice + selectedOptions.saucePrice) * quantity
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: Date.now(),
      product_id: selectedProduct.id,
      product_name: selectedProduct.name,
      product_emoji: selectedProduct.emoji,
      quantity: quantity,
      unit_price: selectedProduct.price + selectedOptions.sizePrice + selectedOptions.extrasPrice + selectedOptions.saucePrice,
      total_price: getTotalPrice(),
      special_instructions: specialInstructions,
      image_url: selectedProduct.image_url,
      options: selectedOptions
    }

    actions.addToCart(cartItem)
    actions.showToast(`${selectedProduct.emoji} ${selectedProduct.name} ajouté au panier`, 'success')
    handleClose()
  }

  const options = PRODUCT_OPTIONS[selectedProduct.category] || {}

  return (
    <div className="modern-modal">
      <div className="modal-content no-scrollbar">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <i className="fas fa-times text-2xl"></i>
        </button>
        
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{selectedProduct.emoji}</div>
          <h2 className="text-3xl font-bold mb-2">{selectedProduct.name}</h2>
          <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
          <div className="text-3xl font-bold text-green-600 mb-6">
            {getTotalPrice().toFixed(2)}€
          </div>
        </div>
        
        {selectedProduct.allergens && selectedProduct.allergens.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
            <p className="font-semibold text-yellow-800 mb-2">Allergènes présents :</p>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.allergens.map(id => (
                <span key={id} className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm">
                  {ALLERGENS[id].icon} {ALLERGENS[id].name}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Tailles */}
        {options.sizes && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Choisir la taille</h3>
            <div className={`grid grid-cols-${Math.min(options.sizes.length, 3)} gap-2`}>
              {options.sizes.map(size => (
                <button 
                  key={size.id}
                  className={`p-3 border rounded hover:bg-blue-100 touch-feedback ${
                    selectedOptions.size === size.id ? 'bg-blue-500 text-white' : ''
                  }`}
                  onClick={() => handleSizeSelect(size.id, size.price)}
                >
                  {size.name}
                  {size.price > 0 && <br />}
                  {size.price > 0 && <span className="text-sm text-green-600">+{size.price}€</span>}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Extras */}
        {options.extras && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Suppléments & Options</h3>
            <div className="space-y-2">
              {options.extras.map(extra => (
                <label key={extra.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded touch-feedback">
                  <span>{extra.name}</span>
                  <div className="flex items-center">
                    {extra.price > 0 && <span className="mr-2 text-green-600">+{extra.price}€</span>}
                    <input 
                      type="checkbox" 
                      checked={selectedOptions.extras.some(e => e.id === extra.id)}
                      onChange={() => handleExtraToggle(extra.id, extra.price)}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
        
        {/* Sauces */}
        {options.sauces && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Sauces</h3>
            <div className="grid grid-cols-2 gap-2">
              {options.sauces.map(sauce => (
                <label key={sauce.id} className="flex items-center p-2 border rounded hover:bg-gray-50 cursor-pointer touch-feedback">
                  <input 
                    type="radio" 
                    name="sauce" 
                    className="mr-2" 
                    checked={selectedOptions.sauce === sauce.id}
                    onChange={() => handleSauceSelect(sauce.id, sauce.price)}
                  />
                  <span>{sauce.name}</span>
                  {sauce.price > 0 && <span className="ml-auto text-green-600">+{sauce.price}€</span>}
                </label>
              ))}
            </div>
          </div>
        )}
        
        {/* Quantité */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Quantité</h3>
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-200 hover:bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center touch-feedback"
            >
              <i className="fas fa-minus"></i>
            </button>
            <span className="text-2xl font-bold">{quantity}</span>
            <button 
              onClick={() => setQuantity(Math.min(20, quantity + 1))}
              className="bg-gray-200 hover:bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center touch-feedback"
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
        
        {/* Instructions spéciales */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Instructions spéciales</h3>
          <textarea 
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none" 
            rows="3" 
            placeholder="Ex: Sans oignons, bien cuit, extra sauce, etc..."
          />
        </div>
        
        <div className="flex space-x-4">
          <Button 
            variant="secondary"
            onClick={handleClose}
            className="flex-1"
          >
            Annuler
          </Button>
          <Button 
            onClick={handleAddToCart}
            className="flex-1"
          >
            Ajouter au panier
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductModal