"use client";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserInfo from "./components/UserInfo";
import EditOrCreate from "./components/EditOrCreate";
import BoardTop from "./components/BoardTop";
import Board from "./components/Board";
import { useRouter } from "next/navigation";
import { useAuth } from "./utils/authFunctions";
import { useBoards } from "./utils/boardsFunctions";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const {
    handleLoginStatus,
    handleLogout,
    handleRegiOrLogin,
    isLoggedIn,
    regiOrLogin,
    setIsLoggedIn,
  } = useAuth();
  const {
    boards,
    fetchBoards,
    pageSize,
    totalCount,
    categories,
    category,
    createCategories,
    page,
    setCategory,
    setPage,
    user,
    handleDelete,
    isWriting,
    setContent,
    setEditMode,
    setIsWriting,
    setTitle,
    editMode,
    setCreateCategory,
    content,
    title,
    createCategory,
    handleSubmit,
    handleUpdate,
    setEditBoardId,
    setUser,
  } = useBoards();

  const isWritingHandler = () => {
    setIsWriting(!isWriting);
    setEditMode(false);
    setTitle("");
    setContent("");
  };
  const handleCreateCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCreateCategory(e.currentTarget.value);
  };

  const handleEdit = (board: Board) => {
    setEditMode(true);
    setIsWriting(true);
    setEditBoardId(board._id);
    setTitle(board.title);
    setContent(board.content);
  };

  const handlePostClick = (
    _id: string,
    category: string,
    authorId: string,
    createdAt: Date,
    title: string,
    content: string,
    userId: string
  ) => {
    if (router) {
      router.push(
        `/${_id}?category=${encodeURIComponent(
          category
        )}&authorId=${encodeURIComponent(
          authorId
        )}&createdAt=${encodeURIComponent(
          createdAt.toLocaleString()
        )}&title=${encodeURIComponent(title)}&content=${encodeURIComponent(
          content
        )}&userId=${encodeURIComponent(userId)}
      `
      );
    }
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value);
    fetchBoards(1, pageSize, e.currentTarget.value);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username");
      const userId = localStorage.getItem("userId");
      if (storedUsername && userId) {
        setUser({ username: storedUsername, id: userId });
      }
      fetchBoards(1, pageSize, category);

      const token = localStorage.getItem("accessToken");
      if (token) setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    fetchBoards(page, pageSize, category);
  }, [page]);

  const props = {
    handleUpdate,
    handleSubmit,
    handleCreateCategory,
    title,
    setTitle,
    content,
    setContent,
    createCategories,
    createCategory,
    boards,
    fetchBoards,
    pageSize,
    totalCount,
    categories,
    category,
    page,
    setCategory,
    setPage,
    user,
    handleDelete,
    setIsWriting,
    setEditMode,
    isWriting,
    setCreateCategory,
    editMode,
    setEditBoardId,
  };
  return (
    <>
      {isLoggedIn ? (
        <div className="allContainer flex w-full h-full gap-4">
          <div className="bg-white boardContainer flex flex-col justify-between w-full border border-black rounded-md py-4 h-full">
            <BoardTop
              category={category}
              editMode={editMode}
              isWriting={isWriting}
              isWritingHandler={isWritingHandler}
            />
            {isWriting ? (
              <EditOrCreate {...props} />
            ) : (
              <Board
                {...props}
                handleCategory={handleCategory}
                handleEdit={handleEdit}
                handlePostClick={handlePostClick}
              />
            )}
          </div>
          <UserInfo handleLogout={handleLogout} />
        </div>
      ) : (
        <div className="signContainer flex flex-col items-end border-black border p-5 w-fit h-fit rounded-md">
          {regiOrLogin ? (
            <SignUp handleRegiOrLogin={handleRegiOrLogin} />
          ) : (
            <SignIn onLogin={handleLoginStatus} />
          )}
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
