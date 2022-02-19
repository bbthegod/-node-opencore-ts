import express from 'express';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import bearerToken from 'express-bearer-token';
import methodOverride from 'method-override';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import routes from '../route';
import { notFound, handler, converter } from '../middleware/error';

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(methodOverride());
app.use(bearerToken());
app.use(helmet());
app.use(cors());
app.use(morgan(':method :url :status :response-time ms'));
app.use('/api', routes);
app.use(converter);
app.use(notFound);
app.use(handler);

export default app;
