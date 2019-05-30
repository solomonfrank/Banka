/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-duplicates */


import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import swaggerDocument from './swagger.json';
import UserController from './controller/userController';
import AdminController from './controller/adminController';
import StaffController from './controller/staffController';
import CashierController from './controller/cashierController';
import Auth from './helpers/Auth';


import router from './routes/route';


dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
const options = {
  explorer: true,
};
// const debug = Debug("http");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use('/api/v1', router);
app.post('/api/signup', UserController.signup);
app.post('/api/signin', UserController.signin);
app.post('/api/create', Auth.verifyToken, UserController.create);
app.post('/api/create-admin', Auth.verifyToken, Auth.verifyCashier, AdminController.createAdmin);
app.patch('/api/account/:accountNum', StaffController.activate);
app.get('/api/accounts/:accountNum', Auth.verifyToken, Auth.verifyCashier, StaffController.getAccount);
app.delete('/api/accounts/:accountNum', StaffController.deleteAccount);
app.post('/api/transaction/:accountNum/credit', Auth.verifyToken, Auth.verifyCashier, CashierController.creditAccount);
app.post('/api/transaction/:accountNum/debit', Auth.verifyToken, Auth.verifyCashier, CashierController.debitAccount);
app.get('/', UserController.home);


// Set environment Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening to port ${PORT}`);
});


export default app;
