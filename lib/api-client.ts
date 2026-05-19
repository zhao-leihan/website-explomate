import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_CONFIG } from './api-config';

class APIClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            timeout: API_CONFIG.TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request interceptor - add JWT token
        this.client.interceptors.request.use(
            (config) => {
                const token = this.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor - handle 401 and refresh token
        this.client.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as any;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken = this.getRefreshToken();
                        if (refreshToken) {
                            const response = await axios.post(
                                `${API_CONFIG.BASE_URL}/api/auth/refresh`,
                                { refreshToken }
                            );

                            const { token } = response.data;
                            this.setToken(token);

                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            return this.client(originalRequest);
                        }
                    } catch (refreshError) {
                        this.clearAuth();
                        window.location.href = '/login';
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    // Token management
    private getToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('accessToken');
        }
        return null;
    }

    private getRefreshToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('refreshToken');
        }
        return null;
    }

    public setToken(token: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', token);
        }
    }

    public setRefreshToken(token: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem('refreshToken', token);
        }
    }

    public clearAuth(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        }
    }

    // HTTP methods
    async get<T>(url: string, params?: any): Promise<T> {
        const response = await this.client.get(url, { params });
        return response.data;
    }

    async post<T>(url: string, data?: any): Promise<T> {
        const response = await this.client.post(url, data);
        return response.data;
    }

    async put<T>(url: string, data?: any): Promise<T> {
        const response = await this.client.put(url, data);
        return response.data;
    }

    async delete<T>(url: string): Promise<T> {
        const response = await this.client.delete(url);
        return response.data;
    }

    async uploadFile<T>(url: string, formData: FormData): Promise<T> {
        const response = await this.client.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
}

export const apiClient = new APIClient();
export default apiClient;
