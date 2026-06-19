import api from '@/lib/axios';
import { logApiError } from '@/lib/service-log';
import { PaginatedResponse } from '@/types/api.types';
import { Role, UpdateRoleRequest, GetRolesPagedParams } from '@/types/roles.types';

export const rolesService = {
  getRoleById: async (id: number): Promise<Role> => {
    try {
      const res = await api.get<Role>(`/v1/roles/${id}`);
      return res.data;
    } catch (error: unknown) {
      logApiError('roles', 'getRoleById', error);
      throw error;
    }
  },

  getRolesPaged: async (params: GetRolesPagedParams): Promise<PaginatedResponse<Role>> => {
    try {
      const res = await api.get<PaginatedResponse<Role>>('/v1/roles/paged', { params });
      return res.data;
    } catch (error: unknown) {
      logApiError('roles', 'getRolesPaged', error);
      throw error;
    }
  },

  updateRole: async (id: number, data: UpdateRoleRequest): Promise<void> => {
    try {
      await api.put(`/v1/roles/${id}`, data);
    } catch (error: unknown) {
      logApiError('roles', 'updateRole', error);
      throw error;
    }
  },
};
