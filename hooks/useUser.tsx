'use client';

import { useSession } from "next-auth/react";

export function useUser() {
  const { data: session, status, update } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const isGuest = status === "unauthenticated";

  return {
    user: session?.user ? {
      id: session.user.id as string,
      email: session.user.email!,
      name: session.user.name,
      image: session.user.image,
    } : null,
    isLoading,
    isAuthenticated,
    isGuest,
    update,
  };
}
