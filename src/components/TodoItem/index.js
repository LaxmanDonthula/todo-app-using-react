import { FaRegEdit } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import "./index.css";

const TodoItem = (props) => {
  const { listItem, deleteListItem, editItem } = props;
  const { title, id , counter} = listItem;

  const onDeleteTodo = () => {
    deleteListItem(id);
  };

  const onEditItem = () => {
    editItem(id);
  };

  return (
    <li className="listItem">
      <p className="title">{title}</p>
      <p className="counter">(Updated {counter} times )</p>

      <div className="icons-container">
        <button
          type="button"
          className="todo-button"
          onClick={() => onEditItem(id)}
        >
          <FaRegEdit className="edit-btn" />
        </button>
        <button type="button" className="todo-button" onClick={onDeleteTodo}>
          <IoIosClose className="delete-btn" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
