import React from "react";
import PropTypes from "prop-types";

const ListContents = ({ toDoList, removeList, toggleCheckbox }) => {
  const handleRemoveClick = () => {
    removeList(toDoList.id);
  };

  const handleToggle = (key) => {
    toggleCheckbox(toDoList.id, key);
  };

  if (!toDoList || !toDoList.text) {
    return null;
  }

  return (
    <li className={`list_item_wrapper ${toDoList.purchased && toDoList.packed ? "completed" : ""}`}>
      <div className="list_item_content">
        <button className="remove_btn" onClick={handleRemoveClick}>
          &times;
        </button>
        <span className="list_item_text">{toDoList.text}</span>
        <div className="checkboxes">
          <div>
            <input
              type="checkbox"
              checked={toDoList.purchased}
              onChange={() => handleToggle("purchased")}
              name="purchased"
            />
            <label htmlFor="purchased">買った</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={toDoList.packed}
              onChange={() => handleToggle("packed")}
              name="packed"
            />
            <label htmlFor="packed">入れた</label>
          </div>
        </div>
      </div>
    </li>
  );
};

ListContents.propTypes = {
  toDoList: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    purchased: PropTypes.bool.isRequired, // Added
    packed: PropTypes.bool.isRequired, // Added
  }).isRequired,
  removeList: PropTypes.func.isRequired,
  toggleCheckbox: PropTypes.func.isRequired, // Ensure this is required
};

export default ListContents;
