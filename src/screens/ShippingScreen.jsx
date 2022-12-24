import React, { useMemo, useState } from "react";
import countryList from "react-select-country-list";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Steps from "../components/checkoutSteps/Steps";
import { cartShippingAddress } from "../redux/actions/cartActions";
import SearchProducts from "../components/SearchProducts";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

function ShippingScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [fullname, setFullname] = useState(shippingAddress.fullname || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostal] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country);

  const options = useMemo(() => countryList().getLabels(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      cartShippingAddress({ fullname, address, city, postalCode, country })
    );
    navigate("/payment");
  };

  return (
    <div>
      <SearchProducts />
      <Steps step1 step2 />

      <form
        className="ui form"
        onSubmit={handleSubmit}
        style={{ width: "40rem", margin: "0 auto" }}
      >
        <div style={{ fontSize: "30px", textAlign: "center" }}>
          Shipping Address
        </div>

        <div className="field">
          <label htmlFor="fullname">Fullname</label>
          <input
            type="text"
            name="fullname"
            placeholder="Enter fullname"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="country">Country</label>
          <select
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value="">Select...</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            placeholder="Enter city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="postal code">postal code</label>
          <input
            type="text"
            name="postal code"
            placeholder="Enter postal code"
            onChange={(e) => setPostal(e.target.value)}
            value={postalCode}
            required
          />
        </div>

        <div className="mt-3">
          <label />
          <button className="ui button secondary" type="submit">
            Continue
          </button>
        </div>
      </form>

      <Footer />
      <Contact />
    </div>
  );
}

export default ShippingScreen;
