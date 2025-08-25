import React from 'react'
import { useAppContext } from '../context/AppContext'
import { ALLERGENS } from '../constants/allergens'

function ProductCard({ product }) {
  const { actions } = useAppContext()

  const handleClick = () => {
    actions.setSelectedProduct(product)
    actions.openModal('product')
  }

  const renderAllergenBadges = () => {
    if (!product.allergens || product.allergens.length === 0) return null

    return (
      <div className="absolute top-2 left-2">
        <div className="flex flex-wrap gap-1">
          {product.allergens.map(allergenId => {
            const allergen = ALLERGENS[allergenId]
            return allergen ? (
              <span 
                key={allergenId}
                className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded" 
                title={allergen.name}
              >
                {allergen.icon}
              </span>
            ) : null
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="product-card touch-feedback" onClick={handleClick}>
      <div className="relative overflow-hidden">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        {renderAllergenBadges()}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            {product.price.toFixed(2)}€
          </span>
          <button className="bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 text-white p-3 rounded-full hover:shadow-lg transition-all duration-300 touch-feedback">
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard