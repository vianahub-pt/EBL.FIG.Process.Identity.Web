export interface Role {
  id: number;
  tenant: string;
  application: string;
  name: string;
  isActive: boolean;
}

export interface UpdateRoleRequest {
  name: string;
  description?: string;
}

export interface GetRolesPagedParams {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
}
