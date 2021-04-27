import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../home/Home.css";

const WatchedCard = (props) => {
  console.log(props);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(
      // `${window.env.TMDB_API_URL}/movie/popular?region=US&api_key=${window.env.TMDB_API_KEY}`
      `${process.env.REACT_APP_TMDB_API_URL}/movie/${props.movie.movie_id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=similar`
    )
      .then((res) => res.json())
      .then((res) => setResults(res));
  }, []);

  console.log(results);
  console.log(
    `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${props.movie.backdrop_path}`
  );
  return (
    <LinkContainer
      to={{
        pathname: `/watched/${props.movie.movie_id}`,
        state: {
          movie: props.movie,
        },
      }}
    >
      <div className="movie-card">
        <img
          width="100%"
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${results.poster_path}`}
          className="img"
        />
        {/* <h6 className="text-center movie-card-title">{props.movie.title}</h6> */}
        {/* <p className="text-center movie-card-title overflow-hidden" style={{maxHeight: '3.5rem'}}>{props.movie.overview}</p> */}
      </div>
    </LinkContainer>
  );
};

export default WatchedCard;
