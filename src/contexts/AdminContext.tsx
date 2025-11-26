import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// MongoDB Schema Interface for Admin (for future backend integration)
export interface AdminSchema {
  _id?: string;
  username: string;
  password: string; // Will be hashed in MongoDB
  email: string;
  createdAt?: Date;
  lastLogin?: Date;
}

interface AdminContextType {
  isAdminLoggedIn: boolean;
  adminData: { username: string; email: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState<{ username: string; email: string } | null>(null);

  // Check if admin is logged in on mount (from localStorage)
  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminSession');
    if (storedAdmin) {
      try {
        const parsed = JSON.parse(storedAdmin);
        setIsAdminLoggedIn(true);
        setAdminData(parsed);
      } catch (error) {
        console.error('Error parsing admin session:', error);
        localStorage.removeItem('adminSession');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // TODO: Replace with actual MongoDB API call
    // Example: const response = await fetch('/api/admin/login', { method: 'POST', body: JSON.stringify({ username, password }) });
    
    // Mock credentials for demo (replace with MongoDB authentication)
    const mockAdmin = {
      username: 'admin',
      password: 'admin123', // In production, this will be hashed and verified via MongoDB
      email: 'greenworldrealtors012@gmail.com'
    };

    if (username === mockAdmin.username && password === mockAdmin.password) {
      const adminSession = {
        username: mockAdmin.username,
        email: mockAdmin.email
      };
      
      setIsAdminLoggedIn(true);
      setAdminData(adminSession);
      localStorage.setItem('adminSession', JSON.stringify(adminSession));
      
      // TODO: Update lastLogin in MongoDB
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    setAdminData(null);
    localStorage.removeItem('adminSession');
  };

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, adminData, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
