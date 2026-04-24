import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface FakeUser {
  email: string;
  name?: string;
  provider: "email" | "google";
  createdAt: string;
}

interface AuthContextValue {
  user: FakeUser | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
  updateProfile: (patch: Partial<FakeUser>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "krousel-user-v1";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FakeUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as FakeUser);
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, []);

  const persist = (u: FakeUser | null) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const wait = (ms = 400) => new Promise((r) => setTimeout(r, ms));

  const signInWithEmail: AuthContextValue["signInWithEmail"] = async (email) => {
    await wait();
    persist({ email, provider: "email", createdAt: new Date().toISOString() });
  };

  const signUpWithEmail: AuthContextValue["signUpWithEmail"] = async (email, _pwd, name) => {
    await wait();
    persist({ email, name, provider: "email", createdAt: new Date().toISOString() });
  };

  const signInWithGoogle: AuthContextValue["signInWithGoogle"] = async () => {
    await wait();
    persist({
      email: "demo@gmail.com",
      name: "Compte Google démo",
      provider: "google",
      createdAt: new Date().toISOString(),
    });
  };

  const signOut = () => persist(null);

  const updateProfile: AuthContextValue["updateProfile"] = (patch) => {
    if (!user) return;
    persist({ ...user, ...patch });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};