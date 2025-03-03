import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void; // Update login type to accept only token
  logout: () => void;
  getToken: () => string | null;
}
const AuthContext = createContext<AuthContextType | null>(null); // Add this line at the top

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize isAuthenticated based on token existence
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem("token");
    }
    return false;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("Initializing auth...");
      const token = localStorage.getItem("token");
      console.log("Current auth state:", { hasToken: !!token, isAuthenticated });

      if (token) {
        try {
          const tokenParts = token.split(".");
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            console.log("Token payload:", payload);
            
            if (payload.exp && payload.exp * 1000 > Date.now()) {
              setIsAuthenticated(true);
            } else {
              console.log("Token expired");
              localStorage.removeItem("token");
              setIsAuthenticated(false);
            }
          }
        } catch (error) {
          console.error("Token validation error:", error);
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);
  const login = (token: string) => {
    if (token) {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };
  const getToken = () => {
    return localStorage.getItem('token');
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
