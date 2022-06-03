const mysql2 = require('mysql2');

const conexion = mysql2.createConnection({
    // host: 'localhost',
    // database: 'ong',
    // user: 'root',
    // password: ''
    host: 'localhost',
    database: 'ong',
    user: 'fundacio_admin',
    password: 'WAu+7K[9wPo;'
});
// const conexion = mysql2.createConnection({
//     host: process.env.HOST,
//     database: process.env.DATABASE,
//     user: process.env.USER,
//     password: process.env.PASSWORD
// });
// console.log(conexion);
conexion.connect((error) => {
	if (error) {
		console.log(error);
	}
});
module.exports = conexion;