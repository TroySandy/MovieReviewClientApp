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
  const [reviewToUpdate, setReviewToUpdate] = useState("");
  const { movie_id } = "643";

  //  const userContext = useContext(UserContext)
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTYxOTQ0MjMwMH0.byi6Z-uB5a_sOoa5EEHrU_DcJlpX_juNi5AADBHcHmE";
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
    const movie_id = "643";
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTYxOTQ0MjMwMH0.byi6Z-uB5a_sOoa5EEHrU_DcJlpX_juNi5AADBHcHmE'
    // const owner_id = 'mom1'
    console.log(movie_id);
    fetch(`http://localhost:3000/review/movie/`, {
      method: "POST",
      body: JSON.stringify({
        movie_id: movie_id,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userContext.token}`,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setReviews(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchReviews();
  }, []);
  console.log(reviews);
  return (
    <Container>
      <Row>
        <Col>
          {/* {updateActive ? <ReviewCreate fetchReviews={fetchReviews} updateoff={updateOff} owner_id={1} movie_id={123}/> : <> </>} */}
          <Button onClick={updateOn}>Click me to leave a review</Button>
        </Col>
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
