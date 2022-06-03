// Calling modules.
const express = require('express');
const dotenv = require('dotenv');
const secreto = require('./middleware/sessions.middleware');
const path = require('path');
const session = require("express-session");
const cors = require('cors');
const express_ejs_layouts = require('express-ejs-layouts');

const ip = require('ip');


const server = express();

// Setting the dotenv.
dotenv.config({
    path: `${__dirname}/env/ ${process.env.NODE_ENV}.env`
});

const conexion = require('./db/database');
// calling routes.
const {AdminRoutes,indexRoute} = require('./routes');

// console.log(process.env)


// Calling the middleware
// const verifyErrors = require('./middleware/erros.middleware');

// Setting the port and Host
server.set('port', process.env.PORT || 3000);
server.set('host', process.env.HOST || '127.0.0.1');
const PORT = server.get('port');
const HOST = server.get('host');
const address = ip.address();
// const address = '192.168.0.1';


// Settings JSON.
server.use(express.urlencoded({
    extended: false
}));
server.use(express.json());

// Setting the view and view engine.
server.set('view engine','ejs');
server.set('views', path.join(__dirname, 'views'));

// Setting layouts.
server.use(express_ejs_layouts);
server.set('layout','layouts/layout');


// Using Sessiones
server.use(
    session({
        secret:secreto,
        resave: true,
        saveUninitialized: true
    })
);

// Using routes
server.use(AdminRoutes,indexRoute);


// Using the middleware
server.use(express.static(path.join(__dirname, "public")));
server.use(cors());

server.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(`Hay un error en el servidor, ${err}`);
  });


// console.log(prueba)
// Listing the server.
server.listen(PORT, ()=>{
    console.log(`this hosting is running on http://${HOST}:${PORT} || Network http://${address}:${PORT}`);
});

