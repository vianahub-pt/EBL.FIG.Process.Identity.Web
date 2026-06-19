import api from '@/lib/axios';
import { logApiError } from '@/lib/service-log';
import { LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from '@/types/auth.types';

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/v1/auth/login', data);
      return response.data;
    } catch (error: unknown) {
      logApiError('auth', 'login', error);
      throw error;
    }
  },

  refresh: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
    try {
      const response = await api.post<RefreshTokenResponse>('/v1/auth/refresh', data);
      return response.data;
    } catch (error: unknown) {
      logApiError('auth', 'refresh', error);
      throw error;
    }
  },
};
