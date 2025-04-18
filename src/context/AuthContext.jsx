import { createContext, useEffect, useState } from "react";

import jwtDecode from "jwt-decode";
import {
  clearSession,
  getAccessTokenFromSession,
  getProfileFromSession,
  setProfileToSession,
} from "../utils/storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(getAccessTokenFromSession())
  );
  const [userId, setUserId] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    const storedUser = getProfileFromSession();
    if (storedUser) {
      setUserId(storedUser.id);
      setRole(storedUser.role);
    }
  }, []);

  const login = (accessToken) => {
    // setUserId(1);
    // setRole();
    // setProfileToSession({ id, role: roleName });
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearSession();
    setUserId(null);
    setRole(null);
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userId,
        login,
        logout,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
