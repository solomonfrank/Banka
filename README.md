# Banka


[![Coverage Status](https://coveralls.io/repos/github/solomonfrank/UIs/badge.svg?branch=master)](https://coveralls.io/github/solomonfrank/UIs?branch=master)
[![Build Status](https://travis-ci.org/solomonfrank/Banka.svg?branch=develop)](https://travis-ci.org/solomonfrank/Banka)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4f64cf77f364e5a76df5/test_coverage)](https://codeclimate.com/github/solomonfrank/UIs/test_coverage)


# Banka
Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money.


[Project Planned with PIVOTAL TRACKER](https://www.pivotaltracker.com/n/projects/2322743)

<br/><b>UI pages:</b>

[For user template](https://solomonfrank.github.io/Banka/)


<b>API Url:</b>

[Hosted API on Heroku](https://banka-api-app.herokuapp.com/)<br/>
[API documentation](https://banka-api-app.herokuapp.com/api-docs/)



## Installation

1.  Clone the repository by running the code below:
```shell
git clone https://github.com/solomonfrank/Banka
```
2.  cd into the repository:
```shell
cd propertypro-lite
```
3.  Open the repository in terminal and Install dependencies by running:
```shell
npm install
```
4.  Create a .env file in the root directory and setup your token SECRET
5.  Run "npm start" to start the app or "npm run dev" for nodemon, to watch
```shell
npm run dev
```
6.  Use Postman to test all endpoints
7.  Run "npm test" to test all endpoints  for development
```shell
npm test
```

## Technologies

ES6

NodeJS: An open-source, cross-platform JavaScript run-time environment which allows you enjoy the features of Javascript off the web browsers and implement server-side web development. Visit [here](https://nodejs.org/en/) for details.

ExpressJS: This is the web application framework for Node.js Visit [here](https://expressjs.com) for details.



[Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) for testing

[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for token generation

**Note: Project is still under development**
