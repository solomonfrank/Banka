/* eslint-disable consistent-return */
import express from "express";
import router from "./routes/route.js";

// import router from "./routes/route";
import bodyParser from "body-parser";
const app = express();
// eslint-disable-next-line no-use-before-define
app.use(bodyParser.json());
// eslint-disable-next-line no-use-before-define
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/api/v1", router);

// Set environment Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening to port ${PORT}`);
});

// module.exports = app;
export default app;
