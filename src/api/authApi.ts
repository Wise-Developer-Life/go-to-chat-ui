import backendApi from "./baseApi";


export const loginApi = async (email: string, password: string) => {
    const response = await backendApi().post('/auth/login', {
        email,
        password,
    });

    return response.data;
}
