import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  productDetails,
  productDetailsReview,
} from "../../redux/actions/productsActions";
import Loader from "../../components/Loader";
import Message from "../../components/ErrorMessage";
import "./ProductScreen.css";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../redux/constants/productsTypes";
import Rating from "../../components/Rating";
import moment from "moment";
import SearchProducts from "../../components/SearchProducts";
import { toast } from "react-toastify";
import Toast from "../../components/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 5000,
};

function ProductScreen() {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const userLoginDetails = useSelector((state) => state.userLogin);
  const { userInfo } = userLoginDetails;

  const productReviewDetails = useSelector((state) => state.productReview);
  const {
    loading: reviewLoading,
    error: reviewError,
    success: reviewSuccess,
  } = productReviewDetails;

  useEffect(() => {
    if (reviewSuccess) {
      toast.success("Your review has been submitted", ToastObjects);
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(productDetails(id));
  }, [dispatch, id, reviewSuccess]);

  const addTocart = () => {
    navigate(`/cart/${id}?quantity=${quantity}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(productDetailsReview(id, { rating, comment }));
  };
  return (
    <>
      <Toast />
      <SearchProducts />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message error={error} />
      ) : (
        <>
          <div>
            <Link to={"/"} className="ui button secondary">
              Go back
            </Link>
          </div>
          <div className="ui placement segment ">
            <div className="ui two column stackable center aligned grid">
              <div className="ui vertical divider"></div>
              <div className="middle aligned row">
                <div className="column lp">
                  <img
                    className="ui fluid image"
                    src={product.image}
                    alt={product.image}
                  />
                </div>
                <div className="column rp text-capitalize">
                  <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    {product.name}
                  </span>

                  <h2>
                    <span
                      className="ui yellow tag label"
                      style={{ fontSize: "1rem" }}
                    >
                      ${product.price}
                    </span>
                  </h2>

                  <h3 className="ui brown blocker header text-capitalize">
                    {product.category}
                  </h3>

                  <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                    {product.description}
                  </p>

                  <p>
                    {product.countInStock > 0 ? (
                      <span className="active">In stock</span>
                    ) : (
                      <span className="passive">Unavailable</span>
                    )}
                  </p>

                  {product.countInStock > 0 && (
                    <>
                      <div style={{ margin: "1.2rem" }}>
                        <div className="cart-quantity">
                          <span style={{ fontWeight: "bold" }}>Quantity:</span>
                          <select
                            id="select"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                  <div
                    className="ui vertical animated button secondary"
                    tabIndex="0"
                    onClick={addTocart}
                  >
                    <div className="hidden content gfa-2x">
                      <i className="fa-solid fa-cart-plus"></i>
                    </div>
                    <div className="visible content">Add to Cart</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ui stackable grid" style={{ marginTop: "2rem" }}>
            <div className="six wide column">
              <div
                style={{
                  color: "#fca61f",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                }}
              >
                Review
              </div>

              {product.reviews.length === 0 && (
                <div
                  style={{
                    backgroundColor: "gray",
                    width: "100%",
                    height: "100% auto",

                    padding: "0.51rem",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  <p>No Reviews</p>
                </div>
              )}

              {product.reviews.map((review) => (
                <div key={review._id} className="review">
                  <strong
                    style={{ textTransform: "capitalize", color: "#fff" }}
                  >
                    {review.name}
                  </strong>
                  <Rating rating={review.rating} />
                  <span>{moment(review.createdAt).calendar()}</span>
                  <div className="comment-alert">{review.comment}</div>
                </div>
              ))}
            </div>

            <div className="ten wide column">
              <div className="ratings">
                <div
                  style={{
                    color: "#fca61f",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    marginBottom: "1.5rem",
                  }}
                >
                  Write a Review
                </div>

                <div style={{ margin: "1.5rem" }}>
                  {reviewLoading && (
                    <div
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        backgroundColor: "#a9a9a9",
                        padding: "0.7rem",
                        border: "0.1rem solid transparent",
                        borderRadius: "0.5rem",
                      }}
                    >
                      <i className="fa-solid fa-cog fa-spin fa-spin-reverse"></i>{" "}
                      Loading...
                    </div>
                  )}

                  {reviewError && <Message error={reviewError} />}
                </div>

                {userInfo ? (
                  <>
                    <form
                      className="ui form"
                      onSubmit={handleSubmit}
                      style={{ width: "40rem", margin: "0 auto" }}
                    >
                      <div className="field">
                        <label htmlFor="rating">Rating</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          required
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </select>
                      </div>

                      <div className="field">
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          name="comment"
                          id="comment"
                          cols="20"
                          rows="2"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          required
                        ></textarea>
                      </div>

                      <div>
                        <label />
                        <button className="ui button secondary" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="no-review">
                    Please{" "}
                    <Link to="/login" style={{ color: "#fca91f" }}>
                      <strong>Login</strong>
                    </Link>{" "}
                    to write a review
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductScreen;
