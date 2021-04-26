import React from "react";
import { Table, Button } from "reactstrap";

const MovieDisplay = (review) => {
  console.log("review", review);
  console.log("review.reviews", review.reviews);

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
          <td>{userReview.rating}</td>
          <td>{userReview.favorite}</td>
        </tr>
      );
    });
  };
  return (
    <>
      <h1>Movie Reviews</h1>
      <hr />
      <Table>
        <thead>
          <tr>
            <th>review</th>
            <th>rating</th>
            <th>favorite</th>
          </tr>
        </thead>
        <tbody>{reviewMap()}</tbody>
      </Table>
    </>
  );
};
export default MovieDisplay;
