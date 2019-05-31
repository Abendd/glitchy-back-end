const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl:true
  }
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
	res.send("it is working");
})
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

app.listen(process.env.PORT || 3000,()=>{
	console.log("app is running")
})