const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dataConfig = require("./dbconfig.js");
const fileUpload = require("express-fileupload");

const HTTP_PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

//routes
app.post("/addReport", (req, res) => {
  let images = [];
  if (req.files) {
    if (Array.isArray(req.files.photo)) {
      req.files.photo.map((image) => {
        images.push({ type: image.mimetype, data: image.name });
      });
    } else {
      images.push(req.files.photo);
    }
  }

  const formData = {
    email: req.body.email,
    typeofLitter: req.body.typeofLitter,
    location: req.body.location,
    desc: req.body.desc,
    date: req.body.date,
    contact: req.body.contact,
    images: images,
  };

  dataConfig
    .addReport(formData)
    .then(() => {
      res.status(201).send({ message: "successfully created", error: false });
    })
    .catch((err) => {
      res.status(501).send({ message: err, error: true });
    });
});

dataConfig
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("Server listening on port: ", HTTP_PORT);
    });
  })
  .catch((err) => {
    console.log("Unable to start the Server", err);
  });
