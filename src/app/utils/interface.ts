import { Dispatch, SetStateAction } from "react";

export interface User {
  id: string;
  username: string;
}
export interface EditOrCreateInterface {
  handleUpdate: (e: React.FormEvent) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleCreateCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  createCategories: string[];
  createCategory: string;
  editMode: boolean;
}
export interface PaginationInterface {
  setPage: (value: React.SetStateAction<number>) => void;
  page: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  getPageNumbers: () => number[];
  totalCount: number;
  pageSize: number;
}
export interface BoardProps1 {
  id: string;
  _id: string;
  title: string;
  content: string;
  authorId: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface BoardProps2 {
  categories: string[];
  category: string;
  handleCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  boards: BoardProps1[];
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
  handleEdit: (board: BoardProps1) => void;
  handleDelete: (boardId: string) => Promise<void>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalCount: number;
  pageSize: number;
};