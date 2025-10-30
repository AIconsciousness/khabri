'use client';

import { useSession } from 'next-auth/react';

export const useAuth = () => {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isAuthenticated: !!session?.user,
    isLoading: status === 'loading',
    isAdmin: session?.user?.role === 'ADMIN',
    isAuthor: session?.user?.role === 'AUTHOR' || session?.user?.role === 'ADMIN',
  };
};
