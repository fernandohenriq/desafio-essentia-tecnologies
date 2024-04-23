import { Router } from 'express';

import { TodoControllerFactory } from '../factories/controllers/todo.controller.factory';

export const todoRoutes = Router();

const {
  createTodoController,
  showTodoController,
  indexTodoController,
  updateTodoController,
  deleteTodoController,
} = TodoControllerFactory.make();

todoRoutes.post('/todos', createTodoController.handle);

todoRoutes.get('/todos', indexTodoController.handle);

todoRoutes.get('/todos/:todoId', showTodoController.handle);

todoRoutes.patch('/todos/:todoId', updateTodoController.handle);

todoRoutes.delete('/todos/:todoId', deleteTodoController.handle);
