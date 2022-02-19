import mongoose from 'mongoose';
import { MONGO_HOST } from './config';

mongoose.Promise = require('bluebird');

const config: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGO_HOST, config, err => {
  if (!err) console.log('\x1b[36m%s\x1b[0m', `MongoDB connection successfully`);
  else console.log('\x1b[31m%s\x1b[0m',`MongoDB connection failed : ${err}`);
});

export default mongoose;
