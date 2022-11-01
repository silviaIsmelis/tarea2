const express = require("express");
const router = express.Router();
const axios = require("axios");

const mongoose = require("mongoose");
const emailVerified = require('email-verifier-node');
const eschema = mongoose.Schema;

const eschemaUser = new eschema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  nombre: String,
  email: String,
  telefono: String,
  iduser: String,
});

const ModelUser = mongoose.model("user", eschemaUser);

module.exports = router;

// INSERTAR USUARIO
router.post("/agregarUser", (req, res) => {
  const nuevoUser = new ModelUser({
    username: req.body.username,
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    iduser: req.body.iduser,
  });

  var emailVer = true;

  emailVerified.verify_email(req.body.email)
    .then( result => {

      if (result.is_verified != false) {
        nuevoUser.save((err) => {
          if (!err) {
            res.send("Usuario agregado correctamente");
          } else {
            res.send("Error" + err);
          }
        })
      } else {
        res.send("El correo electrónico insertado no es correcto. Formato correcto: example@domain.com");
      }
      
        console.log(result.format)
        /* { 
            "format":true,
            "is_verified":false,
            "accept_all":false,
            "message":" The email account that you tried to reach does not exist.",
            "errors":""
        } */
    })

});

//INSERTAR USUARIO DESDE jsonplaceholder
router.post("/agregarUser/:iduser", (req, res) => {
  const nuevoUserJ = new ModelUser();
  let url = 'https://jsonplaceholder.typicode.com/users/' + req.params.iduser

  axios.get(url).then(response => {
    console.log(response.data.name);
     nuevoUserJ.username = response.data.username
     console.log(nuevoUserJ.username);
     nuevoUserJ.nombre = response.data.name
     console.log(nuevoUserJ.nombre);
     nuevoUserJ.email = response.data.email
     nuevoUserJ.telefono = response.data.phone
     nuevoUserJ.iduser = response.data.id

     nuevoUserJ.save((err) => {
      if (!err) {
        res.send("Usuario agregado correctamente");
      } else {
        res.send("Error" + err);
      }
    })
   })

});


// LISTAR TODOS LOS USUARIOS
router.get("/listarUser", (req, res) => {
  ModelUser.find().then((docs) => {
    res.json(docs);
  });
  //   res.end('Cargando Listado de Usuarios');
});

//#Edit and Update

// OBTENER USUARIOS
router.get("/obtenerUser", (req, res) => {
  ModelUser.find({ iduser: req.body.iduser })
  .then((docs) => {
    res.json(docs);
  })
  .catch((err) => {
    console.log(err);
  });
});

// To Update The USER
router.post("/editarUser", (req, res) => {
  ModelUser.findOneAndUpdate(
    { iduser: req.body.iduser },
    {
      username: req.body.username,
      nombre: req.body.nombre,
      email: req.body.email,
      telefono: req.body.telefono,
    }
  )
    .then(() => {
      res.json("User Updated Successfully");
    })
    .catch((err) => {
      res.status(400).send("Unable To Update User " + err);
    });

});

// To Delete The Employee
router.post("/deleteUser", (req, res) => {
  ModelUser.findOneAndDelete({ iduser: req.body.iduser }).then(
    (user,err) => {
      if (err) res.json(err);
      else res.json("User " + user + " Deleted Successfully");
    }
  );
});


/*
const axios = require("axios");

let url = 'https://jsonplaceholder.typicode.com/users/2'

let data = {
  name: "Roberto Gomez",
  username: "roberto",
  email: "roberto@gmail.com",
  phone: "123456"
}



axios.get(url).then(response => {
 console.log(response.data.name);
})

*/
