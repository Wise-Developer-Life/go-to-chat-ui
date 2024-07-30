import React, {createContext, useContext, useEffect, useState} from 'react';
import {loginApi, refreshTokenApi} from "../api/authApi";
import {getUserApi} from "../api/userApi";

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
    const accessTokenInStore = localStorage.getItem('access_token') ;
    const [accessToken, setAccessToken] = useState<string | null>(accessTokenInStore);
    const [user, setUser] = useState<User | null>(null);


    const refreshToken = async () => {
        const {data: authData} = await refreshTokenApi();
        if (authData['access_token']) {
            localStorage.setItem('access_token', authData['access_token']);
            setAccessToken(authData['access_token']);
        }
    }

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
                if (error.response.status !== 401) {
                    setUser(null);
                    return;
                }

                refreshToken()
                    .then(()=>{
                        console.log('refresh token success');
                    })
                    .catch(() => {
                        setUser(null);
                    });
            });
    }, [accessToken]);

    const login = async (request: UserLoginRequest) => {
        const {data: authData} = await loginApi(request.email, request.password);

        if (authData) {
            localStorage.setItem('access_token', authData['access_token']);
            localStorage.setItem('refresh_token', authData['refresh_token']);
            setAccessToken(authData['access_token']);
        }
    };

    // TODO: remember call logout api
    const logout = async () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setAccessToken(null);
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
