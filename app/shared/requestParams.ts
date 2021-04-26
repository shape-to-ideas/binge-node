export const requestParams = {
    "register": {
        username: {
            required: true,
            type: 'string',
            pattern: '/^[A-Za-z0-9]*$/'
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
            pattern: '/^(?!.{251})([a-zA-ZÀ-ÿ0-9_\\-\\.]{1,})@([a-zA-Z0-9_\\-]{2,}).([a-zA-Z]{2,})(.([a-zA-Z]){2,})?$|^(d{10})$/'
        }
    },
    "login": {
        username: {
            required: true,
            type: 'string',
            pattern: '/^[A-Za-z0-9]*$/'
        },
        password: {
            required: true,
            type: 'string',
        },
        // email: {
        //     required: true,
        //     type: 'string',
        //     pattern: '/^(?!.{251})([a-zA-ZÀ-ÿ0-9_\\-\\.]{1,})@([a-zA-Z0-9_\\-]{2,}).([a-zA-Z]{2,})(.([a-zA-Z]){2,})?$|^(d{10})$/'
        // }
    }
}