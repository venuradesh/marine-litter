import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

//images
import BackgroundImage from "./assets/background.jpg";

//components
import Header from "./Components/Header";
import ReportMarineLitter from "./Components/ReportMarineLitter";
import EditMarinLItterInformation from "./Components/EditMarinLItterInformation";
import ReportsOnMarineLitter from "./Components/ReportsOnMarineLitter";
import InformationReport from "./Components/InformationReport";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AddAnimal from "./Components/AddAnimal";
import ReportsOnDeadAnimals from "./Components/ReportsOnDeadAnimals";
import EditDeadAnimalReport from "./Components/EditDeadAnimalReport";

const App = () => {
  return (
    <Container>
      <Background></Background>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="reportLitter" element={<ReportMarineLitter />} />
          <Route exact path="editLitterInformation/:id" element={<EditMarinLItterInformation />} />
          <Route exact path="reportsOnMarineLitter" element={<ReportsOnMarineLitter />} />
          <Route exact path="infoReport" element={<InformationReport />} />
          <Route exact path="/addAnimal" element={<AddAnimal />} />
          <Route exact path="/reportsOnDeadAnimals" element={<ReportsOnDeadAnimals />} />
          <Route exact path="/editAnimalReport/:id" element={<EditDeadAnimalReport />} />
        </Routes>
      </Router>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  position: relative;
  z-index: 0;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

export default App;
