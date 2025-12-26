'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with NextAuth session check
    // IMPORTANT: Clear old cached user ID on mount to prevent 404s
    localStorage.removeItem('currentUserId');

    // Use your actual user ID from Supabase
    // Replace this with your real user ID from the database
    const defaultUser = {
      id: 'cm5akc7wt0000r4u2oo8kgbxl', // YOUR actual user ID from Supabase
      email: 'demo@guitart.app',
      name: 'Alex Rodriguez',
      image: null,
    };
    setUser(defaultUser);

    setIsLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
