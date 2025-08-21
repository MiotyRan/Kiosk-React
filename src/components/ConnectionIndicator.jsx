import React, {useState, useEffect} from "react"

function ConnectionIndicator() {
    const [isOnline, setOnline] = useState(navigator.onLine)

    useEffect(() => {
        const handleOnline = () => setOnline(true)
        const handleOffline = () => setOnline(false)

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.addEventListener('online', handleOnline)
            window.addEventListener('offline', handleOffline)
        }
    }, [])

    return (
        <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            isOnline
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
        }`}>
            <i className={`fas ${isOnline ? 'fa-wifi' : 'fa-wifi-slash'} mr-2`}></i>
            {isOnline ? 'En ligne' : 'Hors ligne'}
        </div>
    )
}

export default ConnectionIndicator