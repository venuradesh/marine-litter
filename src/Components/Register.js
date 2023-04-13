import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//components
import InputField from "./Parts/InputField";

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Container>
      <div className="back" onClick={() => navigate("/login")}>
        Go back to Login
      </div>
      <RegisterContainer>
        <div className="heading">Register</div>
        <div className="form-container">
          <InputField content="First name" id="firstname" type="text" onChange={setFirstName} />
          <InputField content="Last name" id="lastname" type="text" onChange={setLastName} />
          <InputField content="Email" id="email" type="text" onChange={setEmail} />
          <InputField content="Organization Name" id="orgName" type="text" onChange={setOrgName} />
          <div className="position">
            <label htmlFor="position">Position in the organization</label>
            <select name="position" id="position">
              <option value="president">President</option>
              <option value="vice president">Vice president</option>
              <option value="secretary">Secretary</option>
              <option value="treasurer">Treasurer</option>
              <option value="member" selected>
                member
              </option>
            </select>
          </div>
        </div>
        <div className="btn-container">
          <div className="btn reset">Clear</div>
          <div className="btn submit">Register</div>
        </div>
      </RegisterContainer>
    </Container>
  );
}

export default Register;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;

  .back {
    position: absolute;
    top: 40px;
    left: 40px;
    background-color: white;
    padding: 10px 30px;
    border-radius: 50px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 3px 0 black;

    &:hover {
      background-color: lightgray;
    }
  }
`;

const RegisterContainer = styled.div`
  width: 400px;
  height: 500px;
  background-color: white;
  box-shadow: 0 0 3px 0 black;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .heading {
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 20px;
    margin-top: 10px;
  }

  .form-container {
    padding-inline: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    .position {
      label {
        font-size: 0.6rem;
        font-weight: 600;
        color: gray;
        margin-bottom: -10px;
      }
    }

    select {
      width: 100%;
      height: 40px;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid black;
    }
  }

  .btn-container {
    width: 100%;
    margin-top: 30px;
    display: flex;
    column-gap: 15px;
    padding-inline: 20px;

    .btn {
      flex: 1;
      display: flex;
      height: 50px;
      align-items: center;
      justify-content: center;
      background-color: red;
      cursor: pointer;
      color: white;

      &.submit {
        background-color: lightgreen;
      }

      &.reset {
        background-color: lightgray;

        &:hover {
          background-color: gray;
        }
      }
    }
  }
`;
