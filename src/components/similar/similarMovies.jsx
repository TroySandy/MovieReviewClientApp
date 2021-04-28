import { Container, Row, Col, Form, Card } from "react-bootstrap";
import "../home/Home.css";
// import { useState, useEffect, useContext } from "react";
// import UserContext from "../../contexts/UserContext";
import SimilarDisplay from "./similarDisplay";

const SimilarMovies = (props) => {
  console.log(props);
  const results = props.movie.similar.results;

  console.log(results);

  return (
    <>
      {" "}
      <Container
        className="pt-5 watch"
        //  onMouseOver={mousePosition()}
      >
        <Row noGutters>
          {/* Main Content */}
          <Col xs={12} className="similarDisplay">
            <div>
              {/* <ReviewIndex movie_id="634" /> */}
              <SimilarDisplay results={results} />
            </div>
          </Col>

          {/* Sidebar */}
          {/* <Col xs={3} style={{ paddingLeft: "5px" }}>
              <HomeSidebar />
            </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default SimilarMovies;
