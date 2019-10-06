const {Router} = require('express');
const router = Router();
const passport = require('passport');

const helpers = require('../lib/helpers.js');

router.get('/signin',helpers.isNotLoggedIn,(req, res) =>{
    res.render('login/login.hbs');
});

router.post('/signin',helpers.isNotLoggedIn,(req, res, next) =>{
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);

});

router.get('/signup',helpers.isNotLoggedIn,(req, res) =>{
    res.render('login/signup.hbs');
});


router.post('/signup', helpers.isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect:  '/signup',
    failureFlash: true
}));





router.get('/profile',helpers.isLoggedIn,(req, res) =>{
    
    res.render('profile.hbs');
});


router.get('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/signin');
});




module.exports = router;