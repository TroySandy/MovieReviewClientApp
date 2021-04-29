import { Container, Row, Col, Form } from "react-bootstrap";
import "./Home.css";

// import HomeMovieCard from "./HomeMovieCard";
import { useState, useEffect, useContext } from "react";
import MovieDisplay from "./HomeMovieDisplay";
// import ReviewIndex from "../review/ReviewIndex";
// import WatchListView from "../watchList/watchDisplay";
import config from "../../config";

const Home = (props) => {
  const [moviesResult, setMoviesResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");


  useEffect(() => {
    //load popular movies
    if (searchInput == "") {
      fetch(
        // `${window.env.TMDB_API_URL}/movie/popular?region=US&api_key=${window.env.TMDB_API_KEY}`
        `${config.REACT_APP_TMDB_API_URL}/trending/movie/week?api_key=${config.REACT_APP_TMDB_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => setMoviesResult(res.results))
        .catch((err) => console.log(err));
    } else {
      fetch(
        `${config.REACT_APP_TMDB_API_URL}/search/movie?region=US&query=${searchInput}&api_key=${config.REACT_APP_TMDB_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => setMoviesResult(res.results))
        .catch((err) => console.log(err));
    }
  }, [searchInput]);

  // function mousePosition(e) {
  //   const height = window.innerHeight;
  //   const width= window.innerWidth;
  //   const yAxisAngles = e.pageX / width * 40 -20;
  //   const xAxisAngles = e.pageY / height * -1 * 40 + 20;
  //   target.style.transform = `rotateY(${yAxisAngles}deg) rotateX(${xAxisAngles}deg)`;
  //   setSheenPosition(e.pageX / width, e.pageY / width);
  // }

  // function setSheenPosition(xRatio, yRatio) {
  //   const xOffset = 1 - (xRatio -0.5) * 800;
  //   const yOffset = 1 - (yRatio -0.5) * 800;
  //   target.style.setProperty('--sheenX', `${xOffset}px`)
  //   target.style.setProperty('--sheenY', `${yOffset}px`)
  // }
  // document.onmousemove = mousePosition;

  return (
    <>
      <Container
        className="pt-5"
        //  onMouseOver={mousePosition()}
      >
        <Row noGutters>
          {/* Main Content */}
          <Col xs={12} className="movieDisplay">
            {/* Search */}
            <Row>
              <Col>
                <Form.Control
                  className="movie-search btn-secondary"
                  id="search"
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search..."
                />
              </Col>
            </Row>
            {/* <div>
              <WatchListView />
            </div> */}
            {/* Movie Display */}
            <MovieDisplay results={moviesResult} />
          </Col>

          
        </Row>
      </Container>
    </>
  );
};

export default Home;
