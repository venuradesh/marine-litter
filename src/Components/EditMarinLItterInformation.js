import React, { useEffect } from "react";
import styled from "styled-components";

//images
import Image from "../assets/image.png";

function EditMarinLItterInformation() {
  const data = {
    email: "venurawarnasooriya@gmail.com",
    typeOfLitter: "cigarette",
    location: "Galle",
    images: ["image1", "image2", "image2"],
    desc: "lorem ipsum",
    date: "2023-04-03",
    contact: "0771771893",
  };

  return (
    <Container>
      <div className="container">
        <div className="background"></div>
        <div className="heading">Edit Marine Litter Information </div>
        <div className="form">
          <div className="email item">
            <label htmlFor="email">
              Email:<span>*</span>{" "}
            </label>
            <input type="email" name="email" id="email" value={`${data.email}`} />
          </div>
          <div className="type item">
            <label htmlFor="type">
              Type of Litter:<span>*</span>
            </label>
            <select id="litter-type">
              <option value="plastic" selected={data.typeOfLitter === "plastic" ? true : false}>
                Plastic Bottle
              </option>
              <option value="cigarette" selected={data.typeOfLitter === "cigarette" ? true : false}>
                Cigarette butts
              </option>
              <option value="food wrappers" selected={data.typeOfLitter === "food wrappers" ? true : false}>
                Food wrappers and containers
              </option>
              <option value="glass bottles" selected={data.typeOfLitter === "glass bottles" ? true : false}>
                Glass bottles
              </option>
              <option value="metal can" selected={data.typeOfLitter === "metal can" ? true : false}>
                Metal Can
              </option>
            </select>
          </div>
          <div className="location item">
            <label htmlFor="location">Location: </label>
            <input type="text" name="location" id="location" value={data.location} />
          </div>
          <div className="images item sub-item-available">
            <label htmlFor="images">
              Images: <br />
            </label>
            {!data.images ? (
              <div className="file">
                <input type="file" name="images" id="images" multiple accept=".jpg,.png,.jpeg" />
              </div>
            ) : (
              <div className="file">
                <input type="file" name="images" id="images" multiple accept=".jpg,.png,.jpeg" className="image-holder" />
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
            <textarea type="text" name="description" id="description" value={data.desc} />
          </div>
          <div className="date item">
            <label htmlFor="date_observed">
              Date observed:<span>*</span>{" "}
            </label>
            <input type="date" name="date_observed" id="date_observed" value={data.date} />
          </div>
          <div className="contact item">
            <label htmlFor="tel">
              Contact Details:<span>*</span>{" "}
            </label>
            <input type="tel" name="tel" id="tel" value={data.contact} />
          </div>
          <div className="btns item">
            <label htmlFor=""></label>
            <div className="btn-container">
              <button type="reset " className="btn btn-reset">
                Cancel
              </button>
              <button type="submit " className="btn btn-submit">
                Update
              </button>
            </div>
          </div>
        </div>
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
