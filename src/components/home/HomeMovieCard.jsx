import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./Home.css";

const HomeMovieCard = (props) => {
  const [movie, setMovie] = useState({});

  useEffect(() => {}, []);

  return (
    <>
      <Col xs={3}>
        <img
          width="100%"
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${props.movie.poster_path}`}
        />
        <h6 className="text-center">{props.movie.title}</h6>
      </Col>
    </>
  );
};

export default HomeMovieCard;
