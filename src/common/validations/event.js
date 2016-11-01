export default function validateEvent(event) {
    let errors = {};

    if (event.title.trim() === "") {
        errors.title = 'This field is required'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}