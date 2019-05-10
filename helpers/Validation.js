/* eslint-disable class-methods-use-this */

import Joi from 'joi';
import bcrypt from 'bcrypt';

class Validation {
  sanitizeEmail() {
    return (Joi.string().email({ minDomainAtoms: 2 }).required());
  }


  sanitizePassword() {
    return (Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/));
  }

  sanitizePhone() {
    return Joi.number();
  }

  sanitizeConfirmPassword() {
    return (Joi.string().required().valid(Joi.ref('password')).options({
      language: {
        any: {
          allowOnly: '!!Password do not match',
        },
      },
    })
    );
  }

  sanitizeName() {
    return (Joi.string().trim().min(3).max(20)
      .required());
  }


  validateRegister() {
    this.schema = {
      firstName: this.sanitizeName(),
      lastName: this.sanitizeName(),
      email: this.sanitizeEmail(),
      password: this.sanitizePassword(),
      confirmPassword: this.sanitizeConfirmPassword(),
      gender: this.sanitizeName(),
    };


    return this.schema;
  }

  validateSignin() {
    this.schema = {
      email: this.sanitizeEmail(),
      password: this.sanitizePassword(),
    };
    return this.schema;
  }

  validateCreateAccount() {
    this.schema = {
      phone: this.sanitizePhone(),
      address: this.sanitizeName(),
      type: this.sanitizeName(),
      balance: Joi.number(),


    };
    return this.schema;
  }

  static init() {
    return new Validation();
  }

  async hashPassword(password) {
    this.saltRounds = 10;
    this.plainPassword = password;
    return bcrypt.hash(this.plainPassword, this.saltRounds);
  }

  async verifyPassword(password, hash) {
    this.hash = hash;
    this.plainPassword = password;
    return bcrypt.compare(this.plainPassword, this.hash);
  }
}
export default Validation;
