import React from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from './ProductCard'

function ProductGrid({ searchQuery }) {
  const { products, currentCategory, customerAllergens } = useAppContext()

  // Filtrer les produits
  const getFilteredProducts = () => {
    let filteredProducts = products

    // Filtrer par catégorie
    if (currentCategory !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category === currentCategory
      )
    }

    // Filtrer par recherche
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filtrer par allergènes
    if (customerAllergens.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        !product.allergens.some(allergenId => 
          customerAllergens.includes(allergenId)
        )
      )
    }

    return filteredProducts
  }

  const filteredProducts = getFilteredProducts()

  if (filteredProducts.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <i className="fas fa-exclamation-triangle text-6xl text-gray-400 mb-4"></i>
        <p className="text-xl text-gray-500">
          {searchQuery 
            ? `Aucun résultat pour "${searchQuery}"` 
            : 'Aucun produit disponible'
          }
        </p>
        {customerAllergens.length > 0 && (
          <p className="text-gray-400">
            Essayez de modifier vos restrictions alimentaires
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
        />
      ))}
    </div>
  )
}

export default ProductGrid