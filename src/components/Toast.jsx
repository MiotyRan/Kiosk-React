import React from 'react'
import { useAppContext } from '../context/AppContext'


function Toast() {
    const { toast } = useAppContext()

    if (!toast.show) return null

    return (
        <div className={`fun-toast ${toast.type} show`}>
            {toast.message}
        </div>
    )
}

export default Toast