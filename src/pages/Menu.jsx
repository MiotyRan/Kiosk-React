import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import ProgressBar from '../components/ProgressBar'
import ProductGrid from '../components/ProductGrid'
import Button from '../components/Button'
import { mockProducts, mockCategories } from '../constants/mockData'

function Menu() {
  const { 
    currentCategory, 
    customerAllergens, 
    cartCount,
    actions 
  } = useAppContext()

  const [searchQuery, setSearchQuery] = useState('')
  // Sidebar toujours visible sur desktop, masquée sur mobile
  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth > 768)

  // Initialize data on mount
  useEffect(() => {
    actions.setProducts(mockProducts)
    actions.setCategories(mockCategories)
  }, [])

  // Gérer le redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarVisible(true)
      } else {
        setSidebarVisible(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleGoBack = () => {
    actions.setStep(1)
    actions.setScreen('allergen-selection')
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  return (
    <div className="menu-layout">
      {/* Sidebar */}
      <Sidebar 
        isVisible={sidebarVisible} 
        onToggle={toggleSidebar}
        autoClose={false}
      />

      {/* Toggle button pour mobile uniquement */}
      <div 
        className={`sidebar-toggle ${sidebarVisible ? 'hidden' : ''}`}
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars text-2xl"></i>
      </div>

      {/* Contenu principal centré */}
      <div className={`main-content-with-sidebar ${!sidebarVisible ? 'full-width' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 pb-32">
          {/* Hero Section */}
          <div className="text-center mb-8 bounce-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-700 via-green-700 to-yellow-500 bg-clip-text text-transparent">
                Notre Menu
              </span>
            </h2>
            <p className="text-gray-600 text-lg">Sélectionnez vos plats favoris ! 🍽️</p>
          </div>

          {/* Bouton de retour */}
          <div className="text-center mb-6">
            <Button 
              variant="secondary" 
              onClick={handleGoBack}
              icon="fas fa-arrow-left"
            >
              Retour
            </Button>
          </div>

          {/* Barre de recherche centrée */}
          <div className="search-container">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="🔍 Rechercher un plat..."
              className="search-input"
            />
          </div>

          {/* Progress Bar centrée */}
          <div className="progress-container">
            <ProgressBar />
          </div>

          {/* Grille des produits centrée */}
          <div className="products-grid">
            <ProductGrid 
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu