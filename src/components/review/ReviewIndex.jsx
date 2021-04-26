import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import ReviewCreate from "./ReviewCreate";
import ReviewEdit from "./ReviewEdit";
import MovieDisplay from "./ReviewDisplay";
import UserContext from "../../contexts/UserContext";
import { useParams } from "react-router-dom";

const ReviewIndex = (props) => {
  const userContext = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [reviewToUpdate, setReviewToUpdate] = useState("");
  const { movie_id } = useParams();

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
    fetch(`//${process.env.REACT_APP_SERVER_API_URL}/review/movie/`, {
      method: "POST",
      body: JSON.stringify({
        movie_id: movie_id,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      }),
    })
      .then((res) => {
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
<<<<<<< HEAD:src/components/movies/movieIndex.jsx
          {/* {updateActive ? <ReviewCreate fetchReviews={fetchReviews} updateoff={updateOff} owner_id={1} movie_id={123}/> : <> </>} */}
=======
          {updateActive ? (
            <ReviewCreate fetchReviews={fetchReviews} updateoff={updateOff} />
          ) : (
            <> </>
          )}
>>>>>>> develop:src/components/review/ReviewIndex.jsx
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
