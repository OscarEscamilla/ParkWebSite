
var controller = {}
const model = require('../model/indexModel.js');


controller.index = (req,res) =>{
    res.render('index.hbs');
}



module.exports =  controller;


