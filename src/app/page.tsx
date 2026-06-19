// Este ficheiro raramente é atingido — o proxy next-intl reescreve
// internamente "/" para "/[locale]/" antes do routing do Next.js.
// Redireciona para /login como fallback de segurança.
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/login');
}
