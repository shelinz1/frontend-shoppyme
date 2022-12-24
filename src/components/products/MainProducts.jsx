import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import Message from "../../components/ErrorMessage";
import {
  productDelete,
  productsList,
} from "../../redux/actions/productsActions";
import Toast from "../Toast";
import { toast } from "react-toastify";
import { ADMIN_PRODUCT_DELETE_RESET } from "../../redux/constants/productsTypes";
import "../../screens/HomeScreen/HomeScreen.css";
import Footer from "../Footer";
import Contact from "../Contact";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 5000,
};

function MainProducts() {
  const [searchProduct, setSearchProduct] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { searchproduct, pageNumber } = params;

  const adminProductsList = useSelector((state) => state.adminproductsList);
  const { products, error, loading } = adminProductsList;
  
  const adminProductDelete = useSelector((state) => state.productDelete);
  const { error: deleteError, success: deleteSuccess } = adminProductDelete;

  useEffect(() => {
    dispatch(productsList(searchproduct, pageNumber));
    if (deleteSuccess) {
      toast.info("product deleted", ToastObjects);
      dispatch({ type: ADMIN_PRODUCT_DELETE_RESET });
    }
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [dispatch, searchproduct, deleteSuccess, pageNumber]);

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(productDelete(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchProduct.trim()) {
      navigate(`/find/${searchProduct}`);
    }
  };

  return (
    <>
      <Toast />
      <div className="d-flex justify-content-between">
        <p style={{ fontSize: "1.5rem" }}>All products</p>
        <div>
          <Link to="/admin-addproducts" className="btn btn-primary btn-sm">
            Create New
          </Link>
        </div>
      </div>

      <div className="row gx-3">
        <div className=" col-lg-4 col-md-6 me-auto">
          <form onSubmit={handleSubmit} className="d-flex">
            <input
              type="text"
              className="form-control mb-2 mr-sm-2 m-1"
              placeholder="Search products"
              onChange={(e) => setSearchProduct(e.target.value)}
            />
            <button type="submit" className="btn btn-dark mb-2 m-1">
              Submit
            </button>
          </form>
        </div>
      </div>

      {deleteError && <Message error={deleteError} />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message error={error} />
      ) : (
        <>
          <div className="products">
            {products.map((product) => (
              <div className="column" key={product._id}>
                <section>
                  <div className="container">
                    <div className="cardy">
                      <div className="imageBox">
                        <img src={product.image} alt={product.image} />

                        <Link
                          to={`/admin-product/${product._id}`}
                          className="nav-link"
                        >
                          <p
                            style={{
                              fontSize: "1rem",
                              color: "#fff",
                              textTransform: "capitalize",
                              cursor: "pointer",
                            }}
                          >
                            {product.name}
                          </p>
                        </Link>
                      </div>

                      <div className="content">
                        <div className="row">
                          <Link
                            to={`/product/${product._id}/edit`}
                            className="col-md-6 btn btn-success"
                          >
                            <i className="fa fa-pen"></i>
                          </Link>
                          <Link
                            to="#"
                            className="col-md-6 btn btn-danger"
                            onClick={() => deleteProduct(product._id)}
                          >
                            <i className="fa fa-trash"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ))}
          </div>
        </>
      )}

      <Footer />
      <Contact />
    </>
  );
}

export default MainProducts;
