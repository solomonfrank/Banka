
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import UserController from './controller/userController';
import Auth from './helpers/Auth';


// import router from './routes/route';


dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
// const debug = Debug("http");
// app.use('/api/v1', router);
app.post('/api/signup', UserController.signup);
app.post('/api/signin', UserController.signin);
app.post('/api/create', Auth.verifyToken, UserController.create);


// Set environment Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening to port ${PORT}`);
});

export default app;
