import Button from "./Button";
import Category from "./Category";

type EditProps = {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  handleUpdate: (e: React.FormEvent) => void;
  handleCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: string[];
  category: string;
};
const Edit = ({
  handleUpdate,
  title,
  setTitle,
  content,
  setContent,
  categories,
  category,
  handleCategory,
}: EditProps) => {
  return (
    <form onSubmit={handleUpdate} className="editForm">
      <div className="flex gap-3 w-full">
        <input
          className="w-full"
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Category
          categories={categories}
          category={category}
          handleCategory={handleCategory}
        />
      </div>
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div>
        <Button text="완료" type="submit"/>
      </div>
    </form>
  );
};

export default Edit;
