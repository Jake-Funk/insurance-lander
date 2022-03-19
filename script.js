const multiStepForm = document.querySelector("[data-multi-step]")
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]


let currentStep = formSteps.findIndex(step => {
    return step.classList.contains("active")
})

if ( currentStep < 0){
    currentStep = 0
    showCurrentStep()
}

multiStepForm.addEventListener('click', e => {
    let incrementor
    if (e.target.matches("[data-next]")) {
        incrementor = 1
    } else if (e.target.matches("[data-prev]")) {
        incrementor = -1
    } 
    if (incrementor == null) return
    const inputs = [...formSteps[currentStep].querySelectorAll("input")]
    const allValid = inputs.every(input => input.reportValidity())
    if (allValid) {
        currentStep += incrementor
        showCurrentStep()
        formSteps[currentStep].querySelector("[error-message]").classList.add("hide")
    } else {
        formSteps[currentStep].querySelector("[error-message]").classList.remove("hide")
    }
})

formSteps.forEach(step => {
    step.addEventListener("animationend", e => {
        formSteps[currentStep].classList.remove("hide")
        step.classList.toggle("hide", !step.classList.contains("active"))
    })
})

function showCurrentStep() {
    formSteps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep)

    })
}