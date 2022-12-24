import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InlineErrors from "../components/InlineErrors";
import Message from "../components/ErrorMessage";
import { resetInfo, updatePassword } from "../redux/actions/ResetPassword";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import Toast from "../components/Toast";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 5000,
};

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetPasswordDetails = useSelector((state) => state.resetPassword);
  const { loading, error } = resetPasswordDetails;

  const updatePasswordDetails = useSelector((state) => state.updatePassword);
  const {
    user: updateUser,
    loading: updateLoading,
    error: updateError,
    success,
  } = updatePasswordDetails;
  console.log(updateUser);

  const { token } = useParams();

  //submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(password, confirmPassword);

    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(updatePassword(token, password));
      setPassword("");
      setConfirmPassword("");
      navigate('/')
    }
  };

  //frontend form validation using validator
  const validate = (password, confirmPassword) => {
    const errors = {};

    if (!password) {
      errors.password = "password can't be blank.";
    }

    if (password !== confirmPassword) {
      errors.password = "passwords do not match.";
      errors.confirmPassword = "passwords do not match.";
    }

    if (password.length < 6) {
      errors.password = "passwords must be 6 or  more characters long.";
    }

    return errors;
  };

  useEffect(() => {
    dispatch(resetInfo(token));
    if (success)
      toast.success("Password updated!!!. Try logging in again.", ToastObjects);
  }, [dispatch, token, success]);

  return (
    <>
      <Toast />
      <div style={{ fontSize: "30px", textAlign: "center" }}>
        Change password.
      </div>
      <div style={{ marginTop: "2rem" }}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message error={error} />
        ) : (
          <form
            className="ui form"
            onSubmit={handleSubmit}
            style={{ width: "40rem", margin: "0 auto" }}
          >
            {updateLoading ? (
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
            ) : updateError ? (
              <Message error={updateError} />
            ) : (
              ""
            )}

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <InlineErrors text={errors.password} />}
            </div>

            <div className="field">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <InlineErrors text={errors.confirmPassword} />
              )}
            </div>

            <button className="ui button secondary" type="submit">
              Update password
            </button>
          </form>
        )}
      </div>
      <Footer />
      <Contact />
    </>
  );
}

export default ResetPassword;
