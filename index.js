const express = require("express");
const session=require("express-session");
const passport = require("passport");
require("dotenv").config();
require("./auth")
const path = require("path");
const port = process.env.PORT || 3000;

const app = express();
app.use(session({secret:"cats"}));
app.use(passport.initialize());
app.use(passport.session());

function checkUser(req,res,next){
    req.user?next():res.send("<html><body>Please login with your gmail!</body></html>")
}

app.use('/',express.static(path.join(__dirname, 'templates')))
// app.use('/home',checkUser, express.static(path.join(__dirname, 'hometemplate')))

app.get("/home",checkUser, (req, res) => {
    console.log(req.user);
    res.send(req.user);
})

app.get("/google/auth",
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

app.get("/google/redirect",
    passport.authenticate('google', {
        successRedirect: '/home',
        failureRedirect:'/auth/failure'
    })
)

app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`)
})