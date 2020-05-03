const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const app = express();
app.use(bodyParser.json()); 
app.use(cors());

const database = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Afsal@736',
    database : 'smart-brain'
  }
});


app.get('/',(req,res) =>{
	res.send(DB.users);
})

app.post('/signin',(req,res) => { signin.handleSignin(req, res, database, bcrypt) } )


app.post('/register', (req, res) =>{ register.handleRegister(req, res, database, bcrypt) } ) 


app.get('/profile/:id', (req,res) => { profile.handleProfile(req, res, database) } )

app.put('/image', (req, res) => { image.handleImage(req, res, database) })

app.listen(3000,() =>{
	console.log('app is running');
})