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

let Report;
let Image;
let User;

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
