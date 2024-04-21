import express, { NextFunction, Request, Response } from 'express';

import { TypeormManager } from '../database/typeorm/typeorm-singleton';
import { AppError } from '../utils/app-error';
import { taskRoutes } from './routes/task.routes';
import { todoRoutes } from './routes/todo.routes';

const typeormManager = new TypeormManager();

export class ExpressApp {
  private app = express();

  constructor() {
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });
  }

  get server() {
    return this.app;
  }

  async initialize() {
    // Initialize database
    await typeormManager.initialize();

    // Seed database
    typeormManager.seed({});

    // Add routes
    this.app.options('/', async (req, res) => {
      res.status(200).send('Hello, World!');
    });

    this.app.use(todoRoutes);
    this.app.use(taskRoutes);

    // Error handling
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        return res.status(err?.statusCode ?? 500).send({
          message: err.message,
          details: err?.details,
        });
      }
      const error = {
        message: err.message,
        details: err,
      };
      return res.status(500).send(error);
    });

    // Route not found
    this.app.use(async (req, res) => {
      res.status(404).send('Route not found');
    });
  }

  async start(port: number, callback?: Function): Promise<void> {
    await this.initialize();
    this.app.listen(port);
    if (callback) return callback();
    console.info(`Server running on http://localhost:${port}`);
  }

  async close() {
    await typeormManager.close();
  }
}
