import React, { useEffect } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, removeCartItem } from "../../redux/actions/cartActions";
import "./CartScreen.css";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";

function CartScreen() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const { id } = params;
  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get("quantity");
  const quantity = qtyInUrl ? Number(qtyInUrl) : 1;

  useEffect(() => {
    if (id) {
      dispatch(addCartItem(id, quantity));
    }
  }, [dispatch, id, quantity]);

  const goShopping = () => {
    navigate("/");
  };

  const deleteCartItem = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkOut = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="cartItems">
        <h3 className="cart-length">My Cart({cartItems.length})</h3>
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <img
              src="https://res.cloudinary.com/dponl1fls/image/upload/v1665924726/shopping-cart-3d-render-icon-removebg-preview_abxcja.png"
              alt="Empty cart"
            />
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div className="cartitem" key={item.product}>
                <span
                  className="deleteCart"
                  onClick={() => deleteCartItem(item.product)}
                >
                  x
                </span>
                <div className="cart-product">
                  <div className="product-description">
                    <img
                      src={item.image}
                      alt={item.image}
                      style={{ width: "10rem" }}
                      className="cart-image"
                    />
                  </div>

                  <div className="description">
                    <Link to={`/products/${item.product}`} className="nav-link">
                      <p className="product-name">{item.name}</p>
                    </Link>
                  </div>

                  <div className="quantity">
                    <h6>QUANTITY</h6>
                    <select
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addCartItem(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="subtotal">
                    <h6>PRICE</h6>
                    <span className="price">${item.price}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="total">
              Total:$
              {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
            </div>
          </>
        )}

        <div className="choice">
          <div
            className="ui vertical animated button secondary goShopping"
            tabIndex="0"
            onClick={goShopping}
          >
            <div className="hidden content gfa-2x">
              <i className="fa-solid fa-basket-shopping"></i>
            </div>
            <div className="visible content">GO SHOPPING</div>
          </div>

          <button
            type="button"
            className="ui button primary"
            onClick={checkOut}
            disabled={cartItems.length === 0}
          >
            CHECKOUT
          </button>
        </div>
      </div>

      <Footer />
      <Contact />
    </>
  );
}

export default CartScreen;
