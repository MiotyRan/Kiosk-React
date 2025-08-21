import React from "react"
import { useAppContext } from "../context/AppContext"

function ProgressSteps() {
    const { currentStep } = useAppContext()
    
    const steps = [
        { id: 1, icon: 'fas fa-utensils', text: 'Service' },
        { id: 2, icon: 'fas fa-shopping-cart', text: 'Produits' },
        { id: 3, icon: 'fas fa-credit-card', text: 'Paiement' },
    ]

    const getStepClass = (stepId) => {
        if (stepId < currentStep) return 'completed';
        if (stepId === currentStep) return 'active';
        return '';
    }

    const getConnectorClass = (stepId) => {
        return stepId < currentStep ? 'active' : '';
    }

    return (
        <div className="progress-steps flex justify-center mt-4">
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    {/* <div className={`step ${getStepClass(step.id)} flex items-center`}> */}
                    <div className={`step ${getStepClass(step.id)}`}>
                        <div className="step-circle">
                            <i className={`${step.icon} text-2xl`}></i>
                        </div>
                        <span className="ml-2">{step.text}</span>
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