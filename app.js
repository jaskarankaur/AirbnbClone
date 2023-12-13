const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");

const mongoose = require("mongoose");
const port = 3000;
const path = require("path");
const Listing = require("./models/listing.js");
const User = require("./models/user.js");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/reviews.js");
const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");


main()
.then((res)=>{
    console.log("Connected to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnbclone');
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
    secret: "airbnbclonesessionsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        //by default browser deletes cookie as soon as browser is closed for a session with no expiry date
        // we are setting cookie expiry for 7 days from the day website logged in
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    },
};


app.get("/", (req, res)=>{
    res.send("I am root");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next)=>{
    res.locals.msg = req.flash("success");
    res.locals.err = req.flash("error");
    res.locals.currUser = req.user;
    next();
});



app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


app.all("*", (req, res, next)=>{
    next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next)=>{
    let {status=500, message="Something went wrong"} = err;
    res.status(status).render("listings/error.ejs", { err });
});

app.listen(port, ()=>{
    console.log("Server started at port: ", port);
});