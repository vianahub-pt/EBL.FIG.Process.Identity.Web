'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import { LoginFormData } from '@/lib/schemas/login.schema';
import { useNotification } from '@/hooks/use-notification';

interface UseLoginOptions {
  successTitle?: string;
  welcomeMessage?: (name: string) => string;
}

export function useLogin(options?: UseLoginOptions) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { success, apiError } = useNotification();

  return useMutation({
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: (data) => {
      setAuth({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        accessTokenExpiresAt: data.accessTokenExpiresAt,
        refreshTokenExpiresAt: data.refreshTokenExpiresAt,
        userId: data.userId,
        name: data.userName,
        urlImage: data.urlImage,
        tenantId: data.tenantId,
        tenantName: data.tenantName,
        appId: data.appId,
        appName: data.appName,
        roleId: data.roleId,
        roleName: data.roleName,
      });
      success(
        options?.successTitle ?? 'Login realizado com sucesso',
        options?.welcomeMessage?.(data.userName) ?? `Bem-vindo, ${data.userName}`
      );
      router.push('/');
    },
    onError: (err) => {
      apiError(err);
    },
  });
}
