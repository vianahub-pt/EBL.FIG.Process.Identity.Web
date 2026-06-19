'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Loader2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginSchema, LoginFormData } from '@/lib/schemas/login.schema';
import { useLogin } from '@/hooks/use-auth';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

export default function LoginPage() {
  const t = useTranslations('auth.login');
  const { mutate: login, isPending } = useLogin({
    successTitle: t('successTitle'),
    welcomeMessage: (name) => t('welcomeMessage', { name }),
  });

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginIdentifier: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Barra superior com toggles */}
      <div className="flex justify-end items-center p-4 gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex items-center justify-center p-4">
        {/* Desktop: split-screen */}
        <div className="w-full max-w-5xl flex">
          {/* Lado esquerdo — branding (oculto em mobile, visível em lg) */}
          <div className="hidden lg:flex flex-1 items-center justify-center bg-primary rounded-l-2xl p-12">
            <div className="text-primary-foreground text-center space-y-4">
              <div className="flex justify-center">
                <Shield className="h-20 w-20" />
              </div>
              <h1 className="text-4xl font-bold">Identity</h1>
              <p className="text-lg opacity-80">Gestão de Identidade e Acesso</p>
            </div>
          </div>

          {/* Lado direito — formulário */}
          <div className="w-full lg:flex-1 flex items-center justify-center lg:bg-card lg:rounded-r-2xl lg:shadow-xl">
            <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
              <CardHeader className="space-y-1 pb-6">
                {/* Logo mobile */}
                <div className="flex justify-center mb-4 lg:hidden">
                  <div className="bg-primary rounded-full p-3">
                    <Shield className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-center">
                  {t('title')}
                </CardTitle>
                <CardDescription className="text-center">
                  {t('subtitle')}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="loginIdentifier"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('loginIdentifier')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('loginIdentifierPlaceholder')}
                              autoComplete="username"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('password')}</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder={t('passwordPlaceholder')}
                              autoComplete="current-password"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t('loading')}
                        </>
                      ) : (
                        t('submit')
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
