import api from '@/lib/axios';
import { logApiError } from '@/lib/service-log';
import { PaginatedResponse } from '@/types/api.types';
import {
  Action,
  CreateActionRequest,
  UpdateActionRequest,
  GetActionsPagedParams,
} from '@/types/actions.types';

export const actionsService = {
  getActionById: async (id: number): Promise<Action> => {
    try {
      const res = await api.get<Action>(`/v1/actions/${id}`);
      return res.data;
    } catch (error: unknown) {
      logApiError('actions', 'getActionById', error);
      throw error;
    }
  },

  getActionsPaged: async (params: GetActionsPagedParams): Promise<PaginatedResponse<Action>> => {
    try {
      const res = await api.get<PaginatedResponse<Action>>('/v1/actions/paged', { params });
      return res.data;
    } catch (error: unknown) {
      logApiError('actions', 'getActionsPaged', error);
      throw error;
    }
  },

  createAction: async (data: CreateActionRequest): Promise<void> => {
    try {
      await api.post('/v1/actions/', data);
    } catch (error: unknown) {
      logApiError('actions', 'createAction', error);
      throw error;
    }
  },

  updateAction: async (id: number, data: UpdateActionRequest): Promise<void> => {
    try {
      await api.put(`/v1/actions/${id}`, data);
    } catch (error: unknown) {
      logApiError('actions', 'updateAction', error);
      throw error;
    }
  },

  activateAction: async (id: number): Promise<void> => {
    try {
      await api.patch(`/v1/actions/${id}/activate`);
    } catch (error: unknown) {
      logApiError('actions', 'activateAction', error);
      throw error;
    }
  },

  deactivateAction: async (id: number): Promise<void> => {
    try {
      await api.patch(`/v1/actions/${id}/deactivate`);
    } catch (error: unknown) {
      logApiError('actions', 'deactivateAction', error);
      throw error;
    }
  },

  deleteAction: async (id: number): Promise<void> => {
    try {
      await api.delete(`/v1/actions/${id}`);
    } catch (error: unknown) {
      logApiError('actions', 'deleteAction', error);
      throw error;
    }
  },

  bulkUploadActions: async (file: File): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await api.post('/v1/actions/bulk-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error: unknown) {
      logApiError('actions', 'bulkUploadActions', error);
      throw error;
    }
  },
};
