/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Testing for credit-account endpoint', () => {
  it('sign in user when all fields are provided', (done) => {
    const data = {
      email: 'solomon@yahoo.com',

      password: '123456',
    };
    chai
      .request(app)
      .post('/api/v1/sign-in')
      .send(data)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('first');
        res.body.data.should.have.property('last');
        res.body.data.should.have.property('isAdmin');
        res.body.data.should.have.property('isLoggedIn');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('password');
        res.body.should.have.property('status');
        done();
      });
  });

  it('get the user account details when account is provided ', (done) => {
    const accountNumber = 5555555;
    chai
      .request(app)
      .get(`/api/v1/accounts/${accountNumber}`)

      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.should.have.property('status');
        res.body.data.should.have.property('first');
        res.body.data.should.have.property('last');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('accNumber');
        res.body.data.should.have.property('status');
        done();
      });
  });

  it('get the user account details when account is provided  and credit it', (done) => {
    const accountNumber = 5555555;
    const data = {
      amount: 2000,
    };
    chai
      .request(app)
      .post(`/api/v1/transaction/${accountNumber}/credit`)
      .send(data)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.should.have.property('status');
        res.body.data.should.have.property('first');
        res.body.data.should.have.property('last');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('accNumber');
        res.body.data.should.have.property('status');
        done();
      });
  });
});
