import React from "react"

function Button({
    children,
    onClick,
    variant = 'primary',
    size = 'medium',
    disable = false,
    icon = null,
    className = '',
    ...props
}) {
    const getVariantClass = () => {
        switch (variant) {
            case 'primary':
                return 'action-button'
            case 'secondary':
                return 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            case 'success':
                return 'bg-green-500 text-white hover:bg-green-600'
            case 'danger':
                return 'bg-red-500 text-white hover:bg-red-600'
            case 'warning':
                return 'bg-yellow-500 text-white hover:bg-yellow-600'
            default:
                return 'action-button'
        }
    }

    const getSizeClass = () => {
        switch (size) {
            case 'small':
                return 'px-4 py-2 text-sm'
            case 'medium':
                return 'px-8 py-4 text-lg'
            case 'large':
                return 'px-12 py-6 text-xl'
            default:
                return 'px-8 py-4 text-lg'
        }
    }

    const baseClass = `
        font-semibold rounded-xl transition-all duration-300 touch-feedback
        disabled:opacity-50 disabled:cursor-not-allowed
        ${getVariantClass()} ${getSizeClass()} ${className}
    `.trim()

    return (
        <button
            className={baseClass}
            onClick={onClick}
            disabled={disable}
            {...props}
        >
            {icon && <i className={`${icon} mr-2`}></i>}
            {children}
        </button>
    )
}

export default Button