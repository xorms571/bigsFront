"use client";
import { useEffect, useState } from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserInfo from "./components/UserInfo";
import Board from "./components/Board";

export default function Home() {
  const [regiOrLogin, setRegiOrLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("accessToken") ? true : false
  );
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
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleRegiOrLogin = () => {
    setRegiOrLogin(!regiOrLogin);
  }
  return (
    <>
      {isLoggedIn ? (
        <div className="flex w-full h-full gap-5">
          <Board logout={handleLogout}/>
          <UserInfo handleLogout={handleLogout} />
        </div>
      ) : (
        <div className="flex flex-col items-end border-black border p-5 w-fit h-fit rounded-md">
          {regiOrLogin ? <SignUp handleRegiOrLogin={handleRegiOrLogin} /> : <SignIn onLogin={handleLoginStatus} />}
          <p
            onClick={handleRegiOrLogin}
            className="mt-5 cursor-pointer hover:underline"
          >
            {regiOrLogin ? "로그인" : "회원가입"}
          </p>
        </div>
      )}
    </>
  );
}
