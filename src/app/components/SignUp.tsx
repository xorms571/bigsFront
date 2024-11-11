"use client"
import React, { Dispatch, SetStateAction, useState } from "react";
import api from "../api";
type SignUpProps = {
  handleRegiOrLogin: () => void
}
const SignUp = ({handleRegiOrLogin}:SignUpProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", { 
        username, 
        email, 
        password 
      });
      alert("회원가입 성공!");
      handleRegiOrLogin()
      console.log(response.data);
    } catch (error:any) {
      if (error.response) {
        console.error("회원가입 오류:", error.response.data.message);
      } else {
        console.error("회원가입 중 오류:", error.message);
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
        <button type="submit" className="hover:shadow">회원가입</button>
      </form>
    </>
  );
};

export default SignUp;
