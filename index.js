
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/route';
import Transact from './models/Transaction';
//import Db from './config/connection';

//const trans = new Model();
const trans = Transact.init().findAll('*');



dotenv.config();

// import router from "./routes/route";
const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
// const debug = Debug("http");
app.use('/api/v1', router);

// Set environment Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening to port ${PORT}`);
  // debug(`listening to port ${PORT}`);
});

export default app;
