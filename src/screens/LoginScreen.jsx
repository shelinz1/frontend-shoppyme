import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import Message from "../components/ErrorMessage";
import validator from "validator";
import InlineErrors from "../components/InlineErrors";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLoginDetails = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLoginDetails;

  //submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(email, password);

    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(userLogin(email, password));
    }
  };

  //frontend form validation using validator
  const validate = (email, password) => {
    const errors = {};

    if (!email) {
      errors.email = "Email can't be empty.";
    } else if (!validator.isEmail(email)) {
      errors.email = "Invalid email.";
    }

    if (!password) {
      errors.password = "password can't be blank.";
    }

    return errors;
  };
  // const redirect = location.search ? location.search.split("=")[1] : "/";

  const { search } = useLocation();
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
        <div style={{ fontSize: "30px", textAlign: "center" }}>Login.</div>

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
            ""
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <InlineErrors text={errors.password} />}
        </div>

        <div className="field">
          <label />
          <button className="ui button secondary" type="submit">
            Login
          </button>
        </div>

        <div>
          <label />
          <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Forgot password? <Link to={`/forgot-password`}>Click here.</Link>
          </div>

          <div>
            <label />
            <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Don't have an account? <Link to={`/register`}>Register.</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
