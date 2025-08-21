import React from "react"
import { useAppContext } from './context/AppContext'
import Header from './components/Header'
import ServiceMode from './pages/ServiceMode'
import TableSelection from './pages/TableSelection'
import AllergenSelection from './pages/AllergenSelection'
import Menu from './pages/Menu'
import Payment from './pages/Payment'
import ConfirmationScreen from './components/ConfirmationScreen'
import FloatingCart from './components/FloatingCart'
import Toast from './components/Toast'
import CartModal from './components/CartModal'
import ProductModal from './components/ProductModal'

function App() {
  const { currentScreen } = useAppContext()

  const renderScreen = () => {
    switch (currentScreen) {
      case 'service-mode':
        return <ServiceMode />
      case 'table-selection':
        return <TableSelection />
      case 'allergen-selection':
        return <AllergenSelection />
      case 'menu':
        return <Menu />
      case 'payment':
        return <Payment />
      case 'confirmation':
        return <ConfirmationScreen />
      default:
        return <ServiceMode />
    }
  }

  return (
    <div className="min-h-screen relative">
      <Header />

      <main className="pt-60 pb-32 px-4 max-w-7xl mx-auto">
        {renderScreen()}
      </main>

      <FloatingCart />
      <CartModal />
      <ProductModal />
      <Toast />
    </div>
  )
}


export default App