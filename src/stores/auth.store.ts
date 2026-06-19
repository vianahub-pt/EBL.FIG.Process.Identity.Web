import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthUser {
  userId: number;
  name: string;
  urlImage: string | null | undefined;
  tenantId: number;
  tenantName: string;
  appId: number;
  appName: string;
  roleId: number;
  roleName: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: string | null;
  refreshTokenExpiresAt: string | null;
  user: AuthUser | null;
  setAuth: (data: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: string;
    refreshTokenExpiresAt: string | null;
    userId: number;
    name: string;
    urlImage: string | null | undefined;
    tenantId: number;
    tenantName: string;
    appId: number;
    appName: string;
    roleId: number;
    roleName: string;
  }) => void;
  setTokens: (data: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: string;
    refreshTokenExpiresAt: string;
  }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      accessTokenExpiresAt: null,
      refreshTokenExpiresAt: null,
      user: null,
      setAuth: (data) => {
        set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          accessTokenExpiresAt: data.accessTokenExpiresAt,
          refreshTokenExpiresAt: data.refreshTokenExpiresAt,
          user: {
            userId: data.userId,
            name: data.name,
            urlImage: data.urlImage,
            tenantId: data.tenantId,
            tenantName: data.tenantName,
            appId: data.appId,
            appName: data.appName,
            roleId: data.roleId,
            roleName: data.roleName,
          },
        });
        if (typeof document !== 'undefined') {
          document.cookie =
            'auth-storage=' +
            encodeURIComponent(
              JSON.stringify({ state: { accessToken: data.accessToken } })
            ) +
            '; path=/';
        }
      },
      setTokens: (data) =>
        set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          accessTokenExpiresAt: data.accessTokenExpiresAt,
          refreshTokenExpiresAt: data.refreshTokenExpiresAt,
        }),
      clearAuth: () => {
        set({
          accessToken: null,
          refreshToken: null,
          accessTokenExpiresAt: null,
          refreshTokenExpiresAt: null,
          user: null,
        });
        if (typeof document !== 'undefined') {
          document.cookie =
            'auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        accessTokenExpiresAt: state.accessTokenExpiresAt,
        refreshTokenExpiresAt: state.refreshTokenExpiresAt,
        user: state.user,
      }),
    }
  )
);
