import React, { useState } from "react";

const AddListForm = ({ addList }) => {
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") return;

    const newList = {
      id: Date.now(),
      text: text,
      purchased: false,
      packed: false,
    };

    addList(newList);
    setText("");
  };

  return (
    <form className="add_list_form" onSubmit={handleSubmit}>
      <input
      className="task_input"
        type="text"
        placeholder="買わなきゃなモノ"
        value={text}
        onChange={handleTextChange}
      />
    </form>
  );
};

export default AddListForm;
