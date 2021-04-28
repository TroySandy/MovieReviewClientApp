import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./similar.css";

const SimilarCard = (props) => {
  console.log(props);
  return (
    <LinkContainer
      to={{
        pathname: `/similar/${props.movie.id}`,
        state: {
          movie: props.movie,
        },
      }}
    >
      <div className="similar-card">
        <img
          width="100%"
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${props.movie.poster_path}`}
          className="img"
        />
        <h6 className="text-center  similar-card-title">{props.movie.title}</h6>
        {/* <p className="text-center movie-card-title overflow-hidden" style={{maxHeight: '3.5rem'}}>{props.movie.overview}</p> */}
      </div>
    </LinkContainer>
  );
};

export default SimilarCard;
