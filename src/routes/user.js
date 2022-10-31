const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
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
  });
  nuevoUser.save((err) => {
    if (!err) {
      res.send("Usuario agregado correctamente");
    } else {
      res.send("Error" + err);
    }
  });
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
router.post("/obtenerUser", (req, res) => {
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
