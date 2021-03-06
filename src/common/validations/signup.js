export default function validateUser(user) {
    let errors = {};

    if (user.username.trim() === "") {
        errors.username = 'This field is required'
    }

    if (user.password.trim() === "") {
        errors.password = 'This field is required'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}