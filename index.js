/* eslint-disable consistent-return */
import express from "express";
import Joi from "joi";
import session from "express-session";
import bodyParser from "body-parser";
import User from "./user";
import Admin from "./admin";
import Account from "./account";
import Superadmin from "./superadmin";
import Cashier from "./cashier";

const app = express();
// eslint-disable-next-line no-use-before-define
app.use(bodyParser.json());
// eslint-disable-next-line no-use-before-define
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// sign up route
app.post("/api/v1/sign-up", (req, res) => {
  const schema = {
    firstName: Joi.string()
      .trim()

      .min(3)
      .max(20)
      .required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    lastName: Joi.string()

      .trim()
      .min(3)
      .max(20)
      .required(),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .options({
        language: {
          any: {
            allowOnly: "!!Password do not match"
          }
        }
      })
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).json({ msg: result.error.details[0].message });
    return;
  }
  const { email } = req.body;
  const { password } = req.body;
  const { firstName } = req.body;
  const { lastName } = req.body;

  // let user =    new User(firstName,lastName,password,email);
  const person = new User(firstName, lastName, password, email);

  const userDetail = person.save();
  // user.save();

  if (!userDetail)
    return res
      .status(400)
      .json({ status: 400, msg: "error in the values your submitted" });
  res.status(200).json({ status: 200, data: userDetail });
  // console.log(session.users);
});

// sign in route

app.post("/api/v1/sign-in", (req, res) => {
  const schema = {
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .trim(),

    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .trim()
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).json({ msg: result.error.details[0].message });
    return;
  }
  const { email } = req.body;
  const { password } = req.body;

  const user = User.login(email, password);
  if (!user)
    return res.status(400).json({ status: 400, msg: "invalid credential" });

  res.status(200).json({ status: 200, data: user });
});

app.post("/api/v1/create-account", (req, res) => {
  if (session.loggedIn) {
    const schema = {
      firstName: Joi.string()
        .trim()

        .min(3)
        .max(20)
        .required(),
      email: Joi.string().email({ minDomainAtoms: 2 }),
      type: Joi.string().trim(),
      openingBalance: Joi.number(),
      lastName: Joi.string()

        .trim()
        .min(3)
        .max(20)
        .required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      res.status(400).json({ msg: result.error.details[0].message });
      return;
    }
    const { email } = req.body;
    const { firstName } = req.body;
    const { lastName } = req.body;
    const { openingBalance } = req.body;
    const { type } = req.body;

    const person = new Account(
      firstName,
      lastName,
      email,
      type,
      openingBalance
    );
    const user = person.save();
    res.status(200).json({ status: 200, data: user });
  } else {
    res
      .status(400)
      .json({ status: 400, msg: "you must login to create an account" });
  }
  // console.log(session.account);
});

// logout route
app.get("/api/v1/logout", (req, res) => {
  // User.logout();

  session.userId = "";

  session.staffId = "";

  session.cashierId = "";

  res.json({ msg: "you have successfully sign out" });
});

// delete user route

app.delete("/api/v1/accounts/:accountNumber", (req, res) => {
  if (session.staffId) {
    // eslint-disable-next-line radix
    // eslint-disable-next-line prettier/prettier
    const acc = parseInt(req.params.accountNumber, 10);

    const admin = new Admin();
    const foundvalue = admin.deleteAcc(acc, session.account);

    if (!foundvalue) {
      return res.status(404).json({ status: 404, msg: "account not found" });
    }

    res.status(200).json({ status: 200, msg: "account deleted successfully" });
  } else {
    res.status(401).json({ status: 401, msg: "you must login to continue" });
  }
});

// fetch user
app.get("/api/v1/accounts/:accountNumber", (req, res) => {
  if (session.staffId !== "" || session.cashierId !== "") {
    const acc = parseInt(req.params.accountNumber, 10);
    const admin = new Admin();
    const account = admin.findOne(acc, session.account);
    if (!account)
      return res.status(404).json({ status: 404, msg: "account not found" });
    res.status(200).json({ status: 200, data: account });
  } else {
    // User.login(email,password);
    res.status(401).json({ status: 401, msg: "you must login to continue" });
  }
});
// patch user
app.patch("/api/v1/accounts/:accountNumber", (req, res) => {
  const acc = parseInt(req.params.accountNumber, 10);
  if (session.staffId) {
    const admin = new Admin();
    const arr = admin.activateAcc(acc, session.account);
    if (!arr)
      return res.status(404).json({ status: 404, msg: "account not found" });

    res.status(200).json({ status: 200, data: arr });
  } else {
    // User.login(email,password);
    return res
      .status(401)
      .json({ status: 401, msg: "you must login to continue" });
  }
});

app.post("/api/v1/add-admin", (req, res) => {
  const schema = {
    firstName: Joi.string()
      .trim()

      .min(3)
      .max(20)
      .required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    lastName: Joi.string()

      .trim()
      .min(3)
      .max(20)
      .required(),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    type: Joi.string()

      .trim()
      .min(3)
      .max(20)
      .required(),
    isAdmin: Joi.boolean().required(),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .options({
        language: {
          any: {
            allowOnly: "!!Passwords do not match"
          }
        }
      })
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).json({ msg: result.error.details[0].message });
    return;
  }
  const { firstName } = req.body;
  const { email } = req.body;
  const { lastName } = req.body;
  let { type } = req.body;
  const { password } = req.body;
  let { isAdmin } = req.body;

  // let admin = new Superadmin();

  const lastInserted = Superadmin.addStaff(
    firstName,
    lastName,
    password,
    email,
    // eslint-disable-next-line no-self-assign
    (type = type),
    // eslint-disable-next-line no-self-assign
    (isAdmin = isAdmin)
  );
  if (!lastInserted) {
    res.status(400).json({ msg: "user could not added" });
  }

  res.status(200).json({ status: 200, data: lastInserted });
  // console.log(session.users);
});

// credit account
app.post("/api/v1/transaction/:accountNumber/credit", (req, res) => {
  if (session.cashierId || session.staffId) {
    const accNum = parseInt(req.params.accountNumber, 10);
    const { amount } = req.body;

    const cashier = new Cashier();
    const credited = cashier.credit(
      accNum,
      session.account,
      session.cashierId,
      amount
    );
    // eslint-disable-next-line no-console
    console.log(credited);
    if (!credited)
      return res.status(404).json({ status: 404, msg: "account not found" });
    res.status(200).json({ status: 200, data: credited });
  } else {
    return res
      .status(403)
      .json({ status: 403, msg: "you must login to accessible the page" });
  }
});

// debit account
app.post("/api/v1/transaction/:accountNumber/debit", (req, res) => {
  if (session.cashierId || session.staffId) {
    const accNum = parseInt(req.params.accountNumber, 10);
    const { amount } = req.body;

    const cashier = new Cashier();
    const credited = cashier.debit(
      accNum,
      session.account,
      session.cashierId,
      amount
    );
    // eslint-disable-next-line no-console
    console.log(credited);
    if (!credited)
      return res.status(404).json({ status: 404, msg: "account not found" });
    res.status(200).json({ status: 200, data: credited });
  } else {
    return res
      .status(403)
      .json({ status: 403, msg: "you must login to accessible the page" });
  }
});

// fetch all account

app.get("/api/v1/accounts", (req, res) => {
  if (session.staffId) {
    const admin = new Admin();
    const result = admin.findAll();
    if (!result)
      return res.status(404).json({ status: 404, msg: "result not found" });

    res.status(200).json({ status: 200, data: result });
  } else {
    return res.status(400).json({ status: 400, msg: "you must login" });
  }
});

// Set environment Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening to port ${PORT}`);
});

// module.exports = app;
export default app;
