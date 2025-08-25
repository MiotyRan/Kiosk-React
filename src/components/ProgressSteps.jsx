import React from "react"
import { useAppContext } from "../context/AppContext"

function ProgressSteps() {
    const { currentStep, currentScreen } = useAppContext()
    
    const steps = [
        { id: 1, icon: 'fas fa-utensils', text: 'Service' },
        { id: 2, icon: 'fas fa-shopping-cart', text: 'Produits' },
        { id: 3, icon: 'fas fa-credit-card', text: 'Paiement' },
    ]

    const getStepClass = (stepId) => {
        if (currentScreen === 'confirmation') {
        return 'completed';
    }

        if (stepId < currentStep) return 'completed';
        if (stepId === currentStep) return 'active';
        return '';
    }

    const getConnectorClass = (stepId) => {
        if (currentScreen === 'confirmation') {
        return 'active';
    }

        return stepId < currentStep ? 'active' : '';
        if (stepId === currentStep -1) return 'active'
    }

    return (
        <div className="progress-steps max-w-4xl mx-auto">
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <div className={`step ${getStepClass(step.id)}`}>
                        <div className={`step-circle ${getStepClass(step.id)}`}>
                            <i className={`${step.icon}`}></i>
                        </div>
                        <span className={`step-text ${getStepClass(step.id)}`}>{step.text}</span>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`step-connector ${getConnectorClass(step.id)}`}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

export default ProgressSteps