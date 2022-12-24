import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Steps from "../components/checkoutSteps/Steps";
import { cartPaymentMethod } from "../redux/actions/cartActions";
import SearchProducts from "../components/SearchProducts";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(cartPaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div>
      <SearchProducts />
      <Steps step1 step2 step3 />

      <form
        onSubmit={handleSubmit}
        style={{ width: "40rem", margin: "0 auto" }}
      >
        <div style={{ fontSize: "30px" }}>Payment method</div>

        <div className="form-check">
          <label className="form-check-label" htmlFor="Paypal">
            <input
              type="radio"
              className="form-check-input"
              id="Paypal"
              name="paymentMethod"
              value="Paypal"
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked
              required
            />
            Paypal
          </label>
        </div>

        <button type="submit" className="btn btn-dark">
          Continue
        </button>
      </form>

      <Footer />
      <Contact />
    </div>
  );
}

export default PaymentMethod;
