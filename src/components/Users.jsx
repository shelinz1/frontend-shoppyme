import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { usersList } from "../redux/actions/userActions";
import Footer from "./Footer";
import Contact from "./Contact";

function Users() {
  const [searchUser, setSearchUser] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const { searchuser } = params;

  const adminUsersList = useSelector((state) => state.adminUsersList);
  const { users, loading, error } = adminUsersList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersList(searchuser));
  }, [dispatch, searchuser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchUser.trim()) {
      navigate(`/search/user/${searchUser}`);
    }
  };

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <p style={{ fontSize: "1.5rem" }}>Customers</p>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <div className="row gx-3">
              <div className="col-lg-4 col-md-6 me-auto">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control mb-2 mr-sm-2"
                    placeholder="Search users"
                    onChange={(e) => setSearchUser(e.target.value)}
                  />
                  <button type="submit" className="btn btn-dark mb-2">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="card-body">
            {loading ? (
              <Loader />
            ) : error ? (
              <ErrorMessage error={error} />
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                {users.map((user) => (
                  <div className="col" key={user._id}>
                    <div className="card shadow-sm text-center m-2">
                      <div className="card-header">
                        <i className="fa-3x fa-solid fa-user"></i>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title mt-2 text-capitalize">
                          {user.name}
                        </h5>
                        <div className="card-text text-muted">
                          {user.isAdmin ? (
                            <p className="m-0">Admin</p>
                          ) : (
                            <p className="m-0">Customer</p>
                          )}
                          <p>
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <Contact />
    </>
  );
}

export default Users;
