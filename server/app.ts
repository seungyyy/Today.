import express from 'express';
import  dotenv from 'dotenv'
import { userRouter } from './routers/user';
import mongoose from 'mongoose';
import router from './routers';

const app = express();

dotenv.config({ path: 'variables.env' });
const port = process.env.PORT || 5000;

const URI: string = (process.env.MONGODB_URI as string)

try {
  mongoose.connect(URI)
  console.log('Connected DB');
} catch(err) {
  console.log(err)
}

app.listen(port, ()=> {
  console.log(port, 'server is open')
})

app.use(express.json())

app.use(router);

