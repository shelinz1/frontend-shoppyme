function Rating({ rating, numReviews }) {
  return (
    <div className="rating" style={{ color: "#fca61f" }}>
      <span>
        <i
          className={
            rating >= 1
              ? "fa fa-star"
              : rating >= 0.5
              ? "fa fa-star-half"
              : "fa fa-star-o"
          }
        ></i>
      </span>

      <span>
        <i
          className={
            rating >= 2
              ? "fa fa-star"
              : rating >= 1.5
              ? "fa fa-star-half"
              : "fa fa-star-o"
          }
        ></i>
      </span>

      <span>
        <i
          className={
            rating >= 3
              ? "fa fa-star"
              : rating >= 2.5
              ? "fa fa-star-half"
              : "fa fa-star-o"
          }
        ></i>
      </span>

      <span>
        <i
          className={
            rating >= 4
              ? "fa fa-star"
              : rating >= 3.5
              ? "fa fa-star-half"
              : "fa fa-star-o"
          }
        ></i>
      </span>

      <span>
        <i
          className={
            rating >= 5
              ? "fa fa-star"
              : rating >= 4.5
              ? "fa fa-star-half"
              : "fa fa-star-o"
          }
        ></i>
      </span>

      <span
        style={{ color: "#fff", paddingLeft: "0.5rem", fontWeight: "bold" }}
      >
        {numReviews && <p>{numReviews} reviews</p>}
      </span>
    </div>
  );
}

export default Rating;
