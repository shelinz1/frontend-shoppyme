import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
  userProfileDetails,
  userProfileUpdate,
} from "../redux/actions/userActions";
import { USER_PROFILE_UPDATE_RESET } from "../redux/constants/userTypes";
import Message from "../components/ErrorMessage";
import Toast from "../components/Toast";
import InlineErrors from "../components/InlineErrors";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const userLoginDetails = useSelector((state) => state.userLogin);
  const { userInfo } = userLoginDetails;

  const userDetails = useSelector((state) => state.userProfile);
  const { loading, error, user } = userDetails;

  const userUpdateDetails = useSelector((state) => state.userUpdateProfile);
  const { loading: UpdateLoading, error: updateError } = userUpdateDetails;

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = { password: "" };

    setErrors(errors);
    if (password !== confirmPassword) {
      errors.password = "passwords do no match.";
    } else if (password.length && confirmPassword.length < 6) {
      errors.password = "passwords must be 6 or more characters long.  ";
    } else {
      dispatch(userProfileUpdate({ userId: user._id, name, password }));
    }
  };

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_PROFILE_UPDATE_RESET });
      dispatch(userProfileDetails(userInfo._id));
    } else {
      setName(user.name);
    }
  }, [dispatch, userInfo._id, user]);

  return (
    <>
      <Toast />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message error={error} />
      ) : (
        <div style={{ marginTop: "2rem" }}>
          <form
            className="ui form"
            onSubmit={handleSubmit}
            style={{ width: "40rem", margin: "0 auto" }}
          >
            <div style={{ fontSize: "30px", textAlign: "center" }}>
              User Profile
            </div>
            <>
              {UpdateLoading && (
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    backgroundColor: "#a9a9a9",
                    padding: "0.7rem",
                    margin: "0.7rem",
                    border: "0.1rem solid transparent",
                    borderRadius: "0.5rem",
                  }}
                >
                  <i className="fa-solid fa-cog fa-spin fa-spin-reverse"></i>{" "}
                  Loading...
                </div>
              )}

              {updateError && <Message error={updateError} />}
            </>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {errors.password && <InlineErrors text={errors.password} />}
            </div>

            <div className="field">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                name="password"
                placeholder="Confirm your password"
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
              {errors.password && (
                <InlineErrors text={errors.confirmPassword} />
              )}
            </div>

            <div>
              <label />
              <button className="ui button secondary" type="submit">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      )}

      <Footer />
      <Contact />
    </>
  );
};

export default ProfileScreen;
