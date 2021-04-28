import React, { useState, useEffect, useContext } from "react";
import { Col } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";
import ReviewStars from "../movie/ReviewStars";

const MovieDisplay = (props) => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [review] = useState(props.review);

  const deleteReview = () => {
    fetch(`//${process.env.REACT_APP_SERVER_API_URL}/review/`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      }),
      body: JSON.stringify({ id: review.id }),
    })
      .then(() => props.fetchReviews())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (props.review.user) {
      setUser(props.review.user);
      return;
    }

    if (userContext.isAuth && userContext.user.id === review.owner_id) {
      setUser(userContext.user);
    } else {
      fetch(`//${process.env.REACT_APP_SERVER_API_URL}/user/${review.owner_id}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setUser(res);
        });
    }
  }, []);

  return (

    <>
      <Col key={review.id} xs={10}>
        <div className="p-3 mt-3" style={{ border: "1px solid" }}>
          <p>{review.review}</p>
          <div className="d-flex justify-content-between">
            <div>
              <ReviewStars value={review.rating} />
            </div>
            <div>
              by{" "}
              {user && `${user.firstName} ${user.lastName}(${user.username})`}
              {user && userContext.user.id === review.owner_id && (
                <>
                  {" "}
                  |{" "}
                  <a
                    onClick={props.showEditModal}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    Edit
                  </a>
                </>
              )}
              {user && userContext.user.id === review.owner_id && (
                <>
                  {" "}
                  |{" "}
                  <a
                    onClick={deleteReview}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    Delete
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};
export default MovieDisplay;
