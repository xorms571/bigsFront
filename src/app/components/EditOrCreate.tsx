import React from "react";
import Edit from "./Edit";
import Create from "./Create";
import { EditOrCreateInterface } from "../utils/interface";
const EditOrCreate = ({
  content,
  createCategories,
  createCategory,
  editMode,
  handleCreateCategory,
  handleSubmit,
  handleUpdate,
  setContent,
  setTitle,
  title,
}: EditOrCreateInterface) => {
  const props = {
    handleUpdate,
    handleSubmit,
    handleCreateCategory,
    title,
    setTitle,
    content,
    setContent,
    createCategories,
    createCategory,
  };
  return (
    <>
      {editMode ? (
        <Edit {...props} />
      ) : (
        <Create
          {...props}
          handleCategory={handleCreateCategory}
          categories={createCategories}
          category={createCategory}
        />
      )}
    </>
  );
};

export default EditOrCreate;
