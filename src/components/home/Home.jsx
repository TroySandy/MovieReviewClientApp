import { Container, Row, Col, Form, Card } from "react-bootstrap";
import "./Home.css";
import HomeSidebar from "./HomeSidebar";
import HomeMovieCard from "./HomeMovieCard";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import MovieDisplay from "./HomeMovieDisplay";
import ReviewIndex from "../review/ReviewIndex";
import WatchListView from '../watchList/watchDisplay'

const Home = (props) => {
  const [moviesResult, setMoviesResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const userContext = useContext(UserContext);

  useEffect(() => {
    //load popular movies
    if (searchInput == "") {
      fetch(
        // `${window.env.TMDB_API_URL}/movie/popular?region=US&api_key=${window.env.TMDB_API_KEY}`
        `${process.env.REACT_APP_TMDB_API_URL}/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => setMoviesResult(res.results));
    } else {
      fetch(
        `${process.env.REACT_APP_TMDB_API_URL}/search/movie?region=US&query=${searchInput}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => setMoviesResult(res.results));
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
      <Container className="pt-5 body"
      //  onMouseOver={mousePosition()}
       >
        <Row noGutters>
          {/* Main Content */}
          <Col xs={12} className='movieDisplay'>
            {/* Search */}
            <Row>
              <Col>
                <Form.Control
                  className="movie-search"
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search..."
                />
              </Col>
            </Row>
            <div>
              {/* <ReviewIndex movie_id="634" /> */}
              <WatchListView />
            </div>
            {/* Movie Display */}
            <MovieDisplay results={moviesResult} />
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

export default Home;
