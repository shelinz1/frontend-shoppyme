import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/ErrorMessage";
import { deleteOrder, myOrderList } from "../../redux/actions/orderActions";
import moment from "moment";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";
import { ORDER_DELETE_RESET } from "../../redux/constants/orderTypes";
import { toast } from "react-toastify";
import Toast from "../../components/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 5000,
};

function OrderHistory() {
  const myListOfOrders = useSelector((state) => state.ordersList);
  const { error, loading, orders } = myListOfOrders;

  const deleteOrders = useSelector((state) => state.deleteOrders);
  const { success: deleteSuccess } = deleteOrders;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(myOrderList());
    if (deleteSuccess) {
      toast.success(`order has been deleted!!!`, ToastObjects);

      dispatch({ type: ORDER_DELETE_RESET });
    }
  }, [dispatch, deleteSuccess]);

  const goShopping = () => {
    navigate("/");
  };

  const removeOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order.?")) {
      dispatch(deleteOrder(orderId));
    }
  };

  return (
    <div>
      <Toast />
      <div style={{ fontSize: "30px" }}>Order history</div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message error={error} />
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="no-orders">
              <p>
                <strong>You do not have any order at the moment.</strong>
              </p>

              <div
                className="ui vertical animated button secondary goShopping"
                tabIndex="0"
                onClick={goShopping}
              >
                <div className="hidden content gfa-2x">
                  <i className="fa-solid fa-basket-shopping"></i>
                </div>{" "}
                <div className="visible content">GO SHOPPING</div>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">DATE</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">PAID</th>
                    <th scope="col">DELIVERED</th>
                    <th scope="col">ACTIONS</th>
                    <th scope="col">DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <b>
                          {order._id.toString().slice(0, 6) +
                            "..." +
                            order._id.toString().slice(-6)}
                        </b>
                      </td>
                      <td>
                        <b className="text-capitalize">
                          {" "}
                          {moment(order.createdAt).format("MMM Do YY")}
                        </b>
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
                        {order.isDelivered ? (
                          <span className="badge bg-success">
                            Delivered at{" "}
                            {moment(order.timeOfDelivery).format("MMM Do YY")}
                          </span>
                        ) : (
                          <span className="badge bg-danger">
                            Not delievered
                          </span>
                        )}
                      </td>
                      <td className="view-order">
                        <Link to={`/order/${order._id}`}>
                          <i className="text-secondary fas fa-eye"></i>
                        </Link>
                      </td>

                      <td
                        className="delete-order"
                        style={{ cursor: "pointer" }}
                      >
                        {order.isPaid ? (
                          ""
                        ) : (
                          <i
                            className="fa fa-trash text-danger"
                            onClick={() => removeOrder(order._id)}
                          ></i>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <Footer />
      <Contact />
    </div>
  );
}

export default OrderHistory;
