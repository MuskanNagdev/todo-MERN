import express from 'express';
import { addTodo, deleteTodo, getTodos, updateTodo } from '../controller/user-contoller.js';
const router = express.Router();

router.post('/add',addTodo);
router.get('/getTodo',getTodos);
router.delete('/deleteTodo/:id',deleteTodo);
router.put('/updateTodo/:id',updateTodo);

export default router;