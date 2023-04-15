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

//initializing
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

//routes
//adding the reports into the database
app.post("/addReport", (req, res) => {
  let images = [];
  if (req.files) {
    if (Array.isArray(req.files.photo)) {
      req.files.photo.map((image) => {
        images.push({ type: image.mimetype, data: image.data, name: image.name });
      });
    } else {
      images.push({ type: req.files.photo.mimetype, data: req.files.photo.data, name: req.files.photo.name });
    }
  }

  const formData = {
    email: req.body.email,
    typeofLitter: req.body.typeofLitter,
    location: req.body.location,
    desc: req.body.desc,
    date: req.body.date,
    contact: req.body.contact,
    userId: req.body.userId,
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

//retreiving reports from the database
app.get("/getReports", (req, res) => {
  const userId = req.headers.userid;
  dataConfig
    .getReports(userId)
    .then((result) => {
      res.status(200).send({ message: result, error: false });
    })
    .catch((err) => {
      res.status(409).send({ message: "error when fetching data from the database", error: true });
    });
});

//get the route by id
app.get("/getReportById", (req, res) => {
  const id = req.headers.id;
  dataConfig
    .getReportById(id)
    .then((result) => {
      res.status(200).send({ message: result, error: false });
    })
    .catch((err) => res.status(409).send({ messaeg: err, error: true }));
});

//update report
app.put("/updateReports", (req, res) => {
  const id = req.body.id;
  const images = [];

  if (req.files) {
    if (Array.isArray(req.files.photo)) {
      req.files.photo.map((image) => {
        images.push({ type: image.mimetype, data: image.data, name: image.name });
      });
    } else {
      images.push({ type: req.files.photo.mimetype, data: req.files.photo.data, name: req.files.photo.name });
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
    .updateReports(id, formData)
    .then(() => {
      res.status(200).send({ message: "done", error: false });
    })
    .catch((err) => {
      console.log(err);
      res.status(409).send({ message: err, error: true });
    });
});

//delete report
app.delete("/deleteReport/:id", (req, res) => {
  const id = req.params.id;
  dataConfig
    .deleteReport(id)
    .then(() => {
      res.status(202).send({ message: "ok", error: false });
    })
    .catch((err) => {
      res.status(409).send({ message: err, error: true });
    });
});

// User Section
app.post("/addUser", (req, res) => {
  dataConfig
    .addUser(req.body)
    .then((result) => {
      if (result.error) {
        res.status(201).send(result);
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(409).send({ message: err, error: true });
    });
});

app.get("/checkUser", (req, res) => {
  dataConfig
    .checkUser(req.headers.email, req.headers.password)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(409).send({ message: err, error: true });
    });
});

//animal section
app.post("/addAnimal", (req, res) => {
  const images = [];
  req.files &&
    req.files.images.map((image) => {
      images.push({ name: image.name, type: image.mimetype, data: image.data });
    });

  const animalData = {
    email: req.body.email,
    type: req.body.deadAnimalType,
    desc: req.body.desc,
    date: req.body.date,
    contact: req.body.contact,
    time: req.body.time,
    images: images,
    userId: req.body.userId,
  };

  dataConfig
    .addAnimal(animalData)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(409).send(err);
    });
});

app.get("/getAnimals", (req, res) => {
  const userId = req.headers.userid;
  dataConfig
    .getAnimals(userId)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(409).send(err);
    });
});

app.get("/getAnimalsById", (req, res) => {
  const reportId = req.headers.reportid;
  dataConfig
    .getAnimalById(reportId)
    .then((result) => {
      res.status(200).send({ message: result, error: false });
    })
    .catch((err) => {
      res.status(409).send(err);
    });
});

app.put("/updateAnimal", (req, res) => {
  const images = [];
  const id = req.body.reportid;

  if (req.files) {
    req.files.images.map((image) => {
      images.push({ data: image.data, type: image.mimetype, name: image.name });
    });
  }

  const formData = {
    email: req.body.email,
    type: req.body.typeofDeadAnimal,
    desc: req.body.desc,
    date: req.body.date,
    contact: req.body.contact,
    time: req.body.time,
    images: images,
  };

  dataConfig
    .updateAnimals(formData, id)
    .then(() => {
      res.status(200).send({ message: "ok", error: false });
    })
    .catch((err) => {
      res.status(409).send(err);
    });
});

app.delete("/deleteAnimal", (req, res) => {
  const reportId = req.headers.reportid;

  dataConfig
    .deleteAnimal(reportId)
    .then(() => {
      res.status(200).send({ message: "ok", error: false });
    })
    .catch((err) => {
      res.status(409).send(err);
    });
});
