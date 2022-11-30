import mongoose from "mongoose";
import express from 'express';
import cors from 'cors';
import HelloController from "./controllers/hello-controller.js";
import UserController from "./controllers/users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4
}

/*mongoose.connect('mongodb://localhost:27017/tuiter')*/
/*const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/tuiter'
mongoose.connect(CONNECTION_STRING);*/

mongoose.connect( 'mongodb://localhost:27017/tuiter'
  || 'mongodb+srv://szjqm31:Myjsy@cluster0.s4bkpye.mongodb.net/?retryWrites=true&w=majority', options)
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());

TuitsController(app);
HelloController(app);
UserController(app);

app.listen(process.env.PORT || 4000);