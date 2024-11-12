import React from "react";
type BoardTopProps = {
  isWriting: boolean;
  editMode: boolean;
  category: string;
  isWritingHandler: () => void;
};
const BoardTop = ({
  category,
  editMode,
  isWriting,
  isWritingHandler,
}: BoardTopProps) => {
  return (
    <div className="flex justify-between items-start mb-3">
      <h2>
        {isWriting
          ? `게시물 ${editMode ? "수정" : "작성"}`
          : category + " 게시판"}
      </h2>
      <b className="cursor-pointer hover:underline" onClick={isWritingHandler}>
        {isWriting ? "뒤로가기" : `게시물 작성`}
      </b>
    </div>
  );
};

export default BoardTop;
