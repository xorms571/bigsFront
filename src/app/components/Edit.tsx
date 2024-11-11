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
    <form onSubmit={handleUpdate}>
      <Category
        categories={categories}
        category={category}
        handleCategory={handleCategory}
      />
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div>
        <button type="submit">완료</button>
      </div>
    </form>
  );
};

export default Edit;
