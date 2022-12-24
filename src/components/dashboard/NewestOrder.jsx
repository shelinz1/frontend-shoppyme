import React from "react";
import Spinner from "../Spinner"
import ErrorMessage from "../ErrorMessage";
import moment from "moment";
import { Link } from "react-router-dom";

function NewestOrder({ loading, error, orders }) {
  return (
    <div className="card-body">
      <h6 className="card-title">Latest orders</h6>
      {loading ? (
        <Spinner />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id}>
                  <td>
                    <b className="text-capitalize">{order.user.name}</b>
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
                        {moment(order.timeOfPayment).format("MMM Do YY")}
                      </span>
                    ) : (
                      <span className="badge bg-danger">Not paid</span>
                    )}
                  </td>
                  <td>
                    <b> {moment(order.createdAt).format("MMM Do YY")}</b>
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <span className="badge bg-success">
                        Delivered at{" "}
                        {moment(order.timeOfDelivery).format("MMM Do YY")}
                      </span>
                    ) : (
                      <span className="badge bg-danger">Not delievered</span>
                    )}
                  </td>

                  <td className="d-flex justify-content-center align-items-center">
                    <Link to={`/admin-order/${order._id}`}>
                      <i className="fas fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default NewestOrder;
