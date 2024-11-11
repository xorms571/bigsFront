import React, { useEffect, useState } from "react";
import api from "../api";
import Edit from "./Edit";
import Create from "./Create";
import Category from "./Category";
type BoardProps = {
  logout: () => void;
};
interface Board {
  id: string;
  _id: string;
  title: string;
  content: string;
  authorId: string;
  category: string;
}
interface User {
  id: string;
  username: string;
}
const Board = ({ logout }: BoardProps) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editBoardId, setEditBoardId] = useState<string | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const categories = ["all", "notice", "free"];
  const [category, setCategory] = useState(categories[0]);

  // 게시판 목록 불러오기
  const fetchBoards = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인을 하세요.");
        window.location.href = "/";
        return;
      }
      const response = await api.get("/boards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBoards(response.data);
    } catch (error: any) {
      console.error("게시판 불러오기 오류:", error);
      if (error.response && error.response.status === 403) {
        console.log("토큰 만료.");
        localStorage.removeItem("accessToken");
        logout();
        window.location.href = "/";
      } else console.log("오류");
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
      setBoards(boards.filter((board) => board.id !== boardId)); // 삭제한 게시물 필터링
      alert("게시물 삭제 완료.");
      fetchBoards();
    } catch (error) {
      console.error("게시물 삭제 오류:", error);
    }
  };

  // 게시물 생성
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken"); // 저장된 토큰을 가져옴

    if (!category) {
      alert("카테고리를 선택하세요.");
      return;
    }
    try {
      const response = await api.post(
        "/boards",
        { title, content, category },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("게시물 작성 완료.");
      setEditMode(false);
      setIsWriting(false);
      fetchBoards();
      console.log(response.data);
    } catch (error) {
      console.error("게시물 작성 실패:", error);
    }
  };

  // 게시물 수정 모드 활성화
  const handleEdit = (board: Board) => {
    setEditMode(true);
    setIsWriting(true);
    setEditBoardId(board._id);
    setTitle(board.title);
    setContent(board.content);
  };

  // 수정된 게시물 제출
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      const response = await api.put(
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
      fetchBoards();
      setIsWriting(false);
      console.log(response.data);
    } catch (error) {
      console.error("게시물 수정 오류:", error);
    }
  };

  useEffect(() => {
    // 로그인한 사용자 정보 (닉네임) 가져오기
    const storedUsername = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    if (storedUsername && userId) {
      setUser({ username: storedUsername, id: userId });
    }
    fetchBoards();
  }, []);


  const isWritingHandler = () => {
    setIsWriting(!isWriting);
    setEditMode(false);
    setTitle("");
    setContent("");
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value);
  };

  const filteredBoards = boards.filter((board) => {
    return category === "all" || board.category === category;
  });  

  return (
    <div className="bg-white board-container w-full border border-black rounded-md p-4 h-full">
      <div className="flex justify-between items-start mb-3">
        <h2>
          {isWriting ? `게시물 ${editMode ? "수정" : "작성"}` : category+" 게시판"}
        </h2>
        <b
          className="cursor-pointer hover:underline"
          onClick={isWritingHandler}
        >
          {isWriting ? "뒤로가기" : `게시물 작성`}
        </b>
      </div>
      {isWriting ? (
        <>
          {editMode ? (
            <Edit
              handleUpdate={handleUpdate}
              content={content}
              setContent={setContent}
              setTitle={setTitle}
              title={title}
              categories={["notice", "free"]}
              category={category}
              handleCategory={handleCategory}
            />
          ) : (
            <Create
              content={content}
              handleSubmit={handleSubmit}
              setContent={setContent}
              setTitle={setTitle}
              title={title}
              handleCategory={handleCategory}
              categories={["notice", "free"]}
              category={category}
            />
          )}
        </>
      ) : (
        <ul className="board">
          <p className="text-end">
            카테고리 :{" "}
            <Category
              categories={categories}
              category={category}
              handleCategory={handleCategory}
            />
          </p>
          {filteredBoards.map((board,i) => (
            <li key={board._id} className={`${i===0&&'mt-3'} py-4 border-t border-black`}>
              <div className="h-8 flex items-center justify-between">
                <p className="text-sm font-extrabold">카테고리 : {board.category}</p>
                {user && user.id === board.authorId && (
                  <div className="text-xs delEditBtn">
                    <button onClick={() => handleEdit(board)} className="mr-2">
                      수정
                    </button>
                    <button onClick={() => handleDelete(board._id)}>
                      삭제
                    </button>
                  </div>
                )}
              </div>
              <h3>
                제목 : <b>{board.title}</b>
              </h3>
              <p>
                내용 : <b>{board.content}</b>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Board;
