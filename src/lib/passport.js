const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const con = require('../database.js');
const helpers = require('../lib/helpers.js');

passport.use('local.signin', new localStrategy({
    usernameField: 'username', //pasamos el nombre del input por el que lo va recibir
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done)=>{
    //const { username , password} = req.body;
    const rows = await con.query('SELECT * FROM users WHERE correo = ?', [username]);
    console.log(rows[0]);
    if(rows.length > 0){
        const user = rows[0];
        //const hash = await helpers.encryptPassword(password);
        //console.log(hash);
        const savedPassword = user.password;
        const compare = await helpers.compararPassword(password, savedPassword );
        console.log(compare);

        console.log(user.password);
        if(compare){
            done(null, user, req.flash('success', 'Welcome ' + user.fullname));
        }else{
            done(null, false, req.flash('message','Incorrect Password'));
        }
    }else{
        return done(null, false, req.flash('message','El usuario no existe'));
    }
}));


passport.use('local.signup', new localStrategy({
    usernameField: 'username', //pasamos el nombre del input por el que lo va recibir
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) =>{
    const {fullname} = req.body;
    const newUser = {
        username,
        password,
        fullname
    }

    newUser.password = await helpers.encryptPassword(password);
    const result = await con.query('INSERT INTO users SET ?', [newUser]);

    newUser.id = result.insertId;
    if (result.affectedRows == 1) {
        return  done(null, newUser);
    }
    
}));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    const user = await con.query('SELECT * FROM users WHERE id = ?',[id]);
    return done(null, user[0]);
   
   /*
    User.findById(id, function (err, user) {
      done(err, user);
    });*/
  });