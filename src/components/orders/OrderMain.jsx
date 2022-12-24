import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import moment from "moment";
import { Link } from "react-router-dom";
import { ordersList } from "../../redux/actions/orderActions";
import Footer from "../Footer";
import Contact from "../Contact";

function OrderMain() {
  const dispatch = useDispatch();
  const params = useParams();
  const { searchorder } = params;

  const adminOrderList = useSelector((state) => state.adminOrdersList);
  const { loading, error, orders } = adminOrderList;

  useEffect(() => {
    dispatch(ordersList(searchorder));
  }, [dispatch, searchorder]);

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <p style={{ fontSize: "1.5rem" }}>Orders</p>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <div className="table-responsive">
              {loading ? (
                <Loader />
              ) : error ? (
                <ErrorMessage error={error} />
              ) : (
                <div className="">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Total</th>
                        <th scope="col">Paid</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length === 0 ? (
                        <>
                          <tr>
                            <td
                              style={{
                                fontWeight: "bold",
                                fontSize: "1rem",
                                color: "red",
                              }}
                            >
                              <b>There is no order at the moment.</b>
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          {orders.map((order) => (
                            <tr key={order._id}>
                              <td>
                                <b className="text-capitalize">
                                  {order.user.name}
                                </b>
                              </td>

                              <td>
                                <b>{order.user.email}</b>
                              </td>

                              <td>
                                <b>${order.totalPrice}</b>
                              </td>

                              <td>
                                {order.isPaid ? (
                                  <span className="badge bg-success">
                                    Paid on{" "}
                                    {moment(order.timeOfPayment).format(
                                      "MMM Do YY"
                                    )}
                                  </span>
                                ) : (
                                  <span className="badge bg-danger">
                                    Not paid
                                  </span>
                                )}
                              </td>

                              <td>
                                <b>
                                  {" "}
                                  {moment(order.createdAt).format("MMM Do YY")}
                                </b>
                              </td>

                              <td>
                                {order.isDelivered ? (
                                  <span className="badge bg-success">
                                    Delivered at{" "}
                                    {moment(order.timeOfDelivery).format(
                                      "MMM Do YY"
                                    )}
                                  </span>
                                ) : (
                                  <span className="badge bg-danger">
                                    Not delievered
                                  </span>
                                )}
                              </td>

                              <td className="d-flex justify-content-center align-items-center">
                                <Link to={`/admin-order/${order._id}`}>
                                  <i className="fas fa-eye"></i>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Contact />
    </>
  );
}

export default OrderMain;
