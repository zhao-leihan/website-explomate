import { apiClient } from './api-client';
import { ENDPOINTS } from './api-config';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    role: 'TOURIST' | 'GUIDE';
    profile?: {
        firstName: string;
        lastName: string;
        phone: string;
    };
}

export interface AuthResponse {
    token: string;
    refreshToken: string;
    user: User;
}

export interface User {
    id: string;
    email: string;
    role: 'TOURIST' | 'GUIDE' | 'ADMIN';
    kycStatus: 'NOT_SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED';
    profile?: {
        firstName: string;
        lastName: string;
        phone: string;
        photoUrl?: string;
        bio?: string;
    };
}

class AuthService {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>(
            ENDPOINTS.LOGIN,
            credentials
        );

        // Store tokens
        apiClient.setToken(response.token);
        apiClient.setRefreshToken(response.refreshToken);

        // Store user
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(response.user));
        }

        return response;
    }

    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>(
            ENDPOINTS.REGISTER,
            data
        );

        // Store tokens
        apiClient.setToken(response.token);
        apiClient.setRefreshToken(response.refreshToken);

        // Store user
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(response.user));
        }

        return response;
    }

    async getCurrentUser(): Promise<User> {
        const response = await apiClient.get<User>(ENDPOINTS.ME);

        // Update stored user
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(response));
        }

        return response;
    }

    async logout(): Promise<void> {
        apiClient.clearAuth();

        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }

    getStoredUser(): User | null {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        }
        return null;
    }

    isAuthenticated(): boolean {
        if (typeof window !== 'undefined') {
            return !!localStorage.getItem('accessToken');
        }
        return false;
    }
}

export const authService = new AuthService();
export default authService;
