import React, { useState, useEffect, useContext } from "react";
import { Col } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";
import ReviewStars from "../movie/ReviewStars";
import config from "../../config";

const MovieDisplay = (props) => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [review] = useState(props.review);
  const [extendedReview, setExtendedReview] = useState(false);

  const deleteReview = () => {
    fetch(`${config.REACT_APP_SERVER_API_URL}/review/`, {
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
      fetch(`${config.REACT_APP_SERVER_API_URL}/user/${review.owner_id}`)
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          setUser(res);
        });
    }
  }, []);

  return (
    <>
      <Col key={review.id} xs={10}>
        <div className="p-3 mt-3" style={{ border: "1px solid" }}>
          <p className="mb-0">
            {extendedReview ? review.review : review.review.substring(0, 500)}
            {review.review.length > 500 ? "..." : ""}
          </p>
          {review.review.length > 500 ? (
            <div className="pb-3 d-flex justify-content-end">
              {extendedReview ? (
                <p
                  onClick={() => setExtendedReview(false)}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Show Less...
                </p>
              ) : (
                <p
                  onClick={() => setExtendedReview(true)}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Show More...
                </p>
              )}
            </div>
          ) : null}
          <div className="d-flex justify-content-between">
            <div>
              <ReviewStars value={review.rating} />
            </div>
            <div>
              by{" "}
              {user && `${user.firstName} ${user.lastName}(${user.username})`}
              {!props.review.user &&
                user &&
                userContext.user.id === review.owner_id && (
                  <>
                    {" "}
                    |{" "}
                    <p
                      onClick={props.showEditModal}
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                    >
                      Edit
                    </p>
                  </>
                )}
              {!props.review.user &&
                user &&
                userContext.user.id === review.owner_id && (
                  <>
                    {" "}
                    |{" "}
                    <p
                      onClick={deleteReview}
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                    >
                      Delete
                    </p>
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
