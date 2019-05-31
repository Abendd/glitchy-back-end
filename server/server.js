const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '21may1995',
    database : 'Glitchy'
  }
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.post('/register',(req,res)=>{
	const {email,url} = req.body;
	db('users').returning('*').insert({
		email:email,
		url:url
	})
	.then(response=>{
		res.json(response[0])
	})
	.catch(err=>res.status(400).json('unable to register'))
})

app.listen(3000,()=>{
	console.log("app is running")
})