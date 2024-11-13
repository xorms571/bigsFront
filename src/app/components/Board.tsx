import Category from "./Category";
import Pagination from "./Pagination";
import type { BoardProps2 } from "../utils/interface";
import { useEffect } from "react";
import { useBoards } from "../utils/boardsFunctions";
import Post from "./Post";
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
}: BoardProps2) => {
  const { fetchBoards } = useBoards();
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

  useEffect(() => {
    fetchBoards(page, pageSize, category);
  }, []);

  const props = {
    handleNextPage,
    handlePrevPage,
    getPageNumbers,
    page,
    pageSize,
    setPage,
    totalCount,
    boards,
    user,
    handlePostClick,
    handleDelete,
    handleEdit,
    categories,
    category,
    handleCategory,
  };
  return (
    <ul className="board h-full flex flex-col justify-between gap-4">
      <p className="text-end">
        카테고리 : <Category {...props} />
      </p>
      <Post {...props} />
      <Pagination {...props} />
    </ul>
  );
};

export default Board;
