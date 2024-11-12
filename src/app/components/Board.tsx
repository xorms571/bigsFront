import Category from "./Category";
import Button from "./Button";
import Pagination from "./Pagination";
import type { Board, User } from "../utils/interface";
import { Dispatch, SetStateAction } from "react";
type BoardProps = {
  categories: string[];
  category: string;
  handleCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  boards: Board[];
  user: User | null;
  handlePostClick: (
    _id: string,
    category: string,
    authorId: string,
    createdAt: Date,
    title: string,
    content: string,
    userId: string
  ) => void;
  handleEdit: (board: Board) => void;
  handleDelete: (boardId: string) => Promise<void>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalCount: number;
  pageSize: number;
};
const Board = ({
  categories,
  category,
  handleCategory,
  boards,
  user,
  handlePostClick,
  handleEdit,
  handleDelete,
  page,
  pageSize,
  setPage,
  totalCount,
}: BoardProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const maxPageDisplay = 3;
  const getPageNumbers = () => {
    const startPage = Math.max(page - Math.floor(maxPageDisplay / 2), 1);
    const endPage = Math.min(startPage + maxPageDisplay - 1, totalPages);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  
  const props = {
    handleNextPage,
    handlePrevPage,
    getPageNumbers,
    page,
    pageSize,
    setPage,
    totalCount,
  };
  return (
    <ul className="board h-full flex flex-col justify-between gap-4">
      <p className="text-end">
        카테고리 :{" "}
        <Category
          categories={categories}
          category={category}
          handleCategory={handleCategory}
        />
      </p>
      <div className="h-full">
        {boards.map((board, i) => (
          <li
            key={board._id}
            className={`${
              i === 0 && "border-t"
            } h-1/6 border-b border-black flex flex-col justify-center hover:bg-white cursor-pointer`}
            onClick={() =>
              user &&
              handlePostClick(
                board._id,
                board.category,
                board.authorId,
                board.createdAt,
                board.title,
                board.content,
                user.id
              )
            }
          >
            <div className="h-8 flex items-center justify-between mb-3">
              <div className="text-xs">
                <p>
                  카테고리 : <b>{board.category}</b>
                </p>
                <span>{new Date(board.createdAt).toLocaleString()}</span>
              </div>
              {user && user.id === board.authorId && (
                <div className="text-xs delEditBtn">
                  <Button
                    text="수정"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      handleEdit(board);
                    }}
                    className="mr-2"
                  />
                  <Button
                    text="삭제"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      handleDelete(board._id);
                    }}
                  />
                </div>
              )}
            </div>
            <h3>
              제목 : <b>{board.title}</b>
            </h3>
          </li>
        ))}
      </div>
      <Pagination {...props} />
    </ul>
  );
};

export default Board;
