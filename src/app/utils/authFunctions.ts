import { useEffect, useState } from "react";
export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [regiOrLogin, setRegiOrLogin] = useState(true);
  const handleLoginStatus = (status: boolean) => {
    setIsLoggedIn(status);
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };
  const handleRegiOrLogin = () => {
    setRegiOrLogin(!regiOrLogin);
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if(token) setIsLoggedIn(true);
  }, []);
  return {
    isLoggedIn,
    handleLoginStatus,
    handleLogout,
    regiOrLogin,
    handleRegiOrLogin,
    setIsLoggedIn,
    setRegiOrLogin,
  };
};
