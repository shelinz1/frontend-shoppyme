import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import moment from "moment";
import { orderDeliver, orderDetail } from "../../redux/actions/orderActions";
import Footer from "../Footer";
import Contact from "../Contact";

const OrderDetailsMain = ({ orderId }) => {
  const adminOrderDetails = useSelector((state) => state.detailOrder);
  const { order, loading, error } = adminOrderDetails;

  const adminOrderDeliver = useSelector((state) => state.deliverOrder);
  const { loading: deliverLoding, success } = adminOrderDeliver;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderDetail(orderId));
  }, [dispatch, orderId, success]);

  if (!loading) {
    const calculatedDecimal = (number) => {
      return Math.round((number * 100) / 100).toFixed(2);
    };

    order.productsPrice = calculatedDecimal(
      order.orderProducts.reduce(
        (total, value) => total + value.quantity * value.price,
        0
      )
    );

    order.shippingPrice =
      order.productsPrice > 100 ? calculatedDecimal(0) : calculatedDecimal(10);

    order.taxPrice = calculatedDecimal(0.15 * order.productsPrice);

    order.totalPrice = (
      Number(order.productsPrice) +
      Number(order.shippingPrice) +
      Number(order.taxPrice)
    ).toFixed(2);
  }

  const deliverOrder = () => {
    dispatch(orderDeliver(order));
  };

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <Link to={"/orders"} className="btn btn-dark text-white mt-3">
            Go back
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : (
          <div className="card mt-3">
            <header className="card-header bg-dark">
              <div className="row align-items-center">
                <div className="">
                  <span>
                    <i className="far fa-calendar-alt"></i>{" "}
                    <b className="text-white">
                      {moment(order.createdAt).format("llll")}
                    </b>
                  </span>

                  <br />

                  <small className="text-white">Order ID : {order._id}</small>
                </div>
              </div>
            </header>

            <div className="card-body">
              {/* orderdetailinfo */}

              <div className="orderInfo">
                <div className="">
                  <div className="icons">
                    <i className="fa-2x fas fa-user-circle text-muted"></i>
                  </div>

                  <div className="content">
                    <h4>
                      <strong>Customer</strong>
                    </h4>
                    <p>
                      <strong>{order.user.name}</strong> <br />
                      <strong>
                        <a href={`mailto:${order.user.email}`}>
                          {order.user.email}
                        </a>
                      </strong>
                    </p>
                  </div>
                </div>

                <div className="">
                  <div className="icons">
                    <i className="fa-2x fas fa-info-circle text-muted"></i>
                  </div>

                  <div className="content">
                    <h4>
                      <strong>About order</strong>
                    </h4>
                    <p>
                      <strong>Shipping</strong>:{" "}
                      <strong>{order.shippingAddress.country}</strong>
                    </p>
                    <p>
                      <strong>Payment Method</strong>:{" "}
                      <strong>{order.paymentMethod}</strong>
                    </p>
                  </div>
                </div>

                <div className="">
                  <div className="icons">
                    <i className="fa-2x fas fa-location text-muted"></i>
                  </div>

                  <div className="content">
                    <h4>
                      <strong>Location</strong>
                    </h4>
                    <p>
                      <strong>Address:</strong>{" "}
                      <strong>{order.shippingAddress.city}</strong>{" "}
                      <strong>{order.shippingAddress.address}</strong>
                    </p>
                    <p>
                      {" "}
                      <strong>PostalCode:</strong>{" "}
                      <strong>{order.shippingAddress.postalCode}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* orderproductinfo */}
            <div className="container-fluid">
              <div className="row orderProductInfo">
                <div>
                  <div className="table-responsive">
                    <table className="table border table-hover table-lg">
                      <thead>
                        <tr>
                          <th style={{ width: "20%" }}>Product</th>
                          <th style={{ width: "20%" }}>Name</th>
                          <th style={{ width: "20%" }}>Quantity</th>
                          <th style={{ width: "20%" }}>Price</th>
                          <th style={{ width: "20%" }}>Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        {order.orderProducts.map((item, index) => (
                          <tr key={item._id}>
                            <td className="d-flex">
                              <div>
                                <img
                                  className="img-xs"
                                  src={item.image}
                                  alt={item.image}
                                  style={{ width: "50px", height: "50px" }}
                                />
                              </div>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>

                            <td>${item.price}</td>

                            <td>${item.price * item.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <p>
                      <strong>Order Info</strong>
                    </p>
                  </div>

                  <div className="card-body">
                    <span>
                      <strong>Subtotal : ${order.productsPrice}</strong>
                    </span>
                    <br />
                    <span>
                      <strong>Shipping cost : ${order.shippingPrice}</strong>
                    </span>
                    <br />
                    <span>
                      <strong>All total : ${order.totalPrice}</strong>
                    </span>
                    <br />

                    {order.isPaid ? (
                      <button
                        disabled="disabled"
                        className="btn btn-success mt-3"
                      >
                        Paid
                      </button>
                    ) : (
                      <button
                        disabled="disabled"
                        className="btn btn-danger mt-3"
                      >
                        Not paid
                      </button>
                    )}
                    <br />

                    <div>
                      {order.isDelivered ? (
                        <button className="btn btn-success mt-3">
                          DELIVERED AT (
                          {moment(order.timeOfDelivery).format("MMM Do YY")})
                        </button>
                      ) : (
                        <>
                          {deliverLoding && <Spinner />}
                          <button
                            className="btn btn-dark mt-3"
                            onClick={deliverOrder}
                            disabled={!order.isPaid}
                          >
                            Mark as delivered
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
      <Contact />
    </>
  );
};

export default OrderDetailsMain;
