const mongoose = require("mongoose");

const litterReport = new mongoose.Schema({
  email: String,
  typeOfLitter: String,
  location: String,
  desc: String,
  date: String,
  contact: String,
  images: [
    {
      type: String,
      data: Buffer,
    },
  ],
});

let Report;

module.exports.initialize = () => {
  return new Promise((resolve, reject) => {
    const db = mongoose.createConnection("mongodb+srv://tempuser:EXQtqnNIXHm6N6At@marine-litter.foiicjv.mongodb.net/?retryWrites=true&w=majority");
    db.on("error", (err) => {
      reject("error occured when connecting to the database: ", err);
    });

    db.once("open", () => {
      Report = db.model("litterReports", litterReport);
      resolve();
    });
  });
};

module.exports.addReport = async (formData) => {
  return new Promise((resolve, reject) => {
    const newReport = new Report(formData);
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
