import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";

//images
import Image from "../assets/image.png";

//constants
const API_URL = "http://localhost:8080";

function EditMarinLItterInformation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [typeofLitter, setTypeofLitter] = useState("");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/getReportById`, {
        headers: { id },
      })
      .then((res) => {
        setLoaded(true);
        setData(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onUpdateClick = (e) => {
    e.preventDefault();
    if (email || typeofLitter || location || desc || date || contact || images.length > 0) {
      const formData = new FormData();
      formData.append("email", email && email !== data.email ? email : data.email);
      formData.append("location", location && location !== data.location ? location : data.location);
      formData.append("desc", desc && desc !== data.desc ? desc : data.desc);
      formData.append("typeofLitter", typeofLitter && typeofLitter !== data.typeofLitter ? typeofLitter : data.typeOfLitter);
      formData.append("date", date && date !== data.date ? date : data.date);
      formData.append("contact", contact && contact !== data.contact ? contact : data.contact);
      formData.append("id", id);

      if (images.length > 0) {
        images.map((image) => {
          formData.append("photo", image, image.name);
        });
      }

      axios
        .put(`${API_URL}/updateReports`, formData)
        .then((res) => {
          navigate("/reportsOnMarineLitter");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/reportsOnMarineLitter");
    }
  };

  return (
    <Container>
      <div className="container">
        <div className="background"></div>
        <div className="heading">Edit Marine Litter Information </div>
        {loaded ? (
          <div className="form">
            <div className="email item">
              <label htmlFor="email">
                Email:<span>*</span>{" "}
              </label>
              <input type="email" name="email" id="email" defaultValue={`${data.email}`} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="type item">
              <label htmlFor="type">
                Type of Litter:<span>*</span>
              </label>
              <select id="litter-type" defaultValue={data.typeOfLitter} onChange={(e) => setTypeofLitter(e.target.value)}>
                <option value="plastic">Plastic Bottle</option>
                <option value="cigarette">Cigarette butts</option>
                <option value="food wrappers">Food wrappers and containers</option>
                <option value="glass bottles">Glass bottles</option>
                <option value="metal can">Metal Can</option>
              </select>
            </div>
            <div className="location item">
              <label htmlFor="location">Location: </label>
              <input type="text" name="location" id="location" defaultValue={data.location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="images item sub-item-available">
              <label htmlFor="images">
                Images: <br />
              </label>
              {!data.images.legth === 0 ? (
                <div className="file">
                  <input type="file" name="images" id="images" multiple accept=".jpg,.png,.jpeg" onChange={(e) => setImages((prev) => [...e.target.files])} />
                </div>
              ) : (
                <div className="file with-images">
                  <input type="file" name="images" id="images" multiple accept=".jpg,.png,.jpeg" className="image-holder" onChange={(e) => setImages((prev) => [...e.target.files])} />
                  {data.images.map((image, key) => (
                    <img src={Image} alt="pictureHolder" key={key} />
                  ))}
                  <button onClick={() => document.getElementById("images").click()}>Change</button>
                </div>
              )}
            </div>
            <div className="desc item sub-item-available">
              <label htmlFor="description">
                Description:<span>*</span> <br />
              </label>
              <textarea type="text" name="description" id="description" defaultValue={data.desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
            <div className="date item">
              <label htmlFor="date_observed">
                Date observed:<span>*</span>{" "}
              </label>
              <input type="date" name="date_observed" id="date_observed" defaultValue={data.date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="contact item">
              <label htmlFor="tel">
                Contact Details:<span>*</span>{" "}
              </label>
              <input type="tel" name="tel" id="tel" defaultValue={data.contact} onChange={(e) => setContact(e.target.value)} />
            </div>
            <div className="btns item">
              <label htmlFor=""></label>
              <div className="btn-container">
                <button type="reset " className="btn btn-reset" onClick={() => navigate("/reportsOnMarineLitter")}>
                  Cancel
                </button>
                <button type="submit " className="btn btn-submit" onClick={(e) => onUpdateClick(e)}>
                  Update
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="loading">loading...</div>
        )}
      </div>
    </Container>
  );
}

export default EditMarinLItterInformation;

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
