import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import Message from "../components/ErrorMessage";
import validator from "validator";
import InlineErrors from "../components/InlineErrors";

const Register = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();

  const userRegisterDetails = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegisterDetails;

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  //destructure form values so as to dispatch userRegister action
  const { name, email, password1 } = formValues;

  //submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);

    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(userRegister(name, email, password1));
    }
  };

  //frontend form validation using validator
  const validate = (formValues) => {
    const errors = {};

    if (!email) {
      errors.email = "Email can't be empty.";
    } else if (!validator.isEmail(email)) {
      errors.email = "Invalid email.";
    }

    if (!formValues.password1) {
      errors.password1 = "password can't be blank";
    }

    if (formValues.password1 !== formValues.password2) {
      errors.password1 = "passwords do not match";
      errors.password2 = "passwords do not match";
    }

    if (formValues.password1.length < 6) {
      errors.password1 = "passwords must be 6 or  more characters long.";
    }

    return errors;
  };

  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  return (
    <div style={{ marginTop: "2rem" }}>
      <form
        className="ui form"
        onSubmit={handleSubmit}
        style={{ width: "40rem", margin: "0 auto" }}
      >
        <div style={{ fontSize: "30px", textAlign: "center" }}>
          Create an account.
        </div>
        <div style={{ margin: "2rem" }}>
          {loading ? (
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
          ) : error ? (
            <Message error={error} />
          ) : (
            " "
          )}
        </div>

        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="john doe"
            value={formValues.name}
            onChange={onChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="example@example.com"
            value={formValues.email}
            onChange={onChange}
            // required
          />
          {errors.email && <InlineErrors text={errors.email} />}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password1"
            placeholder="Enter password"
            value={formValues.password1}
            onChange={onChange}
          />
          {errors.password1 && <InlineErrors text={errors.password1} />}
        </div>

        <div className="field">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="password2"
            placeholder="Confirm your password"
            value={formValues.password2}
            onChange={onChange}
          />
          {errors.password2 && <InlineErrors text={errors.password2} />}
        </div>

        <button className="ui button secondary" type="submit">
          Register
        </button>

        <div>
          <label />
          <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Already have an account?{" "}
            <Link to={`/login?redirect=${redirect}`}>Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
