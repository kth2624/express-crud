const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()
const port = 3000

const mysql = require('mysql');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));//미들웨어로 설정

const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'express_db'
});

// const sql = "INSERT INTO users(name,email) VALUES('tkim2','tkim@tkim.com')"

// con.query(sql, function(err,result, fields){
// 	if(err) throw err;
// 	console.log(result);
// })


app.get('/', (req, res) => {
	const sql = "select * from users";
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		res.render('index', {users : result});
	});
});

app.post('/', (req, res) => {
	const sql = "INSERT INTO users SET ?"
	con.query(sql, req.body, function(err, result, fields){
		if (err) throw err;
		console.log(result);
		res.redirect('/');
	});
});
app.get('/create', (req, res) =>
	res.sendFile(path.join(__dirname, 'index.html')))

app.get('/edit/:id', (req, res) => {
	const sql ="SELECT * FROM users WHERE id = ?";
	con.query(sql, [req.params.id], function (err, result, fields) {
		if (err) throw err;
		res.render('edit', {user : result});
		console.log(result);
	});
});

app.post('/update/:id', (req, res) => {
	const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
	con.query(sql, req.body, function (err, result, fields) {
		if (err) throw err;
		console.log(result);
		res.redirect('/');
	});
});

app.get('/delete/:id', (req, res) => {
	const sql = "DELETE FROM users WHERE id = ?";
	con.query(sql, [req.params.id], function(err, result, fields) {
		if (err) throw err;
		console.log(result);
		res.redirect('/');
	});
});
	// app.get('/', (req, res) => {
		// 	const sql = "select * from users"
		// 	con.query(sql, function(err, result, fields) {
			// 		if (err) throw err;
			// 		res.send(result);
			// 	})
// })

app.listen(port, () => console.log(`Example app listening on port ${port} !`))