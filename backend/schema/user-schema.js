import mongoose from 'mongoose';
const { Schema } = mongoose;

const TodoSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  text: String,
  isComplete: Boolean, 
  
});

const todo = mongoose.model('Todo', TodoSchema);
export default todo