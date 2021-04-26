import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./Home.css";

const MovieCard = (props) => {
  const [movie, setMovie] = useState({});

  useEffect(() => {}, []);

  return (
    <div className="movie-card">
      <img
        width="100%"
        src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${props.movie.poster_path}`}
      />
      <h6 className="text-center movie-card-title">{props.movie.title}</h6>
    </div>
  );
};

export default MovieCard;
