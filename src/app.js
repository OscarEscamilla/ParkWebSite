const express = require('express');
const path = require('path');
const expresshbs = require('express-handlebars');//manejador de platillas 

const morgan = require('morgan');//muestra peticiones por consola 

const flash = require('connect-flash');
const session = require('express-session');
const mysql_store = require('express-mysql-session');
const passport  = require('passport');


const {database} = require('./keys.js');
const app = express();

require('./lib/passport.js');
//configuraciones


app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expresshbs({
    defaultLayout: 'main.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars.js')
}));

app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')))


//midlewares
//midlewares
app.use(session({
    secret: 'oscarsession',
    resave: false,
    saveUninitialized: false,
    store: new mysql_store(database)
}));
app.use(flash());
app.use(morgan('dev'));//muestra peticiones por conola
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//variables globales


app.use((req,res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    //app.locals.isLoggedIn = req.isLoggedIn;
    next();
});

//routes
app.use(require('./routes/index.js'));
app.use(require('./routes/login.js'));


//starting server
app.listen(app.get('port'), ()=>{
    console.log('server on port '+ app.get('port'));
});

