import { useEffect, useState } from "react";
import { Board, User } from "./interface";
import { AxiosError } from "axios";
import api from "./api";
import { useAuth } from "./authFunctions";

export const boardsFunctions = () => {
  const pageSize = 6;
  const [boards, setBoards] = useState<Board[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const createCategories = ["notice", "free"];
  const categories = ["all", ...createCategories];
  const [category, setCategory] = useState(categories[0]);
  const [createCategory, setCreateCategory] = useState(createCategories[0]);
  const [totalCount, setTotalCount] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [editBoardId, setEditBoardId] = useState<string | null>(null);
  const { handleLogout } = useAuth();

  // 게시판 불러오기
  const fetchBoards = async (
    page: number,
    size = pageSize,
    category: string
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get(
        `/boards?page=${page}&size=${size}&category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBoards(response.data.boards);
      setTotalCount(response.data.totalCount);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("게시판 불러오기 오류:", error);
        if (error.response && error.response.status === 403) {
          console.log("토큰 만료.");
          localStorage.removeItem("accessToken");
          handleLogout();
          window.location.href = "/";
        } else {
          console.log(error);
        }
      } else {
        console.error(error);
      }
    }
  };

  // 게시물 삭제
  const handleDelete = async (boardId: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      await api.delete(`/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBoards(boards.filter((board) => board.id !== boardId));
      alert("게시물 삭제 완료.");
      fetchBoards(1, pageSize, category);
    } catch (error) {
      console.error("게시물 삭제 오류:", error);
    }
  };

  // 게시물 생성
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      await api.post(
        "/boards",
        { title, content, category: createCategory },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("게시물 작성 완료.");
      setEditMode(false);
      setIsWriting(false);
      fetchBoards(page, pageSize, category);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("게시판 작성 오류:", error);
        if (error.response && error.response.status === 403) {
          console.log("토큰 만료.");
          localStorage.removeItem("accessToken");
          handleLogout();
          window.location.href = "/";
        } else {
          console.log(error);
        }
      } else {
        console.error(error);
      }
    }
  };

  // 수정된 게시물 제출
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      await api.put(
        `/boards/${editBoardId}`,
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("게시물 수정 완료.");
      setEditMode(false);
      setEditBoardId(null);
      setTitle("");
      setContent("");
      setIsWriting(false);
      fetchBoards(page, pageSize, category);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("게시판 수정 오류:", error);
        if (error.response && error.response.status === 403) {
          console.log("토큰 만료.");
          localStorage.removeItem("accessToken");
          handleLogout();
          window.location.href = "/";
        } else {
          console.log(error);
        }
      } else {
        console.error(error);
      }
    }
  };

  const storedUsername = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (storedUsername && userId) {
      setUser({ username: storedUsername, id: userId });
    }
    fetchBoards(1, pageSize, category);
  }, []);
  useEffect(() => {
    fetchBoards(page, pageSize, category);
  }, [page]);
  return {
    boards,
    fetchBoards,
    pageSize,
    setBoards,
    totalCount,
    categories,
    category,
    createCategories,
    page,
    setCategory,
    setPage,
    user,
    handleDelete,
    setIsWriting,
    setEditMode,
    isWriting,
    setTitle,
    setContent,
    setCreateCategory,
    editMode,
    title,
    content,
    handleSubmit,
    createCategory,
    setEditBoardId,
    handleUpdate,
  };
};
