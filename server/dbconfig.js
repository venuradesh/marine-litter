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
  images: [LitterImage],
});

let Report;
let Image;

module.exports.initialize = () => {
  return new Promise((resolve, reject) => {
    const db = mongoose.createConnection("mongodb+srv://tempuser:EXQtqnNIXHm6N6At@marine-litter.foiicjv.mongodb.net/?retryWrites=true&w=majority");
    db.on("error", (err) => {
      reject("error occured when connecting to the database: ", err);
    });

    db.once("open", () => {
      Report = db.model("litterReports", litterReport);
      Image = db.model("litterImages", LitterImage);
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
    });
    formData.images.map((image) => {
      newReport.images.push({
        name: image.name,
        type: image.type,
        data: image.data,
      });
    });
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

module.exports.getReports = () => {
  return new Promise((resolve, reject) => {
    Report.find()
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
