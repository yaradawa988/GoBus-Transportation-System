import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {

      const response = await api.get("/auth/profile");

      setUser(response.data.user);

    } catch (error) {

      localStorage.removeItem("token");
      setUser(null);

    } finally {

      setLoading(false);

    }
  };

  const login = (token, userData) => {

    localStorage.setItem("token", token);

    setUser(userData);
  };

  const logout = async () => {

    try {

      await api.post("/auth/logout");

    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}