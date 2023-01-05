import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Steps from "../../components/checkoutSteps/Steps";
import { createOrder } from "../../redux/actions/orderActions";
import { CREATE_ORDER_RESET } from "../../redux/constants/orderTypes";
import Message from "../../components/ErrorMessage";
import SearchProducts from "../../components/SearchProducts";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";

function PlaceOrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLoginDetails = useSelector((state) => state.userLogin);
  const { userInfo } = userLoginDetails;

  const createdOrders = useSelector((state) => state.createdOrders);
  const { order, success, loading, error } = createdOrders;

  const cart = useSelector((state) => state.cart);
  // const {
  //   cartItems,
  //   shippingAddress,
  //   paymentMethod,
  //   productsPrice,
  //   shippingPrice,
  //   taxPrice,
  //   totalPrice,
  // } = cart;

  const calculatedDecimal = (number) =>
    Math.round(number * 100 + Number.EPSILON) / 100;

  cart.productsPrice = calculatedDecimal(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  cart.shippingPrice = calculatedDecimal(cart.productsPrice > 100 ? 0 : 10);
  // productsPrice > 100 ? calculatedDecimal(0) : calculatedDecimal(10);

  cart.taxPrice = calculatedDecimal(Number(0.15 * cart.productsPrice));

  cart.totalPrice =
    Number(cart.productsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice);

  const goShopping = () => {
    navigate("/");
  };

  // useEffect(() => {
  //   if (success) {
  //     navigate(`/order/${order._id}`);
  //     dispatch({ type: CREATE_ORDER_RESET });
  //   }
  // }, [success, dispatch, navigate, order]);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderProducts: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        productsPrice: cart.productsPrice,
        shippingPrice: cart.shippingAddress,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
    navigate(`/order/${order._id}`);
  };

  return (
    <div>
      <SearchProducts />
      <Steps step1 step2 step3 step4 />
      <div className="orderInfo">
        <div className="infos">
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

        <div className="infos">
          <div className="icons">
            <i className="info circle icon huge"></i>
          </div>

          <div className="content">
            <h2>
              <strong>About order</strong>
            </h2>
            <p>
              <strong>Shipping</strong>:{" "}
              <strong>{cart.shippingAddress.country}</strong>
            </p>
            <p>
              <strong>Payment Method</strong>:{" "}
              <strong>{cart.paymentMethod}</strong>
            </p>
          </div>
        </div>

        <div className="infos">
          <div className="icons">
            <i className="location arrow icon huge"></i>
          </div>

          <div className="content">
            <h2>
              <strong>Location</strong>
            </h2>
            <p>
              <strong>Address</strong>:{" "}
              <strong>{cart.shippingAddress.address}</strong>
            </p>
            <p>
              <strong>Postal code</strong>:{" "}
              <strong>{cart.shippingAddress.postalCode}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="ui stackable grid orderDetails">
        <div className="ten wide column">
          {cart.cartItems.length === 0 ? (
            <div className="cart-empty">
              "cart is empty"
              <div
                className="ui vertical animated button secondary goShopping"
                tabIndex="0"
                onClick={goShopping}
              >
                <div className="hidden content gfa-2x">
                  <i className="fa-solid fa-basket-shopping"></i>
                </div>
                <div className="visible content">Go Shopping</div>
              </div>{" "}
            </div>
          ) : (
            <>
              {cart.cartItems.map((item) => (
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
                      <Link
                        to={`/products/${item.product}`}
                        className="nav-link"
                      >
                        <p className="product-name">{item.name}</p>
                      </Link>
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
                <td>${cart.productsPrice.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Shipping Price</td>
                <td>${cart.shippingPrice.toFixed(2)}</td>
              </tr>

              <tr>
                <td>Tax price</td>
                <td>${cart.taxPrice.toFixed(2)}</td>
              </tr>

              <tr>
                <td>Total price</td>
                <td>
                  <strong>${cart.totalPrice.toFixed(2)}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            className="ui button primary"
            onClick={placeOrderHandler}
            disabled={cart.cartItems.length === 0}
          >
            PLACE ORDER
          </button>

          <div style={{ marginTop: "1rem" }}>
            {loading && (
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

            {error && <Message error={error} />}
          </div>
        </div>
      </div>

      <Footer />
      <Contact />
    </div>
  );
}

export default PlaceOrderScreen;

// import Axios from 'axios';
// import React, { useContext, useEffect, useReducer } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Link, useNavigate } from 'react-router-dom';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import ListGroup from 'react-bootstrap/ListGroup';
// import { toast } from 'react-toastify';
// import { getError } from '../utils';
// import { Store } from '../Store';
// import CheckoutSteps from '../components/CheckoutSteps';
// import LoadingBox from '../components/LoadingBox';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'CREATE_REQUEST':
//       return { ...state, loading: true };
//     case 'CREATE_SUCCESS':
//       return { ...state, loading: false };
//     case 'CREATE_FAIL':
//       return { ...state, loading: false };
//     default:
//       return state;
//   }
// };

// export default function PlaceOrderScreen() {
//   const navigate = useNavigate();

//   const [{ loading }, dispatch] = useReducer(reducer, {
//     loading: false,
//   });

//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const { cart, userInfo } = state;

//   const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
//   cart.itemsPrice = round2(
//     cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
//   );
//   cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
//   cart.taxPrice = round2(0.15 * cart.itemsPrice);
//   cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

//   const placeOrderHandler = async () => {
//     try {
//       dispatch({ type: 'CREATE_REQUEST' });

//       const { data } = await Axios.post(
//         '/api/orders',
//         {
//           orderItems: cart.cartItems,
//           shippingAddress: cart.shippingAddress,
//           paymentMethod: cart.paymentMethod,
//           itemsPrice: cart.itemsPrice,
//           shippingPrice: cart.shippingPrice,
//           taxPrice: cart.taxPrice,
//           totalPrice: cart.totalPrice,
//         },
//         {
//           headers: {
//             authorization: `Bearer ${userInfo.token}`,
//           },
//         }
//       );
//       ctxDispatch({ type: 'CART_CLEAR' });
//       dispatch({ type: 'CREATE_SUCCESS' });
//       localStorage.removeItem('cartItems');
//       navigate(`/order/${data.order._id}`);
//     } catch (err) {
//       dispatch({ type: 'CREATE_FAIL' });
//       toast.error(getError(err));
//     }
//   };

//   useEffect(() => {
//     if (!cart.paymentMethod) {
//       navigate('/payment');
//     }
//   }, [cart, navigate]);

//   return (
//     <div>
//       <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
//       <Helmet>
//         <title>Preview Order</title>
//       </Helmet>
//       <h1 className="my-3">Preview Order</h1>
//       <Row>
//         <Col md={8}>
//           <Card className="mb-3">
//             <Card.Body>
//               <Card.Title>Shipping</Card.Title>
//               <Card.Text>
//                 <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
//                 <strong>Address: </strong> {cart.shippingAddress.address},
//                 {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
//                 {cart.shippingAddress.country}
//               </Card.Text>
//               <Link to="/shipping">Edit</Link>
//             </Card.Body>
//           </Card>

//           <Card className="mb-3">
//             <Card.Body>
//               <Card.Title>Payment</Card.Title>
//               <Card.Text>
//                 <strong>Method:</strong> {cart.paymentMethod}
//               </Card.Text>
//               <Link to="/payment">Edit</Link>
//             </Card.Body>
//           </Card>

//           <Card className="mb-3">
//             <Card.Body>
//               <Card.Title>Items</Card.Title>
//               <ListGroup variant="flush">
//                 {cart.cartItems.map((item) => (
//                   <ListGroup.Item key={item._id}>
//                     <Row className="align-items-center">
//                       <Col md={6}>
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="img-fluid rounded img-thumbnail"
//                         ></img>{' '}
//                         <Link to={`/product/${item.slug}`}>{item.name}</Link>
//                       </Col>
//                       <Col md={3}>
//                         <span>{item.quantity}</span>
//                       </Col>
//                       <Col md={3}>${item.price}</Col>
//                     </Row>
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//               <Link to="/cart">Edit</Link>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card>
//             <Card.Body>
//               <Card.Title>Order Summary</Card.Title>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Items</Col>
//                     <Col>${cart.itemsPrice.toFixed(2)}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Shipping</Col>
//                     <Col>${cart.shippingPrice.toFixed(2)}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Tax</Col>
//                     <Col>${cart.taxPrice.toFixed(2)}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>
//                       <strong> Order Total</strong>
//                     </Col>
//                     <Col>
//                       <strong>${cart.totalPrice.toFixed(2)}</strong>
//                     </Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <div className="d-grid">
//                     <Button
//                       type="button"
//                       onClick={placeOrderHandler}
//                       disabled={cart.cartItems.length === 0}
//                     >
//                       Place Order
//                     </Button>
//                   </div>
//                   {loading && <LoadingBox></LoadingBox>}
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }
