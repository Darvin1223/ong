const verifyErros = (error, req, res, next) => {
    res.status(500).send(`Hay un error en el servidor,  ${error}`);
    next();
};

// console.log(verifyErros())
module.exports = verifyErros;

