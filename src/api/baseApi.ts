import axios from "axios";
import {StatusCodes} from "http-status-codes";
import authStore from "../store/auth_store";

const baseApiWithoutAuthHeader = () => axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_API_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const refreshTokenApi = async () => {
    const response = await baseApiWithoutAuthHeader().post('/auth/refresh', {}, {
        headers: {
            'Authorization': authStore.getRefreshToken(),
        }
    });
    return response.data;
};

const baseApiWithAuthHeader = () => {
    const baseApiWithAuth = baseApiWithoutAuthHeader();
    Object.assign(baseApiWithAuth.defaults.headers, {
        'Authorization': authStore.getAccessToken(),
    });

    let refreshTime = 1;
    baseApiWithAuth.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error?.response?.status !== StatusCodes.UNAUTHORIZED) {
                throw error;
            }

            if (refreshTime > 10) {
                authStore.clearTokens();
                throw error;
            }

            try {
                const { data } = await refreshTokenApi();
                ++refreshTime;
                console.log('refreshed token')

                const newAccessToken = data['access_token'];
                authStore.setAccessToken(newAccessToken);
                error.config.headers['Authorization'] = newAccessToken;
                return baseApiWithAuth.request(error.config);
            } catch (error) {
                authStore.clearTokens();
                throw error;
            }
        }
    );

    return baseApiWithAuth;
}

const backendApiBase = (withAuth = false) => {
    return withAuth ? baseApiWithAuthHeader() : baseApiWithoutAuthHeader();
}


export default backendApiBase;
