import React from "react";
import styled from "styled-components";

//images
import BackgroundLogo from "../assets/logo.png";
import User from "../assets/user.png";

function Header() {
  return (
    <Container>
      <div className="container">
        <div className="background"></div>
        <div className="logo">
          <img src={BackgroundLogo} alt="background-logo" />
        </div>
        <div className="navigations">
          <div className="home nav-item">Home</div>
          <div className="about nav-item">About Us</div>
          <div className="involved nav-item">Be Involved</div>
          <div className="reports nav-item">Reports</div>
          <div className="blog nav-item">Blog</div>
          <div className="shop nav-item">Shop</div>
        </div>
        <div className="profile">
          <img src={User} alt="user-profile" />
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
    overflow: hidden;
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
      }
    }

    .profile {
      display: flex;
      align-items: center;

      img {
        width: 40px;
      }
    }
  }
`;
