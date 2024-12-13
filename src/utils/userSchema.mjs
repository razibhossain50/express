export const userSchema = {
    name: {
        notEmpty: {
            errorMessage: 'Name is required'
        },
        isLength: {
            options: { min: 3, max: 30 },
            errorMessage: 'Name must be between 3 and 30 characters'
        },
    },
    email: {
        notEmpty: {
            errorMessage: 'Email is required'
        },
        isEmail: {
            errorMessage: 'Email is not valid'},
    },
    age: {
        notEmpty: {
            errorMessage: 'Age is required'
        },
        isNumeric: {
            errorMessage: 'Age must be numeric'
        },
    }
}