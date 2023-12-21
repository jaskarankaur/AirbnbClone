
const User = require("../models/user");

module.exports.renderSignUpPage = (req, res)=>{
    res.render("users/signup.ejs");
};

module.exports.renderSignInPage = (req, res)=>{
    res.render("users/signin.ejs");
};

module.exports.signIn = async (req, res)=>{
    let {username} = req.body;
    req.flash("success", `Welcome @${username}!`);
    res.redirect(res.locals.redirectUrl?res.locals.redirectUrl:"/listings");  
};

module.exports.signOut = (req, res)=>{
    req.logout((err) => {
        if(err) {
            next(err);
        }
        req.flash("success", "You are successfully logged out!");
        res.redirect("/listings");
    });
};

module.exports.signUp = async (req, res)=>{
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
};