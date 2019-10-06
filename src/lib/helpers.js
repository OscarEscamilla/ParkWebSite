const helpers = {}
const bcrypt = require('bcryptjs');

helpers.encryptPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}


helpers.compararPassword = async (password, savedPassword) =>{
    
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.log(error);
    }
}


helpers.isLoggedIn = (req, res , next) =>{
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/signin');
}

helpers.isNotLoggedIn = (req, res, next) =>{
    if (req.isAuthenticated()) {
        return res.redirect('/links');
    }

    return next();
}
module.exports = helpers;