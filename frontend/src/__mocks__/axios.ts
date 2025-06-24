const axios: any = {
    create: jest.fn(() => axios),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
        response: {
            use: jest.fn(),
        },
    },
    defaults: {
        headers: {
            common: {},
        },
    },
};

export default axios;