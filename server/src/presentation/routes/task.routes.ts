import { Router } from 'express';

import { TaskControllerFactory } from '../factories/controllers/task.controller.factory';

export const taskRoutes = Router();

const {
  createTaskController,
  showTaskController,
  indexTaskController,
  updateTaskController,
  deleteTaskController,
} = TaskControllerFactory.make();

taskRoutes.post('/todos/:todoId/tasks', createTaskController.handle);

taskRoutes.get('/todos/:todoId/tasks', indexTaskController.handle);

taskRoutes.get('/todos/:todoId/tasks/:taskId', showTaskController.handle);

taskRoutes.patch('/todos/:todoId/tasks/:taskId', updateTaskController.handle);

taskRoutes.delete('/todos/:todoId/tasks/:taskId', deleteTaskController.handle);
