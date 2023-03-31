import React from "react";
import styled from "styled-components";

function ReportMarineLitter() {
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
            <input type="email" name="email" id="email" />
          </div>
          <div className="type item">
            <label htmlFor="type">
              Type of Litter:<span>*</span>
            </label>
            <select>
              <option value="plastic">Plastic Bottle</option>
              <option value="cigarette">Cigarette butts</option>
              <option value="food wrappers">Food wrappers and containers</option>
              <option value="glass bottles">Glass bottles</option>
              <option value="metal can">Metal Can</option>
            </select>
          </div>
          <div className="location item">
            <label htmlFor="location">Location: </label>
            <input type="text" name="location" id="location" />
          </div>
          <div className="images item sub-item-available">
            <label htmlFor="images">
              Images: <br />
              <span className="sub">A clear picture of the showing details of manufacture | Producer | country origin | bar code | any relavant details</span>
            </label>
            <div className="file">
              <input type="file" name="images" id="images" multiple accept=".jpg,.png,.jpeg" />
            </div>
          </div>
          <div className="desc item sub-item-available">
            <label htmlFor="description">
              Description:<span>*</span> <br />
              <span className="sub">Please provide as much as information of the incident (Location, visible details, Number of cases, Other related information)</span>
            </label>
            <textarea type="text" name="description" id="description" />
          </div>
          <div className="date item">
            <label htmlFor="date_observed">
              Date observed:<span>*</span>{" "}
            </label>
            <input type="date" name="date_observed" id="date_observed" />
          </div>
          <div className="contact item">
            <label htmlFor="tel">
              Contact Details:<span>*</span>{" "}
            </label>
            <input type="tel" name="tel" id="tel" />
          </div>
          <div className="btns item">
            <label htmlFor=""></label>
            <div className="btn-container">
              <button type="reset " className="btn btn-reset">
                Cancel
              </button>
              <button type="submit " className="btn btn-submit">
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
