import { BoardProps2} from "../utils/interface";
import Button from "./Button";
const Post = ({
  boards,
  user,
  handlePostClick,
  handleDelete,
  handleEdit,
}: BoardProps2) => {
  return (
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
  );
};

export default Post;
