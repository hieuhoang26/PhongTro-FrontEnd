import { createContext, useEffect, useState } from "react";

import {
  clearSession,
  getAccessTokenFromSession,
  getProfileFromSession,
  setAccessTokenToSession,
  setRefreshTokenToSession,
  setProfileToSession,
} from "../utils/storage";
import { set } from "react-hook-form";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(getAccessTokenFromSession())
  );
  const [userId, setUserId] = useState();
  const [role, setRole] = useState();
  const [isVerify, setIsVerify] = useState();

  useEffect(() => {
    const storedUser = getProfileFromSession();
    if (storedUser) {
      setUserId(storedUser.id);
      setRole(storedUser.role);
    }
  }, []);

  const login = (data) => {
    setUserId(data.id);
    setRole(data.role);
    setIsVerify(data.verify);
    setProfileToSession({ id: data.id, role: data.role, phone: data.phone });
    setAccessTokenToSession(data.accessToken);
    setRefreshTokenToSession(data.refreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearSession();
    setUserId(null);
    setRole(null);
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userId,
        login,
        logout,
        isVerify,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
