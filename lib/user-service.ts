import { apiClient } from './api-client';
import { ENDPOINTS } from './api-config';
import { RegisterData } from './auth-service';

export interface KYCData {
    idCard: File;
    certification?: File;
    passport?: File;
}

class UserService {
    async submitKYC(data: KYCData): Promise<any> {
        const formData = new FormData();
        if (data.idCard) formData.append('idCard', data.idCard);
        if (data.certification) formData.append('certification', data.certification);
        if (data.passport) formData.append('passport', data.passport);

        return apiClient.uploadFile(ENDPOINTS.SUBMIT_KYC, formData);
    }

    async updateProfile(profileData: any): Promise<any> {
        return apiClient.put(ENDPOINTS.UPDATE_PROFILE, profileData);
    }

    async getProfile(): Promise<any> {
        return apiClient.get(ENDPOINTS.PROFILE);
    }

    async submitEnglishTest(score: number): Promise<any> {
        // Assuming we have an endpoint for this, or it's part of profile update
        // For now, let's update profile with test result
        return this.updateProfile({ englishTestScore: score, englishTestPassed: score >= 80 });
    }
}

export const userService = new UserService();
export default userService;
