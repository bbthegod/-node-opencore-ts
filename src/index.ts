import http from 'http';
import app from './config/express';
import './config/mongoose';
import { PORT, ENVIRONMENT } from './config/config';

const server = http.createServer(app);

if (!module.parent) {
  server.listen(PORT, () => {
    console.log('\x1b[33m%s\x1b[0m', `Server started on port ${PORT} (${ENVIRONMENT} mode)`);
  });
}

export default app;
