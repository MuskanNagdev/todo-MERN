// import { useState, useEffect } from 'react'
// import { addTodo, fetchTodo, deleteTodo } from './service/api.js'
// import mongoose from 'mongoose'
// import './App.css'


// function App() {
//   const [todos, setTodos] = useState([])
//   const [inputValue,setInputValue] = useState('')
//   const [fetchedTodos, setFetchedTodos] = useState([])

//   useEffect(() => {
//     const fetchInitialTodos = async()=> {
//       try{
//         // console.log('Fetching initial',fetchedTodos)
//         const todosData = await fetchTodo();
//         setFetchedTodos(todosData);
//       }catch(e){
//         console.log("error in fetching data in app.js",e)
//       }
//     }
//   fetchInitialTodos()
   
//   }, [todos])
  

//   const handleInputChange = (e) =>{
//     setInputValue(e.target.value)
//   }

//   const handleSubmit = async() =>{
//     if(inputValue==''){
//       return
//     }else{
//       const _id = new mongoose.Types.ObjectId();
//       const newTodo = {
//         _id: _id,
//         text:inputValue,
//         isComplete: true,
//       }
//       await addTodo(newTodo)
//       setTodos([...todos, newTodo])
      
//       setInputValue('')
//     }
    
//   }

//   const handleDelete = async (_id) =>{
//     try{
//       console.log('Deleting todo with id:', _id); 
//       await deleteTodo(_id)
//       // console.log('Deleting todo with id after:', id); 
//       setFetchedTodos(fetchedTodos.filter(todo => todo._id!== _id));
//       // console.log('Deleting todo with id after2:', id); 

//     }catch(e){
//       console.log('Failed to delete from app.js',e)
//     }
//   }


//   return (
//     <>
//     <div className="container">
//     <h1>Add Todo Item</h1>
//      <input type="text" name="text" placeholder='todo' value={inputValue} onChange={handleInputChange} />
//      <button type="submit" disabled={inputValue==''} onClick={handleSubmit}>Add</button>
//     </div>
//     {/* <h4>Your Todo List</h4>
//     <ul>
//       {todos.map(todo =>(
//         <li key={todo.id}>{todo.text}</li>
//       ))}
//     </ul> */}
//     <h4>Your Todo List</h4>
//     <ul>
//       {fetchedTodos.map(todo =>(
//         <div key={todo._id}><li>{todo.text}
//         <button onClick={()=>handleDelete(todo._id)}>delete</button>
//         {/* <button onClick={()=>handleUpdate(todo._id)}>Edit</button> */}
//         </li></div>
//       ))}
//     </ul>
    
//     </>
//   )
// }

// export default App

// import { useState, useEffect } from 'react';
// import { addTodo, fetchTodo, deleteTodo } from './service/api.js';
// import EditTodo from './EditTodo.jsx';
// import mongoose from 'mongoose';
// import './App.css';

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [fetchedTodos, setFetchedTodos] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingTodo, setEditingTodo] = useState(null);

//   useEffect(() => {
//     const fetchInitialTodos = async () => {
//       try {
//         const todosData = await fetchTodo();
//         setFetchedTodos(todosData);
//       } catch (e) {
//         console.log('Error fetching data in app.js:', e);
//       }
//     };
//     fetchInitialTodos();
//   }, [todos]);

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleSubmit = async () => {
//     if (inputValue === '') {
//       return;
//     } else {
//       const _id = new mongoose.Types.ObjectId();
//       const newTodo = {
//         _id: _id,
//         text: inputValue,
//         isComplete: true,
//       };
//       await addTodo(newTodo);
//       setTodos([...todos, newTodo]);
//       setInputValue('');
//     }
//   };

//   const handleDelete = async (_id) => {
//     try {
//       await deleteTodo(_id);
//       setFetchedTodos(fetchedTodos.filter((todo) => todo._id !== _id));
//     } catch (e) {
//       console.log('Failed to delete from app.js:', e);
//     }
//   };

//   const handleEdit = (todo) => {
    
//     setEditingTodo(todo);
//     setIsEditing(true);
//   };

//   return (
//     <>
//       <div className="container">
//         <h1>Add Todo Item</h1>
//         <input
//           type="text"
//           name="text"
//           placeholder="todo"
//           value={inputValue}
//           onChange={handleInputChange}
//         />
//         <button type="submit" disabled={inputValue === ''} onClick={handleSubmit}>
//           Add
//         </button>
//       </div>
//       <h4>Your Todo List</h4>
//       <ul>
//         {fetchedTodos.map((todo) => (
//           <div key={todo._id}>
//             <li>
//               {todo.text}
//               <button onClick={() => handleDelete(todo._id)}>delete</button>
            
//               <button onClick={() => handleEdit(todo)}>Edit</button>
//             </li>
//           </div>
//         ))}
//       </ul>
//       {isEditing && ( 
//         <EditTodo todo={editingTodo} onClose={() => setIsEditing(false)} />
       
//       )}
//     </>
//   );
// }

// export default App;


import { useState, useEffect } from 'react';
import { addTodo, fetchTodo, deleteTodo, updateTodo } from './service/api.js';
import mongoose from 'mongoose';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [fetchedTodos, setFetchedTodos] = useState([]);
  const [editingID, setEditingID] = useState();
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const fetchInitialTodos = async () => {
      try {
        const todosData = await fetchTodo();
        setFetchedTodos(todosData);
      } catch (e) {
        console.error('Error fetching data in app.js:', e);
      }
    };
    fetchInitialTodos();
  }, [todos]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (inputValue === '') {
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
      setInputValue('');
    }
  };

  const handleDelete = async (_id) => {
    try {
      await deleteTodo(_id);
      setFetchedTodos(fetchedTodos.filter(todo => todo._id !== _id));
    } catch (e) {
      console.error('Failed to delete from app.js:', e);
    }
  };

  const handleEditClick = (todo) => {
    setEditingID(todo._id);
    setEditText(todo.text);
  };

  const handleSave = async () => {
    console.log("edit id f=befor if", editingID)
    if (editingID) {
      console.log("edit id ", editingID);
      try {
        console.log("updated text in try" , editText);
        await updateTodo(editingID, { text: editText });
        console.log("updated text" , editText);
        const updatedTodos = fetchedTodos.map(todo => {
          if (todo._id === editingID) {
            console.log("edit id in if", editingID ," todo id", todo._id);
            return { ...todo, text: editText };
          }
          return todo;
        });
        setFetchedTodos(updatedTodos);
        setEditingID();
        setEditText('');
      } catch (e) {
        console.error('Error updating todo:', e);
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
        <button type="submit" disabled={inputValue === ''} onClick={handleSubmit}>
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
                  <input type="text" value={editText} onChange={handleEditChange} />
                  <button onClick={handleSave}>Save</button>
                </>
              ) : (
                <>
                  {todo.text}
                  <button onClick={() => handleDelete(todo._id)}>Delete</button>
                  <button onClick={() => handleEditClick(todo)}>Edit</button>
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
