'use client';

import { useSession } from "next-auth/react";

export function useUser() {
  const { data: session, status } = useSession();

  return {
    user: session?.user ? {
      id: session.user.id as string,
      email: session.user.email!,
      name: session.user.name,
      image: session.user.image,
    } : null,
    isLoading: status === "loading",
  };
}
