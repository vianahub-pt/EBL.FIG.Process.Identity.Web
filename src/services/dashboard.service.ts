import api from '@/lib/axios';
import { logApiError } from '@/lib/service-log';
import { DashboardResponse } from '@/types/dashboard.types';

export const dashboardService = {
  getDashboard: async (): Promise<DashboardResponse> => {
    try {
      const res = await api.get<DashboardResponse>('/v1/dashboard');
      return res.data;
    } catch (error: unknown) {
      logApiError('dashboard', 'getDashboard', error);
      throw error;
    }
  },
};
