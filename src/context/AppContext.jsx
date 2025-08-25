import React, { createContext, useContext, useReducer } from 'react'

// etat initial
const initialState = {
    currentScreen: 'service-mode',
    currentStep: 1,
    serviceMode: null,
    tableNumber: null,
    customerAllergens: [],
    cart: [],
    currentCategory: 'all',
    products: [],
    categories: [], // ⭐ AJOUTÉ
    toast: {
        show: false,
        message: '',
        type: 'info'
    },
    modals: {
        cart: false,
        product: false
    },
    selectedProduct: null, // ⭐ CORRIGÉ
    promoApplied: false
}

// actions
const ACTIONS = {
    SET_SCREEN: 'SET_SCREEN',
    SET_STEP:'SET_STEP',
    SET_SERVICE_MODE: 'SET_SERVICE_MODE', // ⭐ CORRIGÉ
    SET_TABLE_NUMBER: 'SET_TABLE_NUMBER',
    SET_ALLERGENS: 'SET_ALLERGENS',
    ADD_ALLERGEN: 'ADD_ALLERGEN',
    REMOVE_ALLERGEN: 'REMOVE_ALLERGEN',
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
    CLEAR_CART: 'CLEAR_CART',
    SET_CATEGORY: 'SET_CATEGORY',
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_CATEGORIES: 'SET_CATEGORIES',
    SHOW_TOAST: 'SHOW_TOAST',
    HIDE_TOAST: 'HIDE_TOAST',
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
    SET_SELECTED_PRODUCT: 'SET_SELECTED_PRODUCT',
    APPLY_PROMO: 'APPLY_PROMO',
    RESET_APP: 'RESET_APP'
}

// reducer
function AppReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_SCREEN:
            return {
                ...state,
                currentScreen: action.payload
            }
        
        case ACTIONS.SET_STEP:
            return {
                ...state,
                currentStep: action.payload
            }

        case ACTIONS.SET_SERVICE_MODE:
            return {
                ...state,
                serviceMode: action.payload
            }

        case ACTIONS.SET_TABLE_NUMBER:
            return {
                ...state,
                tableNumber: action.payload
            }

        case ACTIONS.SET_ALLERGENS:
            return {
                ...state,
                customerAllergens: action.payload
            }

        case ACTIONS.ADD_ALLERGEN:
            return {
                ...state,
                customerAllergens: [...state.customerAllergens, action.payload]
            }

        case ACTIONS.REMOVE_ALLERGEN:
            return {
                ...state,
                customerAllergens: state.customerAllergens.filter(id => id !== action.payload) // ⭐ CORRIGÉ
            }

        case ACTIONS.ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }

        case ACTIONS.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            }

        case ACTIONS.UPDATE_CART_ITEM:
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id
                        ? { ...item, ...action.payload.updates }
                        : item
                )
            }

        case ACTIONS.CLEAR_CART:
            return {
                ...state,
                cart: []
            }

        case ACTIONS.SET_CATEGORY:
            return {
                ...state,
                currentCategory: action.payload
            }

        case ACTIONS.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }

        case ACTIONS.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }

        case ACTIONS.SHOW_TOAST:
            return {
                ...state,
                toast: {
                    show: true,
                    message: action.payload.message,
                    type: action.payload.type || 'info'
                }
            }

        case ACTIONS.HIDE_TOAST:
            return {
                ...state,
                toast: {
                    ...state.toast,
                    show: false
                }
            }

        case ACTIONS.OPEN_MODAL:
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [action.payload]: true
                }
            }

        case ACTIONS.CLOSE_MODAL:
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [action.payload]: false
                }
            }

        case ACTIONS.SET_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload // ⭐ CORRIGÉ
            }

        case ACTIONS.APPLY_PROMO:
            return {
                ...state,
                promoApplied: true
            }

        case ACTIONS.RESET_APP:
            return {
                ...initialState,
                products: state.products,
                categories: state.categories
            }

        default:
            return state
    }
}

// context
const AppContext = createContext()

// hooks personnalisé
export function useAppContext() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider')
    }
    return context
}

// provider
export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    // actions helpers
    const actions = {
        setScreen: (screen) => dispatch({ type: ACTIONS.SET_SCREEN, payload: screen }),
        setStep: (step) => dispatch({ type: ACTIONS.SET_STEP, payload: step }),
        setServiceMode: (mode) => dispatch({ type: ACTIONS.SET_SERVICE_MODE, payload: mode }),
        setTableNumber: (number) => dispatch({ type: ACTIONS.SET_TABLE_NUMBER, payload: number }),
        setAllergens: (allergens) => dispatch({ type: ACTIONS.SET_ALLERGENS, payload: allergens }),
        addAllergen: (id) => dispatch({ type: ACTIONS.ADD_ALLERGEN, payload: id }),
        removeAllergen: (id) => dispatch({ type: ACTIONS.REMOVE_ALLERGEN, payload: id }),
        addToCart: (item) => dispatch({ type: ACTIONS.ADD_TO_CART, payload: item }),
        removeFromCart: (id) => dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: id }),
        updateCartItem: (id, updates) => dispatch({ type: ACTIONS.UPDATE_CART_ITEM, payload: { id, updates } }),
        clearCart: () => dispatch({ type: ACTIONS.CLEAR_CART }),
        setCategory: (category) => dispatch({ type: ACTIONS.SET_CATEGORY, payload: category }),
        setProducts: (products) => dispatch({ type: ACTIONS.SET_PRODUCTS, payload: products }),
        setCategories: (categories) => dispatch({ type: ACTIONS.SET_CATEGORIES, payload: categories }),
        showToast: (message, type = 'info') => {
        dispatch({ type: ACTIONS.SHOW_TOAST, payload: { message, type } })
        setTimeout(() => {
            dispatch({ type: ACTIONS.HIDE_TOAST })
        }, 3000)
        },
        hideToast: () => dispatch({ type: ACTIONS.HIDE_TOAST }),
        openModal: (modalName) => dispatch({ type: ACTIONS.OPEN_MODAL, payload: modalName }),
        closeModal: (modalName) => dispatch({ type: ACTIONS.CLOSE_MODAL, payload: modalName }),
        setSelectedProduct: (product) => dispatch({ type: ACTIONS.SET_SELECTED_PRODUCT, payload: product }),
        applyPromo: () => dispatch({ type: ACTIONS.APPLY_PROMO }),
        resetApp: () => dispatch({ type: ACTIONS.RESET_APP })
    }

    // computed values
    const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)
    const cartTotal = state.cart.reduce((sum, item) => sum + item.total_price, 0)
    const hasDiscount = cartCount >= 3
    const finalTotal = hasDiscount ? cartTotal * 0.9 : cartTotal

    const value = {
        ...state,
        actions,
        cartCount,
        cartTotal,
        finalTotal,
        hasDiscount
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}