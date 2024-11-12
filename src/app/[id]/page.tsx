"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import UserInfo from "../components/UserInfo";
import { useState } from "react";
import Button from "../components/Button";
import api from "../utils/api";
import { AxiosError } from "axios";
import Edit from "../components/Edit";
import { useAuth } from "../utils/authFunctions";
import { useBoards } from "../utils/boardsFunctions";

const Page = () => {
  const { handleLogout } = useAuth();
  const { createCategories, setEditMode, editMode } = useBoards();
  const router = useRouter();
  const [currentTitle, setTitle] = useState("");
  const [currentContent, setContent] = useState("");
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(createCategories[0]);
  const params = Object.fromEntries(searchParams.entries());
  const { category, authorId, createdAt, title, content, userId } = params;

  const pathname = usePathname();
  const postId = pathname.split("/")[1];
  const handleCurrentEdit = () => {
    setEditMode(true);
    setTitle(title);
    setContent(content);
  };
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        await api.put(
          `/boards/${postId}`,
          {
            title: currentTitle,
            content: currentContent,
            category: selectedCategory,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("게시물 수정 완료.");
        router.push(
          `${pathname}?category=${category}&authorId=${authorId}&createdAt=${createdAt}&title=${currentTitle}&content=${currentContent}&userId=${userId}`
        );
        setTitle(currentTitle);
        setContent(currentContent);
        setSelectedCategory(category);
        setEditMode(false);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("게시판 수정 오류:", error);
        if (error.response && error.response.status === 403) {
          console.log("토큰 만료.");
        } else {
          console.log(error);
        }
      } else {
        console.error(error);
      }
    }
  };

  const handleCurrentDelete = async () => {
    try {
      if (typeof window !== "undefined"){
        const token = localStorage.getItem("accessToken");
        await api.delete(`/boards/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("게시물 삭제 완료.");
        router.push("/");
      }
    } catch (error) {
      console.error("게시물 삭제 오류:", error);
    }
  };

  return (
    <div className="allContainer flex w-full h-full gap-5">
      <div className="bg-white boardContainer flex flex-col w-full border border-black rounded-md py-4 h-full">
        <div className="px-4 mb-4 border-b border-black">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="">
                <span className="font-light text-base">제목:</span> {title}
              </h2>
              <p>
                카테고리: <b>{category}</b>
              </p>
            </div>
            <Button
              text="뒤로가기"
              onClick={() =>
                editMode ? setEditMode(!editMode) : router.push("/")
              }
            />
          </div>
          <div className="flex justify-between items-center pb-4">
            <p>날짜: {new Date(createdAt).toLocaleString()}</p>
            {userId === authorId && (
              <div>
                <Button
                  text="수정"
                  onClick={() => handleCurrentEdit()}
                  className="mr-2"
                />
                <Button text="삭제" onClick={() => handleCurrentDelete()} />
              </div>
            )}
          </div>
        </div>
        {editMode ? (
          <Edit
            handleUpdate={handleUpdate}
            content={currentContent}
            setContent={setContent}
            setTitle={setTitle}
            title={currentTitle}
          />
        ) : (
          <div>
            <p>내용: {content}</p>
          </div>
        )}
      </div>
      <UserInfo handleLogout={handleLogout} />
    </div>
  );
};

export default Page;
