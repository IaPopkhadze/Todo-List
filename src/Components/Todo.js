import React from "react";
import "./todo.css";
import { useState } from "react";
function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editedTodoId, setEditedTodoId] = useState(null);
  const [editTodo, setEditTodo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), checked: false, text: todo }]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const deleteItem = todos.filter((element) => element.id !== id);
    setTodos(deleteItem);
  };
  const removeAllItems = () => {
    setTodos([]);
  };

  const handleCheckItem = (id) => {
    const checkedItem = todos.map((element) =>
      element.id === id ? { ...element, checked: !element.checked } : element
    );
    setTodos(checkedItem);
  };
  const handleSaveEdit = (id) => {
    if (editTodo) {
      const editedElement = todos.map((element) =>
        element.id === id ? { ...element, text: editTodo } : element
      );
      setTodos(editedElement);
      setEditedTodoId(null);
      editTodo("");
    }
  };
  return (
    <div className="todo_container">
      <form action="">
        <input
          className="myInput"
          type="text"
          required
          placeholder="What need to be done?"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button onClick={(e) => handleSubmit(e)} className="submit_btn">
          Submit
        </button>
      </form>
      {todos.map((element) => {
        return (
          <div
            style={
              element.checked
                ? { backgroundColor: "#467352", color: "white" }
                : null
            }
            className="each_child_container"
            key={element.id}
          >
            <div className="checkBox_text">
              {editedTodoId === element.id ? (
                <input
                  type="text"
                  onChange={(e) => setEditTodo(e.target.value)}
                  value={editTodo}
                  className='editing_input'
                />
              ) : (
                <>
                  {" "}
                  <input
                    checked={element.checked}
                    onClick={() => handleCheckItem(element.id)}
                    className="checkBox"
                    type="checkbox"
                  />
                  <p>{element.text}</p>
                </>
              )}
            </div>
            <div className="delete_edit">
              <button
                onClick={() => setEditedTodoId(element.id)}
                style={
                  editedTodoId === element.id || element.checked
                    ? { display: "none" }
                    : null
                }
                className="edit_btn"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(element.id)}
                className="delete_btn"
              >
                Delete
              </button>

              <button
                className="save_edit_btn"
                style={editedTodoId !== element.id ? { display: "none" } : null}
                onClick={() => handleSaveEdit(element.id)}
              >
                Save Edit
              </button>
            </div>
          </div>
        );
      })}
      {todos.length ? (
        <button onClick={removeAllItems} className="delete_all_item">
          Delete All Item
        </button>
      ) : null}
    </div>
  );
}

export default Todo;
