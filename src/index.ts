import 'dotenv/config';

import { ExpressApp } from './presentation/express-app';

const server = new ExpressApp();
server.start(3001);
