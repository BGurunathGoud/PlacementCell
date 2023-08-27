const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 7000;
const db = require("./config/mongoose");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static('assets'));
app.set('layout extractStyles', true);
app.set('layout extractScript', true);

// Sessions are used here..
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport");

const MongoStore = require("connect-mongo");

app.use(cookieParser());

// View Engine is Setting up
app.set("view engine", "ejs");
app.set("views", "./views");

// Seesion cookies are stored in Mongo - Store in database
app.use(
  session({
    name: "placement-cell",
    secret: "asewe",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://guru:guru@cluster0.df7mc2p.mongodb.net/?retryWrites=true&w=majority",
      autoRemove: "disabled",
    }),
    function(err) {
      console.log(err || "MongoDB Connect is Successfull");
    },
  })
);



app.use(passport.initialize());
app.use(passport.session());

// It sets the authenticated user in response
app.use(passport.setAuthenticatedUser);

// Express Routes are used
app.use(require("./routes"));

// Body Parser is used here 
app.use(bodyParser.json());

// Port 7000 is been listened below
app.listen(port, (err) => {
  if (err) {
    console.log("Error! Server is unable to start", err);
    return;
  }
  console.log("Server is Succesfully running on Port 7000");
});
