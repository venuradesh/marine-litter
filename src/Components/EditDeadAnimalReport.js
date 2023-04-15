import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

//images
import Image from "../assets/image.png";

//constants
const API_URL = "http://localhost:8080";

function EditDeadAnimalReport() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [typeofDeadAnimal, setTypeofDeadAnimal] = useState("");
  const [time, setTime] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const [imagesChanged, setImagesChanged] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/getAnimalsById`, {
        headers: {
          reportid: id,
        },
      })
      .then((res) => {
        console.log(res.data.message);
        setFetchedData(res.data.message);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onUpdateClick = (e) => {
    e.preventDefault();
    if (email || typeofDeadAnimal || time || desc || date || contact || imagesChanged || images.length > 0) {
      const formData = new FormData();
      if (images.length > 0) {
        images.map((image) => {
          formData.append("images", image, image.name);
        });
      }
      formData.append("email", email && email !== fetchedData.email ? email : fetchedData.email);
      formData.append("typeofDeadAnimal", typeofDeadAnimal && typeofDeadAnimal !== fetchedData.deadAnimalType ? typeofDeadAnimal : fetchedData.deadAnimalType);
      formData.append("time", time && time !== fetchedData.time ? time : fetchedData.time);
      formData.append("date", date && date !== fetchedData.date ? date : fetchedData.date);
      formData.append("desc", desc && desc !== fetchedData.desc ? desc : fetchedData.desc);
      formData.append("contact", contact && contact !== fetchedData.contact ? contact : fetchedData.contact);
      formData.append("reportid", id);

      axios
        .put(`${API_URL}/updateAnimal`, formData)
        .then((res) => {
          console.log(res);
          if (!res.data.error) {
            navigate("/reportsOnDeadAnimals");
          }
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/reportsOnDeadAnimals");
    }
  };

  return (
    <Container>
      <div className="container">
        <div className="background"></div>
        <div className="heading">Update a dead Marine Animal Report</div>
        {loaded ? (
          <div className="form">
            <div className="email item">
              <label htmlFor="email">
                Email:<span>*</span>{" "}
              </label>
              <input type="email" name="email" id="email" defaultValue={fetchedData.email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="litter-type item">
              <label htmlFor="litter-type">
                Type of dead animal you came across<span>*</span>{" "}
              </label>
              <input type="text" name="litter-type" id="litter-type" defaultValue={fetchedData.deadAnimalType} onChange={(e) => setTypeofDeadAnimal(e.target.value)} />
            </div>
            <div className="images item sub-item-available">
              <label htmlFor="images">
                Images: <br />
                <span className="sub">Select 3 or more images</span>
              </label>
              {fetchedData.images.length === 0 ? (
                <div className="file">
                  <input type="file" name="images" id="images" multiple accept=".jpg,.png,.jpeg" onChange={(e) => setImages((prev) => [...e.target.files])} />
                </div>
              ) : (
                <>
                  <div className="file with-images">
                    <input
                      type="file"
                      name="images"
                      id="images"
                      multiple
                      accept=".jpg,.png,.jpeg"
                      className="image-holder"
                      onChange={(e) => {
                        setImages((prev) => [...e.target.files]);
                        setImagesChanged(true);
                      }}
                    />
                    {imagesChanged ? images.map((image, key) => <img src={Image} alt="pictureHolder" key={key} />) : fetchedData.images.map((image, key) => <img src={Image} alt="pictureHolder" key={key} />)}
                    <button onClick={() => document.getElementById("images").click()}>Change</button>
                  </div>
                </>
              )}
            </div>
            <div className="desc item sub-item-available">
              <label htmlFor="description">
                Description:<span>*</span> <br />
                <span className="sub">Please provide as much as information of the incident (Location, visible details, Number of cases, Other related information)</span>
              </label>
              <textarea type="text" name="description" id="description" defaultValue={fetchedData.desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
            <div className="date item">
              <label htmlFor="date_observed">
                Date observed:<span>*</span> <span className="sub">Provide date when the incident was noticed</span>
              </label>
              <input type="date" name="date_observed" id="date_observed" defaultValue={fetchedData.date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="contact item">
              <label htmlFor="tel">
                Time: (24 Hours format) <span className="sub">Provide time when the incident was noticed</span>
              </label>
              <input type="time" name="time" id="time" defaultValue={fetchedData.time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <div className="contact item">
              <label htmlFor="tel">
                Contact Details:<span>*</span> <span className="sub">Please provide the fastest method of contacting you (Phone, number, email)</span>
              </label>
              <input type="tel" name="tel" id="tel" defaultValue={fetchedData.contact} onChange={(e) => setContact(e.target.value)} />
            </div>
            <div className="btns item">
              <label htmlFor=""></label>
              <div className="btn-container">
                <button type="reset " className="btn btn-reset" onClick={() => navigate("/reportsOnDeadAnimals")}>
                  Cancel
                </button>
                <button type="submit " className="btn btn-submit" onClick={(e) => onUpdateClick(e)}>
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>Loading</>
        )}
      </div>
    </Container>
  );
}

export default EditDeadAnimalReport;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;

  .container {
    width: 650px;
    height: max-content;
    position: relative;
    top: 130px;
    padding: 30px;
    z-index: 10;

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .background {
      width: 100%;
      height: 100%;
      background-color: #427ea0;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      opacity: 0.7;
    }

    .heading {
      margin-bottom: 30px;
      font-size: 1.5rem;
      font-weight: 600;
      text-align: center;
      color: white;
    }

    .form {
      .item {
        display: flex;
        column-gap: 10px;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
        margin-bottom: 10px;
        min-height: 40px;
        height: 40px;
        max-height: max-content;

        &.sub-item-available {
          height: 80px;
        }

        input,
        select,
        .btn-container,
        .file,
        textarea {
          flex: 2;
          height: 100%;
          font-size: 1rem;
          outline: none;
        }

        textarea {
          resize: none;
          font-family: sans-serif;
        }

        &.images {
          .file {
            background-color: white;
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;

            input {
              height: max-content;

              &.image-holder {
                display: none;
              }
            }

            img {
              width: 30px;
              margin-left: 20px;
            }

            button {
              background-color: gray;
              border: none;
              font-size: 1rem;
              padding: 8px 30px;
              color: white;
              cursor: pointer;
              margin-left: auto;
              margin-right: 20px;
            }
          }
        }

        label {
          flex: 1;
          color: white;

          span {
            color: red;
          }

          .sub {
            font-size: 0.6rem;
            color: white;
            line-height: 15px;
            opacity: 0.6;
            display: flex;
            flex-wrap: wrap;
          }
        }

        .btn-container {
          display: flex;
          column-gap: 20px;
          outline: none;

          .btn {
            cursor: pointer;
            border: none;
            width: 100px;
          }

          .btn-submit {
            background-color: lightgreen;
          }
        }
      }
    }
  }
`;
