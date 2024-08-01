import React, {createContext, useContext, useEffect, useState} from 'react';
import {loginApi, logoutApi} from "../api/authApi";
import {getUserApi} from "../api/userApi";
import authStore from "../store/auth_store";

interface User {
    email: string;
    name: string;
    avatarUrl: string;
}

interface UserLoginRequest {
    email: string;
    password: string;
}

interface UserContextType {
    user: User | null;
    login: (userData: UserLoginRequest) => Promise<void>;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: { children: React.ReactNode }) => {
    const accessTokenInStore = authStore.getAccessToken();
    const [accessToken, setAccessToken] = useState<string | null>(accessTokenInStore);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!accessToken) {
            setUser(null);
            return;
        }

        getUserApi()
            .then(({data: userData}) => {
                setUser({
                    email: userData.email,
                    name: userData.name,
                    // TODO: replace test url to real
                    avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                })
            })
            .catch((error) => {
                console.log(error);
                setUser(null)
            });
    }, [accessToken]);

    const login = async (request: UserLoginRequest) => {
        const {data: authData} = await loginApi(request.email, request.password);

        if (authData) {
            authStore.setAccessToken(authData['access_token']);
            authStore.setRefreshToken(authData['refresh_token']);
            setAccessToken(authData['access_token']);
        }
    };

    const logout = async () => {
        logoutApi()
            .then(() => {
                console.log('logout success at backend')
                authStore.clearTokens();
                setAccessToken(null);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
