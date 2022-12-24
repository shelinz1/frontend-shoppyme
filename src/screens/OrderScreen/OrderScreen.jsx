import React, { useEffect } from "react";
import axios from "axios";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ORDER_PAY_FAILURE,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "../../redux/constants/orderTypes";
import { orderDetails } from "../../redux/actions/orderActions";
import Loader from "../../components/Loader";
import Message from "../../components/ErrorMessage";
import moment from "moment";
import "./orderscreen.css";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";

function OrderScreen() {
  const params = useParams();
  const { id: orderId } = params;

  const createdOrdersDetails = useSelector(
    (state) => state.createdOrdersDetails
  );
  const { order, loading, error } = createdOrdersDetails;

  const userLoginDetails = useSelector((state) => state.userLogin);
  const { userInfo } = userLoginDetails;

  const payOrder = useSelector((state) => state.payOrder);
  const {
    loading: payLoading,
    error: payError,
    success: paySuccess,
  } = payOrder;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  //PAYMENT APPROVE METHOD
  function approve(data, actions) {
    return actions.order.capture().then(async (details) => {
      try {
        dispatch({
          type: ORDER_PAY_REQUEST,
        });

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const response = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          config
        );
        dispatch({ type: ORDER_PAY_SUCCESS, payload: response.data });
      } catch (error) {
        dispatch({
          type: ORDER_PAY_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    });
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (!order || paySuccess || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(orderDetails(orderId));
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", config);

        payPalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });

        payPalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      loadPaypalScript();
    }
  }, [
    dispatch,
    orderId,
    paySuccess,
    order,
    userInfo,
    navigate,
    payPalDispatch,
  ]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message error={error} />
  ) : (
    <>
      {" "}
      <Link to="/orderhistory" className="btn btn-dark mt-2 mb-2">
        order history
      </Link>
      <br />
      <strong>Order {order._id}</strong>
      <div className="orderInfo">
        <div className="">
          <div className="icons">
            <i className="user circle icon huge"></i>
          </div>

          <div className="content">
            <h2>
              <strong>Customer</strong>
            </h2>
            <p>
              <strong>Name</strong>: <strong>{userInfo.name}</strong>
            </p>
            <p>
              <strong>Email</strong>: <strong>{userInfo.email}</strong>
            </p>
          </div>
        </div>

        <div className="">
          <div className="icons">
            <i className="info circle icon huge"></i>
          </div>

          <div className="content">
            <h2>
              <strong>About order</strong>
            </h2>
            <p>
              <strong>Shipping</strong>:{" "}
              <strong>{order.shippingAddress.country}</strong>
            </p>
            <p>
              <strong>Payment Method</strong>:{" "}
              <strong>{order.paymentMethod}</strong>
            </p>

            {order.isPaid ? (
              <div
                style={{
                  width: "100%",
                  height: "100% auto",
                  textAlign: "center",
                  padding: "0.51rem",
                  color: "green",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                <p>Paid on {moment(order.timeOfPayment).format("MMM Do YY")}</p>
              </div>
            ) : (
              <div
                style={{
                  width: "50%",
                  height: "100% auto",
                  textAlign: "center",
                  padding: "0.51rem",
                  color: "#a02020",
                  fontWeight: "bold",
                  margin: "auto",
                  fontSize: "1.2rem",
                }}
              >
                <p>Not Paid</p>
              </div>
            )}
          </div>
        </div>

        <div className="">
          <div className="icons">
            <i className="location arrow icon huge"></i>
          </div>

          <div className="content">
            <h2>
              <strong>Location</strong>
            </h2>
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
            {order.isDelivered ? (
              <div
                style={{
                  width: "50%",
                  height: "100% auto",
                  textAlign: "center",
                  padding: "0.51rem",
                  fontWeight: "bold",
                  margin: "auto",
                  color: "green",
                  fontSize: "1.2rem",
                }}
              >
                <p>
                  Delivered at{" "}
                  {moment(order.timeOfDelivery).format("MMM Do YY")}{" "}
                </p>
              </div>
            ) : (
              <div
                style={{
                  color: "#a02020",
                  width: "50%",
                  height: "100% auto",
                  textAlign: "center",
                  padding: "0.51rem",
                  fontWeight: "bold",
                  margin: "auto",
                  fontSize: "1.2rem",
                }}
              >
                <p>Not Delivered</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="ui stackable grid orderDetails">
        <div className="ten wide column">
          {order.orderProducts.length === 0 ? (
            <div>Your order is Emptyt</div>
          ) : (
            <>
              {order.orderProducts.map((item) => (
                <div className="cartitem" key={item.product}>
                  <div className="cart-product">
                    <div className="product-description">
                      <img
                        src={item.image}
                        alt={item.image}
                        style={{ width: "10rem" }}
                      />
                    </div>

                    <div className="description">
                      <h6>NAME</h6>
                      <h6 className="product-nam">{item.name}</h6>
                    </div>

                    <div className="quantity">
                      <h6>QUANTITY</h6>
                      <h6>{item.quantity}</h6>
                    </div>

                    <div>
                      <h6>SUBTOTAL</h6>
                      <h6>
                        {item.quantity} x {item.price}= $
                        {item.quantity * item.price}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="six wide column price-info">
          <table className="ui definition table">
            <tbody>
              <tr>
                <td>Products price</td>
                <td>$ {order.productsPrice.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Shipping Price</td>
                <td>$ {order.shippingPrice.toFixed(2)}</td>
              </tr>

              <tr>
                <td>Tax price</td>
                <td>$ {order.taxPrice.toFixed(2)}</td>
              </tr>

              <tr>
                <td>Total price</td>
                <td>
                  {" "}
                  <strong>$ {order.totalPrice.toFixed(2)} </strong>
                </td>
              </tr>
            </tbody>
          </table>

          {!order.isPaid && (
            <div>
              {isPending ? (
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
              ) : (
                <>
                  {payError && <Message error={payError} />}

                  {payLoading && (
                    <div
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: "bold",
                        backgroundColor: "#a9a9a9a",
                        padding: "0.7rem",
                        border: "0.1rem solid transparent",
                        borderRadius: "0.5rem",
                      }}
                    >
                      {payLoading}
                    </div>
                  )}

                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={approve}
                    onError={error}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Contact />
    </>
  );
}

export default OrderScreen;
