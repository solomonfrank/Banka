/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line prettier/prettier
import session from "express-session";
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line prettier/prettier
// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
// eslint-disable-next-line prettier/prettier
// import jwt from "jsonwebtoken";

let counter = 1;
// eslint-disable-next-line prettier/prettier
const secret = "banka";
session.users = [
  {
    id: 1,

    email: "solomon@yahoo.com",
    first: "solomon",
    last: "rock",
    password: "123456",
    type: "staff",
    isAdmin: true,
    token: "y88y8y8y8yyyyy"
  }
];
const usersData = session.users;

class User {
  // generic user class

  constructor(
    firstName,
    lastName,
    password,
    email,
    type = "client",
    isAdmin = false
  ) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
    this._type = type;
    this._isAdmin = isAdmin;
    this._loggedIn = false;

    // eslint-disable-next-line no-underscore-dangle
    this._id = counter; // user id to keep track of users

    counter += 1;
  }

  getPassword() {
    return this._password;
  }

  setPassword(password) {
    this._password = password;
  }

  getFirstName() {
    return this._firstName;
  }

  setFirstName(firstName) {
    this._firstName = firstName;
  }

  getLastName() {
    return this._lastName;
  }

  setLastName(lastName) {
    this._lastName = lastName;
  }

  getEmail() {
    return this._email;
  }

  setEmail(email) {
    this.email = email;
  }

  getType() {
    return this._type;
  }

  setType() {
    this._type = true;
  }

  getIsAdmin() {
    return this._isAdmin;
  }

  setIsAdmin() {
    this.isAdmin = true;
  }

  getId() {
    return this._id;
  }

  static getLoggedIn() {
    return this._loggedIn;
  }

  save() {
    const first = this.getFirstName();
    const last = this.getLastName();
    const email = this.getEmail();
    const password = this.getPassword();
    const type = this.getType();
    const isAdmin = this.getIsAdmin();
    const id = this.getId();

    const token = jwt.sign(
      {
        id,
        first,
        email
      },
      secret
    );

    const users = {
      id,
      email,
      first,
      last,
      password,
      type,
      isAdmin,
      token
    };

    if (!session.users) {
      session.users = [];
    }
    let lastInsert;
    if (session.users.push(users)) {
      lastInsert = {
        id: this._id,
        token,
        email,
        first,
        last,
        type
      };
      return lastInsert;
      // eslint-disable-next-line no-else-return
    } else {
      lastInsert = false;
      return lastInsert;
    }
  }

  static login(email, password) {
    const found = usersData.find(
      user => user.email === email && user.password === password
    );

    if (!found) return false;

    // this._loggedIn = true;
    found.isLoggedIn = true;
    session.loggedIn = true;
    if (found.type === "staff") {
      session.staffId = found.id;
    } else if (found.type === "cashier") {
      session.cashierId = found.id;
    } else {
      session.userId = found.id;
    }

    return found;
  }
}

// console.log(usersData);

// module.exports = User;
export default User;
