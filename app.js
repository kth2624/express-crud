const { response } = require('express');
const express = require('express')
const app = express()
const port = 3000

const mysql = require('mysql');

const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'express_db'
});

con.connect(function(err){
	if (err) throw err;
	console.log('Connected');
	const sql = "select * from users"
	con.query(sql, function (err, result, fields) {
		if (err)
			throw err;
		console.log(result);
	});
});
app.get('/', (req, res) => {
	const sql = "select * from users"
	con.query(sql, function(err, result, fields) {
		if (err) throw err;
		res.send(result);
	})
})

app.listen(port, () => console.log(`Example app listening on port ${port} !`))