import React from "react";
import "./todo.css";
import { useState } from "react";
function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

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
          <div className="each_child_container" key={element.id}>
            <div className="checkBox_text">
              <input className="checkBox" type="checkbox" />
              <p>{element.text}</p>
            </div>
            <div className="delete_edit">
              <button className="edit_btn">Edit</button>
              <button
                onClick={() => handleDelete(element.id)}
                className="delete_btn"
              >
                Delete
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
