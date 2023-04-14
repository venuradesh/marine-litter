import React, { useState } from "react";
import styled from "styled-components";
import InputField from "./Parts/InputField";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8080";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmitClick = () => {
    if (email && password) {
      axios
        .get(`${API_URL}/checkUser`, {
          headers: {
            email,
            password,
          },
        })
        .then((res) => {
          if (res.data.valid) {
            window.localStorage.setItem("userId", res.data.userId);
            navigate("/reportLitter");
          } else {
            setErr(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErr("Please fill email and Password");
    }
  };

  return (
    <Container>
      <div className="login-container">
        <div className="login">
          <div className="heading">Login</div>
          <div className="input-container">
            <InputField type="text" content="Email" id="email" onChange={setEmail} />
            <InputField type="password" content="Password" id="password" onChange={setPassword} />
          </div>
          {err ? <div className="error-container">{err}*</div> : <></>}
          <div className="btn-container">
            <div className="btn" onClick={() => onSubmitClick()}>
              Login
            </div>
          </div>
        </div>

        <div className="create-acc" onClick={() => navigate("/register")}>
          Create an account
        </div>
      </div>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(6px);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-container {
    width: 400px;
    height: 370px;
    background-color: white;
    box-shadow: 0 0 3px 0 black;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .heading {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 20px;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      row-gap: 15px;
    }

    .error-container {
      color: red;
      margin-top: 15px;
      margin-bottom: -15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
    }

    .btn-container {
      width: 100%;
      height: 50px;
      margin-top: 30px;
      display: flex;

      .btn {
        width: 100%;
        height: 100%;
        background-color: lightgray;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        cursor: pointer;
        color: white;
        transition: all 0.3s ease;

        &:hover {
          background-color: gray;
        }
      }
    }

    .create-acc {
      font-size: 0.8rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
