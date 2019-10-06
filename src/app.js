const express = require('express');
const path = require('path');
const expresshbs = require('express-handlebars');//manejador de platillas 

const morgan = require('morgan');//muestra peticiones por consola 



const app = express();

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
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//variables globales

//routes
app.use(require('./routes/index.js'));


//starting server
app.listen(app.get('port'), ()=>{
    console.log('server on port '+ app.get('port'));
});

