import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ordersList } from "../../redux/actions/orderActions.js";
import { productsList } from "../../redux/actions/productsActions.js";
import { usersList } from "../../redux/actions/userActions.js";
import Contact from "../Contact.jsx";
import Footer from "../Footer.jsx";
import GrandTotal from "./GrandTotal.jsx";
import NewestOrder from "./NewestOrder.jsx";

function Main() {
  const dispatch = useDispatch();
  const adminOrderList = useSelector((state) => state.adminOrdersList);
  const { loading, error, orders } = adminOrderList;

  const adminProductsList = useSelector((state) => state.adminproductsList);
  const { products } = adminProductsList;

  const adminUsersList = useSelector((state) => state.adminUsersList);
  const { users } = adminUsersList;
  
  useEffect(() => {
    dispatch(productsList());
    dispatch(ordersList());
    dispatch(usersList());
  }, [dispatch]);

  return (
    <>
      <section className="content-main">
        <p style={{ fontSize: "1.5rem" }}>Dashboard</p>
        <GrandTotal orders={orders} products={products} users={users} />
        {/* sale and product stats */}
        <div className="row">
          <div className="col-xl-6 col-lg-12">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <p className="card-title" style={{ fontWeight: "bold" }}>
                  Sale statistics
                </p>
                <iframe
                  style={{
                    background: "#ffffff",
                    border: "none",
                    boxShadow: "2px 10px 0 rgba(70, 76, 79, .2)",
                    borderRadius: "2px",
                    width: "100%",
                    height: "350px",
                  }}
                  title="sale stats"
                  src="https://charts.mongodb.com/charts-shoppy-me-xqkfr/embed/charts?id=630b8cec-2adb-457c-8e27-2d5197146190&maxDataAge=3600&theme=light&autoRefresh=true"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-12">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <p className="card-title" style={{ fontWeight: "bold" }}>
                  Product statistics
                </p>
                <iframe
                  style={{
                    background: "#ffffff",
                    border: "none",
                    boxShadow: "2px 10px 0 rgba(70, 76, 79, .2)",
                    borderRadius: "2px",
                    width: "100%",
                    height: "350px",
                  }}
                  title="product stats"
                  src="https://charts.mongodb.com/charts-shoppy-me-xqkfr/embed/charts?id=630b94be-2263-461f-8081-775731656259&maxDataAge=3600&theme=light&autoRefresh=true"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newest order */}
        <div className="card mb-4 shadow-sm">
          <NewestOrder loading={loading} error={error} orders={orders} />
        </div>{" "}
      </section>

      <Footer />
      <Contact />
    </>
  );
}

export default Main;
