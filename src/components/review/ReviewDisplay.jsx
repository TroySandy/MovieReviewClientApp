import React from "react";
import {useState, useEffect, useContext} from 'react'
import { Table, Button, Container, Row, Col } from "reactstrap";
import BeautyStars from "beauty-stars";
import UserContext from "../../contexts/UserContext";
import ReviewCreate from "./ReviewCreate";
import ReviewEdit from "./ReviewEdit";


const MovieDisplay = (review) => {
  const userContext = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [reviewToUpdate, setReviewToUpdate] = useState("");
  console.log("review", review);
  console.log("review.reviews", review.reviews);


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
        movie_id: '460465',
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userContext.token}`,
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

  const deleteReview = (review) => {
    fetch(
      `//${process.env.REACT_APP_SERVER_API_URL}/review/${review.movie_id}`,
      {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${review.token}`,
        }),
      }
    )
      .then(() => review.fetchReviews())
      .catch((err) => console.log(err));
  };

  const reviewMap = () => {
    console.log("REVIEWS", review.reviews);
    return review.reviews.map((userReview, index) => {
      return (
        <tr key={index}>
          {/* <th scope="row">{userReview.id}</th> */}
          <td>{userReview.review}</td>
          <td><BeautyStars
                      value={userReview.rating}
                      size="18px"
                      inactiveColor="#FFFFFF"
                      activeColor="#000000"
                    /></td>
          <td>{userReview.favorite}</td>
        </tr>
      );
    });
  };
  return (

    <>
    <Container>
      <Row>
        <Col>
          {updateActive ? (
            <ReviewCreate fetchReviews={fetchReviews} updateoff={updateOff} />
          ) : (
            <> </>
          )}
          <Button onClick={updateOn}>Click me to leave a review</Button>
        </Col>
        <Col></Col>
      <h1>User Reviews</h1>
      <Table>
        {reviewMap()}
      </Table>
      </Row>
      <Row>
      
        {/* {updateActive ? (
          <ReviewEdit
            reviewToUpdate={reviewToUpdate}
            updateOff={updateOff}
            // token={token}
            fetchReviews={fetchReviews}
          />
        ) : (
          <></>
        )} */}
      </Row>
    </Container>
    </>
  );
};
export default MovieDisplay;
