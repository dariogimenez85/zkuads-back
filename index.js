const cookieSession = require("cookie-session");
const db = require('./src/utils/db-conn');
const passport = require("passport");
const express = require("express");
const cors = require("cors");
const app = express();

//.env
require('dotenv').config();

const passportSetup = require("./src/utils/passport");
const authRoute = require("./src/routes/auth");
const integrationRoute = require("./src/routes/integration");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//body parser
const bParser = require('body-parser');
app.use(bParser.json());
app.use(bParser.urlencoded({ extended: 'true' }));

app.use(
  cookieSession({ name: "session", keys: ["zkuads"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/auth/', authRoute);
app.use('/integration/', integrationRoute);

//launch server
app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is running at port:5000");
});
