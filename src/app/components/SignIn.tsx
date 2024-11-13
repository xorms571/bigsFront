"use client";
import { useState } from "react";
import api from "../utils/api";
import Button from "./Button";
import { AxiosError } from "axios";
type SignInProps = {
  onLogin: (isLoggedIn: boolean) => void;
};
const SignIn = ({ onLogin }: SignInProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.accessToken;
      const username = response.data.username;
      const userId = response.data.userId;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("email", email);
      localStorage.setItem("username", username);
      localStorage.setItem("userId", userId);
      onLogin(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          const errorMessage = error.response.data.message;
          alert(errorMessage);
        } else {
          console.error("네트워크 오류:", error);
          alert(
            "서버와의 연결에 문제가 발생했습니다. 나중에 다시 시도해주세요."
          );
        }
      }
      console.error("로그인 중 오류:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="h-56">
        <h2>로그인</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button text="로그인" type="submit" />
      </form>
    </>
  );
};

export default SignIn;
