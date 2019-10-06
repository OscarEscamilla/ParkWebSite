const con = require('../database.js');

model = {}


model.get_all = () => {
  
    return  con.query('SELECT * FROM persons');
}


module.exports = model;