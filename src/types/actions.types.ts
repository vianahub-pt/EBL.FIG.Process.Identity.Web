export interface Action {
  id: number;
  tenant: string;
  application: string;
  name: string;
  isActive: boolean;
}

export interface CreateActionRequest {
  appId: number;
  name: string;
  description: string;
}

export interface UpdateActionRequest {
  name: string;
  description: string;
}

export interface GetActionsPagedParams {
  search?: string;
  isActive?: boolean;
  pageNumber?: number;
  pageSize?: number;
}
