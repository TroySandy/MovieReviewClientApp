import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Col, Container, Row } from "reactstrap";
import UserContext from "../../contexts/UserContext";
import "./Movie.css";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStarHalfAlt as halfStar } from "@fortawesome/free-solid-svg-icons";
import BeautyStars from "beauty-stars";
import ReviewIndex from '../review/ReviewIndex'

const Movie = (props) => {
  const userContext = useContext(UserContext);
  const [movie, setMovie] = useState(null);
  const { movie_id } = useParams();
  const [rating, setRating] = useState(0);

  // const calculateStars = (num) => {
  //   let fullStars = Math.floor(num);
  //   let halfStar = num % 1 >= 0.5;
  //   let strArr = [];

  //   for (let i = 0; i < fullStars; i++) {
  //     strArr.push("full");
  //   }

  //   if (halfStar) strArr.push("half");

  //   while (strArr.length < 5) {
  //     strArr.push("empty");
  //   }

  //   return strArr;
  // };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_TMDB_API_URL}/movie/${movie_id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
      .then((res) => res.json())
      .then(setMovie);
  }, []);

  return (
    <>
      {movie && (
        <Container className="movie py-3">
          <Row noGutters>
            <Col xs={6}>
              <img
                width="100%"
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
              />
              
            </Col>
            <Col className="position-relative pl-3">
              <div
                className="position-absolute w-100 pr-3"
                style={{ bottom: 0 }}
              >
                <div className="w100 px-3">
                  <div className="float-left stars">
                    {/* {calculateStars(rating).map((e) => {
                      if (e == "full") {
                        return <FontAwesomeIcon icon={fullStar} />;
                      } else if (e == "half") {
                        return <FontAwesomeIcon icon={halfStar} />;
                      } else {
                        return <FontAwesomeIcon icon={emptyStar} />;
                      }
                    })} */}
                    
                  </div>
                  <div className="float-right">Right</div>
                </div>
              </div>
              <h2 className="text-center mt-5 px-3">{movie.title}</h2>
              <h6 className="text-center mb-5 px-3">{movie.tagline}</h6>
              <p className="px-3">{movie.overview}</p>
              <ReviewIndex movie_id={movie.id}/>
            </Col>
          </Row>
          <hr />
        </Container>
      )}
    </>
  );
};

export default Movie;
