import backendApiBase from "./baseApi";

interface RegisterApiRequest {
    email: string;
    password: string;
    name: string;
}
export const registerApi = async (request: RegisterApiRequest) => {
    const response = await backendApiBase().post('/user', request);
    return response.data;
}

export const getUserApi = async () => {
    const response = await backendApiBase(true).get(`/user`);
    return response.data;
};
