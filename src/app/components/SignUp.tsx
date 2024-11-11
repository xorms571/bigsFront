"use client";
import React, { useState } from "react";
import api from "../api";
import Button from "./Button";
import { AxiosError } from "axios";
type SignUpProps = {
  handleRegiOrLogin: () => void;
};
const SignUp = ({ handleRegiOrLogin }: SignUpProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
        confirmPassword,
      });
      alert("회원가입 성공!");
      handleRegiOrLogin();
      console.log(response.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error("회원가입 오류:", error.response.data.message);
        } else {
          console.error("회원가입 중 오류:", error.message);
        }
      }else{
        console.error(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleRegister} className="h-44">
        <h2>회원가입</h2>
        <input
          type="text"
          placeholder="닉네임"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button text="회원가입" type="submit" />
      </form>
    </>
  );
};

export default SignUp;
