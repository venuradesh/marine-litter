const mongoose = require("mongoose");

const LitterImage = new mongoose.Schema({
  name: String,
  type: String,
  data: Buffer,
});

const litterReport = new mongoose.Schema({
  email: String,
  typeOfLitter: String,
  location: String,
  desc: String,
  date: String,
  contact: String,
  userId: String,
  images: [LitterImage],
});

const user = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  orgName: String,
  position: String,
  password: String,
});

const animal = new mongoose.Schema({
  email: String,
  deadAnimalType: String,
  desc: String,
  date: String,
  contact: String,
  time: String,
  userId: String,
  images: [LitterImage],
});

let Report;
let Image;
let User;
let Animal;

module.exports.initialize = () => {
  return new Promise((resolve, reject) => {
    const db = mongoose.createConnection("mongodb+srv://tempuser:EXQtqnNIXHm6N6At@marine-litter.foiicjv.mongodb.net/?retryWrites=true&w=majority");
    db.on("error", (err) => {
      reject("error occured when connecting to the database: ", err);
    });

    db.once("open", () => {
      Report = db.model("litterReports", litterReport);
      Image = db.model("litterImages", LitterImage);
      User = db.model("user", user);
      Animal = db.model("animal", animal);
      resolve();
    });
  });
};

module.exports.addReport = (formData) => {
  return new Promise((resolve, reject) => {
    const newReport = new Report({
      email: formData.email,
      typeOfLitter: formData.typeofLitter,
      location: formData.location,
      desc: formData.desc,
      date: formData.date,
      contact: formData.contact,
      userId: formData.userId,
    });
    if (formData.images.length > 0) {
      formData.images.map((image) => {
        newReport.images.push({
          name: image.name,
          type: image.type,
          data: image.data,
        });
      });
    }
    newReport
      .save()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject("Error occured when saving: ", err);
      });
  });
};

module.exports.getReports = (userId) => {
  return new Promise((resolve, reject) => {
    Report.find({ userId: userId })
      .exec()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject("error occured when retrieving: ", err);
        console.log("error:", err);
      });
  });
};

module.exports.getReportById = (id) => {
  return new Promise((resolve, reject) => {
    Report.findById(id)
      .exec()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject("error when fetching from id", err);
      });
  });
};

module.exports.updateReports = (id, formData) => {
  return new Promise((resolve, reject) => {
    Report.findById(id)
      .exec()
      .then((result) => {
        Report.updateOne(
          { _id: id },
          {
            $set: {
              email: formData.email,
              typeOfLitter: formData.typeofLitter,
              location: formData.location,
              desc: formData.desc,
              date: formData.date,
              contact: formData.contact,
              images: formData.images.length > 0 ? [] : [...result.images],
            },
          }
        )
          .exec()
          .then((res) => {
            if (formData.images.length > 0) {
              Report.updateOne(
                { _id: id },
                {
                  $addToSet: { images: [...formData.images] },
                }
              )
                .exec()
                .then(() => {
                  resolve();
                })
                .catch((err) => {
                  reject(err);
                });
            } else {
              resolve();
            }
          })
          .catch((err) => {
            reject("error when updating the reports");
          });
      })
      .catch((err) => {
        reject("error when finding");
      });
  });
};

module.exports.deleteReport = (id) => {
  return new Promise((resolve, reject) => {
    Report.findByIdAndRemove(id)
      .then((res) => {
        resolve();
      })
      .catch((err) => {
        reject("error when deleting the report");
      });
  });
};

//animal section

module.exports.addUser = (userData) => {
  return new Promise((resolve, reject) => {
    const newUser = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      orgName: userData.orgName,
      position: userData.position,
      password: userData.password,
    });

    User.find({ email: userData.email })
      .exec()
      .then((res) => {
        if (res.length === 0) {
          newUser
            .save()
            .then(() => {
              resolve({ message: "user created", error: false });
            })
            .catch((err) => {
              console.log(err);
              reject("error in adding user to the database");
            });
        } else {
          resolve({ message: "user email already exist", error: true });
        }
      });
  });
};

module.exports.checkUser = (email, password) => {
  return new Promise((resolve, reject) => {
    User.find({ email: email })
      .exec()
      .then((res) => {
        if (res.length > 0) {
          if (res[0].password === password) {
            resolve({ message: "password matching", valid: true, userId: res[0]._id });
          } else {
            resolve({ message: "password incorrect", valid: false });
          }
        } else {
          resolve({ message: "No user with that email", valid: false });
        }
      })
      .catch((err) => {
        reject("error finding the user");
      });
  });
};

//animal section
module.exports.addAnimal = (animalData) => {
  return new Promise((resolve, reject) => {
    const newAnimal = new Animal({
      email: animalData.email,
      deadAnimalType: animalData.type,
      desc: animalData.desc,
      date: animalData.date,
      contact: animalData.contact,
      time: animalData.time,
      userId: animalData.userId,
    });

    if (animalData.images.length > 0) {
      animalData.images.map((image) => {
        newAnimal.images.push({
          name: image.name,
          type: image.type,
          data: image.data,
        });
      });
    }

    newAnimal
      .save()
      .then(() => {
        resolve({ message: "animal added", error: false });
      })
      .catch((err) => {
        console.log(err);
        reject({ message: "error adding the animal to the database", error: true });
      });
  });
};

module.exports.getAnimals = (userId) => {
  return new Promise((resolve, reject) => {
    Animal.find({ userId: userId })
      .exec()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject({ message: "error occured while fetching data", error: true });
      });
  });
};

module.exports.getAnimalById = (id) => {
  return new Promise((resolve, reject) => {
    Animal.findById(id)
      .exec()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject({ message: "error occured while fetching the report", error: true });
      });
  });
};

module.exports.updateAnimals = (animaldata, reportId) => {
  return new Promise((resolve, reject) => {
    Animal.findById(reportId)
      .exec()
      .then((result) => {
        Animal.updateOne(
          { _id: reportId },
          {
            $set: {
              email: animaldata.email,
              deadAnimalType: animaldata.type,
              desc: animaldata.desc,
              date: animaldata.date,
              contact: animaldata.contact,
              time: animaldata.time,
              images: animaldata.images.length > 0 ? [] : [...result.images],
            },
          }
        )
          .exec()
          .then((res) => {
            if (animaldata.images.length > 0) {
              Animal.updateOne(
                { _id: reportId },
                {
                  $addToSet: { images: [...animaldata.images] },
                }
              )
                .exec()
                .then((res) => {
                  resolve();
                })
                .catch((err) => {
                  console.log(err);
                  reject({ message: "error in updating the images", error: true });
                });
            } else {
              resolve();
            }
          })
          .catch((err) => {
            console.log(err);
            reject({ message: "error in updating the content", error: true });
          });
      })
      .catch((err) => {
        console.log(err);
        reject({ message: "error while finding the particular report", error: true });
      });
  });
};

module.exports.deleteAnimal = (animalId) => {
  return new Promise((resolve, reject) => {
    Animal.findByIdAndRemove(animalId)
      .then((res) => {
        resolve();
      })
      .catch((err) => reject({ message: "error in deleting the report", error: true }));
  });
};
