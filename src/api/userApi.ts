import backendApiBase from "./baseApi";

interface RegisterApiRequest {
    email: string;
    password: string;
    name: string;
}

interface UpdateUserApiRequest {
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

export const updateUserApi = async (userId: string, request: UpdateUserApiRequest) => {
    const response = await backendApiBase(true).put(`/user/${userId}`, request);
    return response.data;
}

export const uploadUserProfileImage = async (userId: string, profilePicFile: File) => {
    const response = await backendApiBase(false).post(
        `/user/${userId}/profile-image`,
        {
            'file': profilePicFile,
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    return response.data;
}
