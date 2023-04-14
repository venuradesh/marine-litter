import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//images
import BackgroundLogo from "../assets/logo.png";
import User from "../assets/user.png";

function Header() {
  const navigate = useNavigate();
  const [logoutClicked, setLogoutClicked] = useState(false);

  const onLoginClicked = () => {
    window.localStorage.removeItem("userId");
    setLogoutClicked(false);
    navigate("/login");
  };

  return (
    <Container>
      <div className="container">
        <div className="background"></div>
        <div className="logo">
          <img src={BackgroundLogo} alt="background-logo" />
        </div>
        <div className="navigations">
          <div className="home nav-item" onClick={() => navigate("/reportsOnMarineLitter")}>
            Home
          </div>
          <div className="about nav-item">About Us</div>
          <div className="involved nav-item" onClick={() => navigate("/reportLitter")}>
            Be Involved
          </div>
          <div className="reports nav-item">Reports</div>
          <div className="blog nav-item">Blog</div>
          <div className="shop nav-item">Shop</div>
        </div>
        <div className="profile">
          <img src={User} alt="user-profile" onClick={() => (!logoutClicked ? setLogoutClicked(true) : setLogoutClicked(false))} />
          <div className={`logout-section ${logoutClicked ? "active" : ""}`} onClick={() => onLoginClicked()}>
            Logout
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  width: 100vw;
  height: 100px;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    width: 80%;
    height: 80px;
    border-radius: 25px;
    position: relative;
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .background {
      width: 100%;
      height: 100%;
      background-color: white;
      opacity: 0.4;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 25px;
    }

    .logo {
      height: 100%;
      display: flex;
      align-items: center;

      img {
        width: 50px;
        height: 50px;
      }
    }

    .navigations {
      width: 50%;
      display: flex;
      justify-content: space-between;

      .nav-item {
        font-family: sans-serif;
        color: white;
        cursor: pointer;
        z-index: 100;
      }
    }

    .profile {
      display: flex;
      align-items: center;
      flex-direction: column;
      position: relative;

      img {
        width: 40px;
        cursor: pointer;
      }

      .logout-section {
        width: 100px;
        height: 40px;
        position: absolute;
        bottom: -70px;
        left: -40px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transform: scaleY(0);
        transform-origin: top;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 0 3px 0 black;

        &:hover {
          background-color: lightgray;
        }

        &.active {
          transform: scaleY(1);
        }
      }
    }
  }
`;
