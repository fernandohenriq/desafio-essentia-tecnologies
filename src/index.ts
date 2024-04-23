import 'dotenv/config';

import { ExpressApp } from './presentation/express-app';

const PORT = process.env.PORT || 3001;

const server = new ExpressApp();
server.start(Number(PORT));
