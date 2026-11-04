if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
// console.log(process.env.SECREAT)

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path"); // views folder (for routes index,show ...)
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); // error.ejs
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // for storing data
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wastemanagement";
const dbUrl = process.env.ATLASDB_URL || process.env.DB_URL;
const port = process.env.PORT || 8081;

if (!dbUrl) {
  throw new Error(
    "Missing MongoDB connection string. Set ATLASDB_URL or DB_URL in .env.",
  );
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // for req.params
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  // res.send("let's start the project");
  res.redirect("/listings");
});

async function startServer() {
  let sessionStore = null;

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err.message);
  });

  try {
    await mongoose.connect(dbUrl);
    sessionStore = MongoStore.create({
      client: mongoose.connection.getClient(),
      crypto: {
        secret: process.env.SECRET,
      },
      touchAfter: 24 * 3600,
    });
    sessionStore.on("error", (err) => {
      console.log("ERROR IN MONGO SESSION STORE", err);
    });
    console.log("connected to DB");
  } catch (err) {
    console.log("MongoDB connection failed; starting with in-memory sessions.");
    console.log(err);
    sessionStore = new session.MemoryStore();
  }

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(express.urlencoded({ extended: true })); // for req.params
  app.use(methodOverride("_method"));
  app.engine("ejs", ejsMate);
  app.use(express.static(path.join(__dirname, "/public")));

  app.use(
    session({
      store: sessionStore,
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      },
    }),
  );
  app.use(flash());

  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));

  // use static serialize and deserialize of model for passport session support
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
  });

  app.get("/demouser", async (req, res) => {
    let fakeUser = new User({
      email: "student@gmail.com",
      username: "sigma-student",
    });
    let registerUser = await User.register(fakeUser, "helloworld");
    res.send(registerUser);
  });

  app.use("/listings", listingRouter);
  app.use("/listings/:id/reviews", reviewRouter);
  app.use("/", userRouter);

  // server side errors

  app.all("/*path", (req, res, next) => {
    next(new ExpressError(404, "page not found"));
  });

  app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
    // res.status(statusCode).send(message);
  });

  app.listen(port, () => {
    console.log(`server working on port ${port}`);
  });
}

startServer();
