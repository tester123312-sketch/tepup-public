import { auth } from './auth';
import { redirect } from 'next/navigation';

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login?callbackUrl=/admin');
  }

  if (session.user.role !== 'ADMIN') {
    redirect('/');
  }

  return session;
}

export async function getAdminSession() {
  const session = await auth();

  if (!session?.user || session.user.role !== 'ADMIN') {
    return null;
  }

  return session;
}
