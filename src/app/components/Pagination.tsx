import React from "react";
import Button from "./Button";
import { PaginationInterface } from "../utils/interface";

const Pagination = ({
  handleNextPage,
  handlePrevPage,
  getPageNumbers,
  page,
  pageSize,
  setPage,
  totalCount,
}: PaginationInterface) => {
  return (
    <div className="flex justify-center gap-3">
      <Button
        text="<<"
        onClick={() => setPage(1)}
        className="px-2"
        disabled={page === 1}
      />
      <Button
        text="<"
        onClick={handlePrevPage}
        className="px-2"
        disabled={page === 1}
      />
      {getPageNumbers().map((number) => (
        <Button
          key={number}
          text={number.toString()}
          onClick={() => setPage(number)}
          className={number === page ? "underline px-2" : "px-2"}
        />
      ))}
      <Button
        text=">"
        onClick={handleNextPage}
        className="px-2"
        disabled={page >= Math.ceil(totalCount / pageSize)}
      />
      <Button
        text=">>"
        onClick={() => setPage(Math.ceil(totalCount / pageSize))}
        className="px-2"
        disabled={page >= Math.ceil(totalCount / pageSize)}
      />
    </div>
  );
};

export default Pagination;
