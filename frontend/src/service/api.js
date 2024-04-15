import axios from 'axios';

const URL = 'http://localhost:3000'; // Assuming your backend server is running on port 5000

export const addTodo = async (todoData) => {
  try {
    const response = await axios.post(`${URL}/add`, todoData);
    return response.data; // Return the data received from the backend
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const fetchTodo = async()=>{
    try{
        const response = await axios.get(`${URL}/getTodo`);
        return response.data;
    }catch(e){
        console.log('Error getting data from database:', e);
    }
}

export const deleteTodo = async(id)=>{
    try{
        const response = await axios.delete(`${URL}/deleteTodo/${id}`)
        console.log("response from api",response.data);
        return response.data;
    }catch(e){
        console.log('Error deleting by api.js', e);
    }
}

export const updateTodo = async(id, text)=>{
  console.log('Updating', id, text);
  try{
      const response = await axios.put(`${URL}/updateTodo/${id}`, {text})
      return response.data;
  }catch(e){
      console.log('Error updating by api.js', e);
      throw e;
  }
}