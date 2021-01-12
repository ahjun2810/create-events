const express = require('express');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser');
var methodOvereide = require('method-override');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(methodOvereide());

const allowedOrigins = [
	'capacitor://localhost',
	'ionic://localhost',
	'http://localhost',
	'http://localhost:8080',
	'http://localhost:8100'
];
	
const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.includes(origin) || !origin) {
			callback(null, true);
		} 
		else {
			callback(new Error('Origin not allowed by CORS'));
		}
	}
}
	
app.options('*', cors(corsOptions));

const db = mysql.createPool({
    connectionLimit: 100,
    host: '148.72.232.174',
    user: 'Team4',
    password: 'password@01',
    database: 'Team4'
});

db.getConnection((err1) => {
	console.log('Connecting mySQL....')
	if (err1) {
		throw err1;
	}
	console.log('Mysql connected....')
	db.query('SELECT * FROM Team4.Events;', function (err2, result, field) {
	if (!err2) {
		console.log(result);
	}
	else {
		console.log(err2)
	}
	});
});

// Basic things to include
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
	console.log("listening to Port", app.get("port"));
});

