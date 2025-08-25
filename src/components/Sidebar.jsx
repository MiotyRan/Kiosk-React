import React from 'react'
import { useAppContext } from '../context/AppContext'

function Sidebar({ isVisible, onToggle, autoClose = true }) {
  const { categories, products, currentCategory, actions } = useAppContext()

  // Compter les produits par catégorie
  const getProductCount = (categoryId) => {
    if (categoryId === 'all') {
      return products.length
    }
    return products.filter(p => p.category === categoryId).length
  }

  const handleCategorySelect = (categoryId) => {
    actions.setCategory(categoryId)

    // Fermer automatiquement sur mobile
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        onToggle()
      }, 300) // Petite délai pour voir la sélection
    }
  }

  // Détecter si on est sur mobile
  const isMobile = window.innerWidth <= 768

  return (
    <>
      {/* Overlay SEULEMENT pour mobile */}
      {isMobile && (
        <div 
          className={`sidebar-overlay ${isVisible ? 'show' : ''}`} 
          onClick={onToggle}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar-menu ${isVisible ? 'show' : 'hidden'}`}>
        <div className="sidebar-header">
          <h3>🍽️ Catégories</h3>
          <p>Découvrez nos spécialités</p>
        </div>
        
        <div id="sidebar-categories" className="py-4">
          {categories && categories.map(category => (
            <div
              key={category.id}
              className={`menu-category ${currentCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <span className="menu-category-icon">{category.icon}</span>
              <span className="menu-category-name">{category.name}</span>
              <span className="menu-category-count">{getProductCount(category.id)}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Sidebar