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
          const errorCode = error.response.data.code;
          const errorMessage = error.response.data.message;
          switch (errorCode) {
            case "MISSING_FIELDS":
              alert(errorMessage);
              break;
            case "PASSWORD_MISMATCH":
              alert(errorMessage);
              break;
            case "INVALID_PASSWORD":
              alert(
                errorMessage
              );
              break;
            case "EMAIL_EXISTS":
              alert(errorMessage);
              break;
            default:
              alert(errorMessage);
          }
        } else {
          console.error("네트워크 오류:", error);
          alert(
            "서버와의 연결에 문제가 발생했습니다. 나중에 다시 시도해주세요."
          );
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleRegister} className="h-48">
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
