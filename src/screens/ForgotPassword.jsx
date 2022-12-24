import React, { useState } from "react";
import validator from "validator";
import InlineErrors from "../components/InlineErrors";
import { forgotPasswordUpdate } from "../redux/actions/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../components/Toast";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const forgotPasswordDetails = useSelector((state) => state.forgotPassword);
  const { loading } = forgotPasswordDetails;

  //frontend form validation using validator
  const validate = (email) => {
    const errors = {};

    if (!email) {
      errors.email = "Email can't be empty.";
    } else if (!validator.isEmail(email)) {
      errors.email = "Invalid email.";
    }

    return errors;
  };

  //submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(email);

    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(forgotPasswordUpdate(email));
    }
  };

  return (
    <>
      <Toast />
      <div style={{ marginTop: "2rem" }}>
        <form
          className="ui form"
          onSubmit={handleSubmit}
          style={{ width: "40rem", margin: "0 auto" }}
        >
          <div style={{ fontSize: "30px", textAlign: "center" }}>
            Reset password.
          </div>

          <div style={{ margin: "1rem" }}>
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
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <InlineErrors text={errors.email} />}
          </div>

          <div className="field">
            <label />
            <button className="ui button secondary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>

      <Footer />
      <Contact />
    </>
  );
}

export default ForgotPassword;
