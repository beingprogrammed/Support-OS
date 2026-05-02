import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock users database
const MOCK_USERS = {
  'admin@supportos.com': { password: 'admin123', name: 'Admin User', role: 'admin' },
  'agent@supportos.com': { password: 'agent123', name: 'Support Agent', role: 'agent' },
  'customer@supportos.com': { password: 'customer123', name: 'Valued Customer', role: 'customer' },
  'super@supportos.com': { password: 'super123', name: 'Platform Admin', role: 'superadmin' },
};

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('supportos_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUser = MOCK_USERS[email];
        if (mockUser && mockUser.password === password) {
          const userData = {
            email,
            name: mockUser.name,
            role: mockUser.role,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${mockUser.name}`,
          };
          setUser(userData);
          localStorage.setItem('supportos_user', JSON.stringify(userData));
          setLoading(false);
          resolve(userData);
        } else {
          setLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('supportos_user');
    navigate('/login');
  };

  return {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };
};

export default useAuth;
