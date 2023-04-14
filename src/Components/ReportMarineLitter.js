import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080";

function ReportMarineLitter() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("'");
  const [typeofLitter, setTypeofLitter] = useState("");
  const [location, setLocation] = useState("colombo");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [images, setImages] = useState([]);
  const [err, setError] = useState("");

  const onSubmitClick = (e) => {
    e.preventDefault();
    if (email && typeofLitter && desc && date && contact) {
      const formData = new FormData();
      setError("");
      if (images.length > 0) {
        images.map((image) => {
          formData.append("photo", image, image.name);
        });
      }

      formData.append("email", email);
      formData.append("typeofLitter", typeofLitter);
      formData.append("location", location);
      formData.append("desc", desc);
      formData.append("date", date);
      formData.append("contact", contact);
      formData.append("userId", window.localStorage.getItem("userId"));

      axios
        .post(`${API_URL}/addReport`, formData)
        .then((res) => {
          navigate("/reportsOnMarineLitter");
        })
        .catch((err) => console.log(err));
    } else {
      setError("Please fill Required Fields");
    }
  };

  return (
    <Container>
      <div className="container">
        <div className="background"></div>
        <div className="heading">Report Marine Litter </div>
        <div className="form">
          <div className="email item">
            <label htmlFor="email">
              Email:<span>*</span>{" "}
            </label>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="litter-type item">
            <label htmlFor="litter-type">
              Litter type:<span>*</span>{" "}
            </label>
            <input type="text" name="litter-type" id="litter-type" onChange={(e) => setTypeofLitter(e.target.value)} />
          </div>
          <div className="type item">
            <label htmlFor="type">
              Location:<span>*</span>
            </label>
            <select id="location" onChange={(e) => setLocation(e.target.value)}>
              <option value="ampara">Ampara</option>
              <option value="batticaloa">batticaloa</option>
              <option value="colombo" selected>
                colombo
              </option>
              <option value="galle">galle</option>
              <option value="gampaha">gampaha</option>
              <option value="hambantota">Hambantota</option>
              <option value="jaffna">jaffna</option>
              <option value="kalutara">kalutara</option>
              <option value="kilinochchi">kilinochchi</option>
              <option value="mannar">mannar</option>
              <option value="matara">matara</option>
              <option value="mullativu">mullativu</option>
              <option value="puttalam">puttalam</option>
              <option value="trincomalee">trincomalee</option>
            </select>
          </div>
          <div className="images item sub-item-available">
            <label htmlFor="images">
              Images: <br />
              <span className="sub">A clear picture of the showing details of manufacture | Producer | country origin | bar code | any relavant details</span>
            </label>
            <div className="file">
              <input type="file" name="images" id="images" multiple accept=".jpg,.png,.jpeg" onChange={(e) => setImages((prev) => [...e.target.files])} />
            </div>
          </div>
          <div className="desc item sub-item-available">
            <label htmlFor="description">
              Description:<span>*</span> <br />
              <span className="sub">Please provide as much as information of the incident (Location, visible details, Number of cases, Other related information)</span>
            </label>
            <textarea type="text" name="description" id="description" onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div className="date item">
            <label htmlFor="date_observed">
              Date observed:<span>*</span>{" "}
            </label>
            <input type="date" name="date_observed" id="date_observed" onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="contact item">
            <label htmlFor="tel">
              Contact Details:<span>*</span>{" "}
            </label>
            <input type="tel" name="tel" id="tel" onChange={(e) => setContact(e.target.value)} />
          </div>
          {err ? <div className="error">Please fill required fields</div> : <></>}
          <div className="btns item">
            <label htmlFor=""></label>
            <div className="btn-container">
              <button type="reset " className="btn btn-reset" onClick={() => navigate("/reportsOnMarineLitter")}>
                Cancel
              </button>
              <button type="submit " className="btn btn-submit" onClick={(e) => onSubmitClick(e)}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ReportMarineLitter;

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
    padding-inline: 30px;
    padding-bottom: 10px;
    padding-top: 20px;
    z-index: 10;

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
      .error {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ff7987;
      }

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
