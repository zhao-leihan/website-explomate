// API Configuration
export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8082',
    AI_SERVICE_URL: process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:8000',
    ZYTHERION_URL: process.env.NEXT_PUBLIC_ZYTHERION_URL || 'http://localhost:8080',
    TIMEOUT: 30000,
};

// API Endpoints
export const ENDPOINTS = {
    // Auth
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',

    // User
    PROFILE: '/api/users/me',
    UPDATE_PROFILE: '/api/users/profile',
    SUBMIT_KYC: '/api/users/kyc',

    // Tours
    TOURS: '/api/tours',
    TOUR_BY_ID: (id: string) => `/api/tours/${id}`,
    TOUR_BY_CITY: (city: string) => `/api/tours/city/${city}`,
    TOUR_BY_GUIDE: (guideId: string) => `/api/tours/guide/${guideId}`,

    // Bookings
    BOOKINGS: '/api/bookings',
    BOOKING_BY_ID: (id: string) => `/api/bookings/${id}`,
    MY_BOOKINGS: '/api/bookings/tourist',
    GUIDE_BOOKINGS: '/api/bookings/guide',
    VERIFY_PHOTO: (id: string) => `/api/bookings/${id}/verify-photo`,
    ADD_REVIEW: (id: string) => `/api/bookings/${id}/review`,

    // Wallet
    WALLET: '/api/wallet',
    WALLET_BALANCE: '/api/wallet/balance',

    // AI Services
    AI_PHOTO_VERIFY: '/verification/payment-photo',
    AI_FINANCIAL_AUDIT: '/audit/analyze',
    AI_KYC_VERIFY: '/verification/document',
};

export default API_CONFIG;
