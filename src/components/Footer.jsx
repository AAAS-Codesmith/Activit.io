import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBFooter
      className="text-center text-white"
      style={{ backgroundColor: "#ffffff" }}
    >
      <MDBContainer className="p-4"></MDBContainer>
      <MDBIcon icon="camera-retro" />
      <div
        className="text-center p-3 text-white"
        style={{ backgroundColor: "#079057" }}
      >
        © 2022 Copyright:
        <a className="text-white" href="#">
          Activ-8
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
