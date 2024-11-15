import Button from "./Button";
import Category from "./Category";

type CreateProps = {
  handleSubmit: (e: React.FormEvent) => void;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  handleCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: string[];
  category: string;
};
const Create = ({
  handleSubmit,
  title,
  setTitle,
  content,
  setContent,
  handleCategory,
  categories,
  category,
}: CreateProps) => {
  return (
    <form onSubmit={handleSubmit} className="createForm">
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
      <Button text="작성" type="submit" />
    </form>
  );
};

export default Create;
