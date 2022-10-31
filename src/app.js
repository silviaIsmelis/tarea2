// Servidor Backend
const express = require('express');
const cors = require('cors');
const app = express();

// Importar conexion a mongoDB
const database=require('./database') 

// settings
app.set('port', process.env.PORT || 4000); 

// middlewares
app.use(cors());
app.use(express.json());

// importacion de routes y modelos
const rutaUser=require('./routes/user')
const rutaNota=require('./routes/notes')

// importar body-parser para convertir la peticion en JSON
const bodyParser= require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:'true'}))

// console.log(rutaUser);
app.use('/api/users',rutaUser)
app.use('/api/notas',rutaNota)

module.exports = app;