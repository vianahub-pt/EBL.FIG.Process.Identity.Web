import api from '@/lib/axios';
import { logApiError } from '@/lib/service-log';
import { PaginatedResponse } from '@/types/api.types';
import {
  App,
  CreateAppRequest,
  UpdateAppRequest,
  GetAppsPagedParams,
} from '@/types/apps.types';

export const appsService = {
  getAppById: async (id: number): Promise<App> => {
    try {
      const res = await api.get<App>(`/v1/apps/${id}`);
      return res.data;
    } catch (error: unknown) {
      logApiError('apps', 'getAppById', error);
      throw error;
    }
  },

  getAppsPaged: async (params: GetAppsPagedParams): Promise<PaginatedResponse<App>> => {
    try {
      const res = await api.get<PaginatedResponse<App>>('/v1/apps/paged', { params });
      return res.data;
    } catch (error: unknown) {
      logApiError('apps', 'getAppsPaged', error);
      throw error;
    }
  },

  createApp: async (data: CreateAppRequest): Promise<void> => {
    try {
      await api.post('/v1/apps/', data);
    } catch (error: unknown) {
      logApiError('apps', 'createApp', error);
      throw error;
    }
  },

  updateApp: async (id: number, data: UpdateAppRequest): Promise<void> => {
    try {
      await api.put(`/v1/apps/${id}`, data);
    } catch (error: unknown) {
      logApiError('apps', 'updateApp', error);
      throw error;
    }
  },

  deleteApp: async (id: number): Promise<void> => {
    try {
      await api.delete(`/v1/apps/${id}`);
    } catch (error: unknown) {
      logApiError('apps', 'deleteApp', error);
      throw error;
    }
  },

  bulkUploadApps: async (file: File): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await api.post('/v1/apps/bulk-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error: unknown) {
      logApiError('apps', 'bulkUploadApps', error);
      throw error;
    }
  },
};
