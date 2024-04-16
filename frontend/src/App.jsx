import { useState, useEffect } from "react";
import { addTodo, fetchTodo, deleteTodo, updateTodo } from "./service/api.js";
import mongoose from "mongoose";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [fetchedTodos, setFetchedTodos] = useState([]);
  const [editingID, setEditingID] = useState();
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchInitialTodos = async () => {
      try {
        const todosData = await fetchTodo();
        setFetchedTodos(todosData);
      } catch (e) {
        console.error("Error fetching data in app.js:", e);
      }
    };
    fetchInitialTodos();
  }, [todos]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (inputValue === "") {
      return;
    } else {
      const _id = new mongoose.Types.ObjectId();
      const newTodo = {
        _id: _id,
        text: inputValue,
        isComplete: true,
      };
      await addTodo(newTodo);
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleDelete = async (_id) => {
    try {
      await deleteTodo(_id);
      setFetchedTodos(fetchedTodos.filter((todo) => todo._id !== _id));
    } catch (e) {
      console.error("Failed to delete from app.js:", e);
    }
  };

  const handleEditClick = (todo) => {
    setEditingID(todo._id);
    setEditText(todo.text);
  };

  const handleSave = async () => {
    console.log("edit id f=befor if", editingID);
    if (editingID) {
      console.log("edit id ", editingID);
      try {
        console.log("updated text in try", editText);
        await updateTodo(editingID, { text: editText });
        console.log("updated text", editText);
        const updatedTodos = fetchedTodos.map((todo) => {
          if (todo._id === editingID) {
            console.log("edit id in if", editingID, " todo id", todo._id);
            return { ...todo, text: editText };
          }
          return todo;
        });
        setFetchedTodos(updatedTodos);
        setEditingID();
        setEditText("");
      } catch (e) {
        console.error("Error updating todo:", e);
        throw e;
      }
    }
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  return (
    <>
      <div className="container">
        <h1>Add Todo Item</h1>
        <input
          type="text"
          name="text"
          placeholder="todo"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          disabled={inputValue === ""}
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
      <h4>Your Todo List</h4>
      <ul>
        {fetchedTodos.map((todo) => (
          <div key={todo._id}>
            <li>
              {todo._id === editingID ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={handleEditChange}
                  />
                  <div className="buttons-container">
                    <button onClick={handleSave}>Save</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-container">{todo.text}</div>
                  <div className="buttons-container">
                    <button onClick={() => handleDelete(todo._id)}>
                      Delete
                    </button>
                    <button onClick={() => handleEditClick(todo)}>Edit</button>
                  </div>
                </>
              )}
            </li>
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
