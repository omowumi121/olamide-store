import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

declare const AuthContext: React.Context<any>;
declare const AuthProvider: ({ children, config }: {
    children: React.ReactNode;
    config?: {
        baseUrl: string;
    };
}) => react_jsx_runtime.JSX.Element;

declare const useAuth: () => any;

interface User {
    id: string | number;
    name: string;
    email: string;
    is_admin?: boolean;
    created_at?: string;
}
interface AuthResponse {
    token: string;
    user: User;
    message?: string;
}
interface AuthCredentials {
    email: string;
    password?: string;
    name?: string;
}

declare const tokenManager: {
    set: (token: string) => void;
    get: () => string | null;
    remove: () => void;
};

export { AuthContext, type AuthCredentials, AuthProvider, type AuthResponse, type User, tokenManager, useAuth };
