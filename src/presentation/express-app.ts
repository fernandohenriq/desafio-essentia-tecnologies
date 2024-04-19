import express, { NextFunction, Request, Response } from 'express';

import { TypeOrmTodoRepository } from '../database/typeorm/repositories/typeorm-todo.repository';
import { TypeormManager } from '../database/typeorm/typeorm-singleton';
import { Todo } from '../domain/entities/todo.entity';

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

  private async initialize() {
    await typeormManager.initialize();

    this.app.options('/', async (req, res) => {
      res.status(200).send('Hello, World!');
    });

    this.app.post('/todos', async (req, res) => {
      const userRepo = new TypeOrmTodoRepository();
      const user = new Todo();
      user.id = '111';
      user.title = 'test@test.com';
      const userSaved = await userRepo.save(user);
      res.status(201).send(userSaved);
    });

    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const error = {
        message: err.message,
        details: err,
      };
      console.error('[ERROR]', error);
      res.status(err?.statusCode ?? 500).send(error);
    });

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
