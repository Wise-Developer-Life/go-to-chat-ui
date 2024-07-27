import backendApi from "./baseApi";


export const loginApi = async (email: string, password: string) => {
    const response = await backendApi().post('/auth/login', {
        email,
        password,
    });

    return response.data;
}

export const refreshTokenApi = async () => {
    const response = await backendApi().post('/auth/refresh', {}, {
        headers: {
            'Authorization': `${localStorage.getItem('refresh_token')}`
        }
    });
    return response.data;
};
