export interface LoginRequest {
  loginIdentifier: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string | null;
  tenantId: number;
  tenantName: string;
  appId: number;
  appName: string;
  userId: number;
  userName: string;
  roleId: number;
  roleName: string;
  urlImage?: string | null;
}

export interface RefreshTokenRequest {
  tenantId: number;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string | null;
  tenantId: number;
  tenantName: string;
  appId: number;
  appName: string;
  userId: number;
  userName: string;
  roleId: number;
  roleName: string;
  urlImage?: string | null;
}
