import React from 'react'
import { useAppContext } from '../context/AppContext'

function Toast() {
  try {
    const { toast } = useAppContext()

    // Vérifications de sécurité
    if (!toast || !toast.show) {
      return null
    }

    // S'assurer que message est une string
    let message = ''
    if (typeof toast.message === 'string') {
      message = toast.message
    } else if (toast.message) {
      message = String(toast.message)
    } else {
      return null
    }
    
    const type = toast.type || 'info'

    return (
      <div className={`fun-toast ${type} show`}>
        {message}
      </div>
    )
  } catch (error) {
    console.error('Error in Toast component:', error)
    return null
  }
}

export default Toast