export interface UserItem {
  id: number;
  isActive: boolean;
}

export interface AppItem {
  id: number;
  isActive: boolean;
}

export interface DashboardResponse {
  usersCount: number;
  usersStatus: UserItem[];
  rolesCount: number;
  actionsCount: number;
  resourcesCount: number;
  appsCount: number;
  appsStatus: AppItem[];
  tenantsCount: number;
  rolePermissionsCount: number;
  userRolesCount: number;
}
