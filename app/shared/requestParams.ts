export const requestParams = {
    "register": {
        username: {
            required: true,
            type: 'string',
            pattern: '([a-zA-Z0-9_])'
        },
        password: {
            required: true,
            type: 'string',
        },
        firstname: {
            required: true,
            type: 'string',
        },
        lastname: {
            required: true,
            type: 'string',
        },
        email: {
            required: true,
            type: 'string',
            pattern: '[a-zA-Z0-9]+@+[a-zA-Z]+.+[a-zA-z]'
        }
    }
}