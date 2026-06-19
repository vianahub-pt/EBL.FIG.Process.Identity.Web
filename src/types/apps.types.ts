export interface App {
  id: number;
  tenant: string;
  name: string;
  isActive: boolean;
}

export interface CreateAppRequest {
  name: string;
  description: string;
}

export interface UpdateAppRequest {
  name: string;
  description: string;
}

export interface GetAppsPagedParams {
  search?: string;
  isActive?: boolean;
  pageNumber?: number;
  pageSize?: number;
}
