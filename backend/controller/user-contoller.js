import Todo from "../schema/user-schema.js";

export const addTodo= async(req,res) =>{
    const todo = req.body;
    const newTodo = new Todo(todo);

    try{
       await newTodo.save();
        res.status(201).json(newTodo);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Failed to add todo' });
    }
}

export const getTodos = async(req, res) =>{
    try{
        const todos = await Todo.find();
        res.status(200).json(todos);
    }catch(err){
        console.log("Failed to get data in controller",err)
    }
}

export const deleteTodo = async(req,res)=>{
    const {id} = req.params;
    try{
        const deletedTodo = await Todo.findByIdAndDelete(id);
        res.status(200).send(deletedTodo);
    }catch(err){
        console.log("Failed to delete from controller",err)
    }
}

export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        console.log("updatedTodo before try",id,text);
        const updatedTodo = await Todo.findByIdAndUpdate(id,  text , { new: true });
        console.log("updatedTodo",updatedTodo)
        res.status(200).json(updatedTodo);
    } catch (err) {
        console.log("Failed to update from controller", err);
        res.status(500).json({ error: "Failed to update todo" });
    }
};
