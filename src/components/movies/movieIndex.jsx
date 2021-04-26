import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import ReviewCreate from "./movieCreate";
import ReviewEdit from "./movieEdit";
import MovieDisplay from "./movieDisplay";
// import UserContext from '../../contexts/UserContext'
// import { useParams } from "react-router-dom";

const ReviewIndex = (props) => {
  const [reviews, setReviews] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [reviewToUpdate, setReviewToUpdate] = useState({});
  const movie_id = "634"
  //  const userContext = useContext(UserContext)
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwia…1NTl9.VkzGmGs0hqkZAo99RxHQx0QOcIwsGBhcSHUtGbzNTZs";
  // const movie_id = "643";

  const editUpdateReview = (review) => {
    setReviewToUpdate(review);
  };

  const updateOn = () => {
    setUpdateActive(true);
  };

  const updateOff = () => {
    setUpdateActive(false);
  };

  const fetchReviews = () => {
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwia…1NTl9.VkzGmGs0hqkZAo99RxHQx0QOcIwsGBhcSHUtGbzNTZs'
    // const owner_id = 'mom1'

    fetch(`http://localhost:3000/review/movie/:movie_id`, {
      method: "POST",
      body: JSON.stringify({
        movie_id: movie_id,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userContext.token}`,
      }),
    })
      .then((res) => res.json)
      .then((res) => {
        console.log(res.reviews);
        setReviews(res.reviews);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  

  return (
    <Container>
      <Row>
        {/* <Col><ReviewCreate/></Col> */}
        <Col>
          
      <MovieDisplay
            reviews={reviews}
            movie_id={movie_id}
            // token={token}
            fetchReviews={fetchReviews}
            // editUpdateReview={editUpdateReview}
            updateOn={updateOn}
          />
        </Col>
        {updateActive ? (
          <ReviewEdit
            reviewToUpdate={reviewToUpdate}
            updateOff={updateOff}
            // token={token}
            fetchReviews={fetchReviews}
          />
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
};

export default ReviewIndex;
