import { useState } from 'react';
import { updateTodo } from './service/api.js';

function EditTodo({ todo, onClose }) {
  console.log("Todo in EditTodo:", todo);
  console.log("Todo ID in EditTodo:", todo._id);

  const [text, setText] = useState(todo.text);

  const handleSave = async () => {
    try {
      await updateTodo(todo._id, { text });
      console.log("Todo ID in EditTodo after:", todo._id);
      onClose();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default EditTodo;
