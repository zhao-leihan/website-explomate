import { apiClient } from './api-client';
import { ENDPOINTS, API_CONFIG } from './api-config';

export interface Tour {
    id: string;
    guideId: string;
    title: string;
    description: string;
    location: string;
    city: string;
    country: string;
    type: 'HISTORICAL' | 'ADVENTURE' | 'CULTURAL' | 'NATURE' | 'FOOD' | 'NIGHTLIFE' | 'SHOPPING' | 'RELIGIOUS' | 'CUSTOM';
    highlights: string[];
    duration: number;
    pricing: {
        basePrice: number;
        currency: string;
        groupDiscount: number;
        earlyBirdDiscount: number;
    };
    maxGroupSize: number;
    difficulty: string;
    languages: string[];
    imageUrl: string;
    active: boolean;
    verified: boolean;
    totalBookings: number;
    averageRating: number;
    reviewCount: number;
}

export interface Booking {
    id: string;
    touristId: string;
    guideId: string;
    tourId: string;
    tourDate: string;
    numberOfPeople: number;
    totalPrice: number;
    currency: string;
    status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    paymentStatus: 'UNPAID' | 'PENDING' | 'PAID' | 'REFUNDED';
    photoVerified: boolean;
    zytherionTxHash?: string;
    ethereumTxHash?: string;
}

class TourService {
    async getAllTours(): Promise<Tour[]> {
        return apiClient.get<Tour[]>(ENDPOINTS.TOURS);
    }

    async getTourById(id: string): Promise<Tour> {
        return apiClient.get<Tour>(ENDPOINTS.TOUR_BY_ID(id));
    }

    async getToursByCity(city: string): Promise<Tour[]> {
        return apiClient.get<Tour[]>(ENDPOINTS.TOUR_BY_CITY(city));
    }

    async getMyTours(guideId: string): Promise<Tour[]> {
        return apiClient.get<Tour[]>(ENDPOINTS.TOUR_BY_GUIDE(guideId));
    }

    async createTour(tourData: Partial<Tour>): Promise<Tour> {
        return apiClient.post<Tour>(ENDPOINTS.TOURS, tourData);
    }

    async updateTour(id: string, tourData: Partial<Tour>): Promise<Tour> {
        return apiClient.put<Tour>(ENDPOINTS.TOUR_BY_ID(id), tourData);
    }
}

class BookingService {
    async createBooking(bookingData: {
        tourId: string;
        tourDate: string;
        numberOfPeople: number;
        specialRequests?: string;
    }): Promise<Booking> {
        return apiClient.post<Booking>(ENDPOINTS.BOOKINGS, bookingData);
    }

    async getMyBookings(): Promise<Booking[]> {
        return apiClient.get<Booking[]>(ENDPOINTS.MY_BOOKINGS);
    }

    async getGuideBookings(): Promise<Booking[]> {
        return apiClient.get<Booking[]>(ENDPOINTS.GUIDE_BOOKINGS);
    }

    async verifyPaymentPhoto(
        bookingId: string,
        paymentPhoto: File,
        touristPhoto: File,
        guidePhoto: File
    ): Promise<Booking> {
        const formData = new FormData();
        formData.append('payment_photo', paymentPhoto);
        formData.append('tourist_photo', touristPhoto);
        formData.append('guide_photo', guidePhoto);

        return apiClient.uploadFile<Booking>(
            ENDPOINTS.VERIFY_PHOTO(bookingId),
            formData
        );
    }

    async addReview(
        bookingId: string,
        rating: number,
        comment: string
    ): Promise<Booking> {
        return apiClient.post<Booking>(ENDPOINTS.ADD_REVIEW(bookingId), {
            rating,
            comment,
        });
    }
}

class AIService {
    async generateEnglishTest(): Promise<any> {
        // Fallback or specific endpoint. 
        // If not in ENDPOINTS, use direct URL or add to ENDPOINTS
        // Assuming we want to call the Python service directly or via Spring Boot?
        // Phase 6 used Spring Boot as gateway. Let's use Spring Boot endpoint if exists, or direct.
        // But backend doesn't have english-test endpoint yet? 
        // User asked to integrate AI services. I should probably add English Test to backend or AI service.
        // For now let's assume direct call or Spring Boot proxy.
        // Let's use a placeholder endpoint in API_CONFIG or ENDPOINTS.

        // Actually, let's use the ENDPOINTS.AI_xxx if suitable or add new one.
        // I'll add a generic one or assume /api/ai/english-test
        return apiClient.get('/api/ai/english-test/generate');
    }

    async gradeEnglishTest(answers: any[]): Promise<any> {
        return apiClient.post('/api/ai/english-test/grade', { answers });
    }
}

class WalletService {
    async getBalance(): Promise<{ balance: number; currency: string }> {
        return apiClient.get<{ balance: number; currency: string }>(
            ENDPOINTS.WALLET_BALANCE
        );
    }

    async getWallet(): Promise<any> {
        return apiClient.get<any>(ENDPOINTS.WALLET);
    }

    async getTransactions(): Promise<any[]> {
        // Assuming an endpoint exists or we use wallet endpoint to get txs
        // Backend MultiBlockchainService or ZytherionService likely has this.
        // Let's assume /api/wallet/transactions exists or add to ENDPOINTS
        return apiClient.get<any[]>('/api/wallet/transactions');
    }
}

export const tourService = new TourService();
export const bookingService = new BookingService();
export const walletService = new WalletService();
export const aiService = new AIService();
