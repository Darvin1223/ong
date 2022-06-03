

const verifyLoggedIn = (req, res, next) => {
    const { loggedin, name } = req.session;
 

 
    // console.log(rol)
    // console.log(req.session.name);
    // console.log(name.toLowerCase());
    if (loggedin === true && (name === 'Administrador' || name === "administrador" || name === "ADMINISTRADOR") || (name === 'Moderador' || name === "moderador" || name === "Moderador") ) {
        next();
    }else{
        res.redirect('/login');
    }

};


module.exports = verifyLoggedIn;