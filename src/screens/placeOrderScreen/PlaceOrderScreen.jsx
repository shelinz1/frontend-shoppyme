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
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    productsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = cart;

  const calculatedDecimal = (number) => {
    return Math.round((number * 100) / 100).toFixed(2);
  };

  cart.productsPrice = calculatedDecimal(
    cartItems.reduce((total, value) => total + value.quantity * value.price, 0)
  );

  cart.shippingPrice =
    cart.productsPrice > 100 ? calculatedDecimal(0) : calculatedDecimal(10);

  cart.taxPrice = calculatedDecimal(0.15 * cart.productsPrice);

  cart.totalPrice = (
    Number(cart.productsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const goShopping = () => {
    navigate("/");
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: CREATE_ORDER_RESET });
    }
  }, [success, dispatch, navigate, order]);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderProducts: cartItems,
        shippingAddress,
        paymentMethod,
        productsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
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
              <strong>{shippingAddress.country}</strong>
            </p>
            <p>
              <strong>Payment Method</strong>: <strong>{paymentMethod}</strong>
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
              <strong>{shippingAddress.address}</strong>
            </p>
            <p>
              <strong>Postal code</strong>:{" "}
              <strong>{shippingAddress.postalCode}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="ui stackable grid orderDetails">
        <div className="ten wide column">
          {cartItems.length === 0 ? (
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
              {cartItems.map((item) => (
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
                <td>$ {productsPrice}</td>
              </tr>
              <tr>
                <td>Shipping Price</td>
                <td>$ {shippingPrice}</td>
              </tr>

              <tr>
                <td>Tax price</td>
                <td>$ {taxPrice}</td>
              </tr>

              <tr>
                <td>Total price</td>
                <td>
                  <strong>$ {totalPrice}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            className="ui button primary"
            onClick={placeOrderHandler}
            disabled={cartItems.length === 0}
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
