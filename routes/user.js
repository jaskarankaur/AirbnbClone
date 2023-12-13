
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { redirectUrlMiddleware } = require("../middleware.js");

router.get("/signup", (req, res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup", async (req, res)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        await User.register(newUser, password);
        req.login(newUser, (err) =>{
            if(err)
                next(err);
            req.flash("success", `Welcome @${username}!`);
            res.redirect("/listings");
        });       
    }catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }  
});

router.get("/signin", (req, res)=>{
    res.render("users/signin.ejs");
});

router.post("/signin", redirectUrlMiddleware, 
    passport.authenticate("local", {failureRedirect: "/signin", failureFlash: true}),
    async (req, res)=>{
    let {username} = req.body;
    req.flash("success", `Welcome @${username}!`);
    res.redirect(res.locals.redirectUrl?res.locals.redirectUrl:"/listings");  
});

router.get("/signout", (req, res)=>{
    req.logout((err) => {
        if(err) {
            next(err);
        }
        req.flash("success", "You are successfully logged out!");
        res.redirect("/listings");
    });
});

module.exports = router;