import { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import "./watch.css";
import config from "../../config";

const WatchedCard = (props) => {
  // console.log(props);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(
      // `${window.env.TMDB_API_URL}/movie/popular?region=US&api_key=${window.env.TMDB_API_KEY}`
      `${config.REACT_APP_TMDB_API_URL}/movie/${props.movie.movie_id}?api_key=${config.REACT_APP_TMDB_API_KEY}&append_to_response=similar`
    )
      .then((res) => res.json())
      .then((res) => setResults(res));
  }, []);

  // console.log(results);
  // console.log(
  //   `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${props.movie.backdrop_path}`
  // );
  return (
    <LinkContainer
      to={{
        pathname: `/movie/${props.movie.movie_id}`,
        state: {
          movie: props.movie,
        },
      }}
    >
      <div className="watch-card">
        <img
          width="100%"
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${results.poster_path}`}
          className="img"
          alt='movie poster'
        />
        <h6 className="text-center watch-card-title">{results.title}</h6>
        {/* <p className="text-center movie-card-title overflow-hidden" style={{maxHeight: '3.5rem'}}>{props.movie.overview}</p> */}
      </div>
    </LinkContainer>
  );
};

export default WatchedCard;
