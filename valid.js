const formElement = document.querySelector('#survey-form')

async function validateFormData () {
    const formData = new FormData(formElement)
    for (let [key, values] of formData) {
        const whiteList = ["OtherProperty", "otherLiens"]
        if (!whiteList.includes(key) && !values) {
            throw new Error(`${key} cannot be empty!`)
        }
        
        if (key === "email" && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values)) {
            throw new Error('Invalid email address. Please check and try again.')
        }
        
        if (key === "phone" && !/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(values)) {
            throw new Error("Please enter a valid US Phone number")
        }
        
        if (key === "OtherProperty" && formData.get("propertyType").toLowerCase() === "other") {
            if (!values) {
                throw new Error(`Please specify a property type!`)   
            }
        }
        
        if (key === "otherLiens" && formData.get("liens").toLowerCase() === "others") {
            if (!values) {
                throw new Error(`Please specify a liens!`)   
            }
        }
    }
    return true
}

formElement.addEventListener('submit', async (ev) => {
    ev.preventDefault()
    try {
        await validateFormData()
    } catch (error) {
        ev.preventDefault()
        let errorMessage = error.message
        alert(errorMessage)
    }
})

const propertySelectBoxes = formElement.querySelectorAll('.dropdown')
const otherContainers = formElement.querySelectorAll('.dropdown_other')

propertySelectBoxes.forEach((propertySelectBox, index) => {
  propertySelectBox.addEventListener("change", (ev) => {
    const value = ev.target.value
    if (value.toLowerCase() === "other") otherContainers[index].style.display = "block"
    else otherContainers[index].style.display = "none   "
})  
})

