const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const eschema = mongoose.Schema;

const eschemaNote = new eschema({
  title: String,
  content: String,
  date: String, 
  author: String,
  idnota: String,
});

const ModelNota = mongoose.model("nota", eschemaNote);

module.exports = router;

// INSERTAR NOTA
router.post("/agregarNota", (req, res) => {
  const nuevoNota = new ModelNota({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    author: req.body.author,
    idnota: req.body.idnota,
  });
  nuevoNota.save((err) => {
    if (!err) {
      res.send("Nota agregado correctamente");
    } else {
      res.send("Error" + err);
    }
  });
});

// LISTAR TODAS LAS NOTAS
router.get("/listarNotas", (req, res) => {
  ModelNota.find().then((docs) => {
    res.json(docs);
  });
    // res.end('Cargando Listado de Usuarios');
});

// OBTENER NOTA
router.post("/obtenerNota", (req, res) => {
  ModelNota.find({ idnota: req.body.idnota }).then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      console.log(err);
    });
});

// UPDATE
router.post("/editarNota", (req, res) => {
 
  ModelNota.findOneAndUpdate(
    { idnota: req.body.idnota },
    {
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
        author: req.body.author
    }
  )
    .then(() => {
      res.json("Nota Updated Successfully");
    })
    .catch((err) => {
      res.status(400).send("Unable To Update Nota " + err);
    });
});

// DELETE
router.post("/deleteNota", (req, res) => {
  ModelNota.findOneAndDelete({ idnota: req.body.idnota }).then((Nota, err) => {
    if (err) res.json(err);
    else res.json("Nota " + Nota + " Deleted Successfully");
  });
});

  
