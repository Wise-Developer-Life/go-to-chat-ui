const authStore = {
    getAccessToken: () => {
        return localStorage.getItem('access_token');
    },
    setAccessToken: (accessToken: string) => {
        localStorage.setItem('access_token', accessToken);
    },
    getRefreshToken: () => {
        return localStorage.getItem('refresh_token');
    },
    setRefreshToken: (refreshToken: string) => {
        localStorage.setItem('refresh_token', refreshToken);
    },
    clearTokens: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
};

export default authStore;
