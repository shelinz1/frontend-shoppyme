import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Toast from "../Toast";
import { toast } from "react-toastify";
import ErrorMessage from "../ErrorMessage";
import { ADMIN_PRODUCT_CREATE_RESET } from "../../redux/constants/productsTypes";
import { productAdd } from "../../redux/actions/productsActions";
import Loader from "../Spinner";
import Footer from "../Footer";
import Contact from "../Contact";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: true,
  autoClose: 5000,
  
};

function AddMainProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const adminproductAdd = useSelector((state) => state.addProduct);
  const { loading, product, error } = adminproductAdd;

  useEffect(() => {
    if (product) {
      toast.success("product Added", ToastObjects);
      dispatch({ type: ADMIN_PRODUCT_CREATE_RESET });
      setName("");
      setPrice(0);
      setCountInStock(0);
      setCategory("");
      setDescription("");
      setImage("");
    }
  }, [product, dispatch]);

  const addProduct = (e) => {
    e.preventDefault();
    dispatch(
      productAdd(name, price, countInStock, category, description, image)
    );
  };

  return (
    <>
      <Toast />
      <div className="d-flex justify-content-between">
        <p style={{ fontSize: "1.5rem" }}>Add products</p>
        <div>
          <Link to="/admin-products" className="btn btn-primary btn-sm">
            products
          </Link>
        </div>
      </div>
      <section className="content-main mx-auto" style={{ maxWidth: "500px" }}>
        {loading && <Loader />}
        {error && <ErrorMessage error={error} />}
        <form onSubmit={addProduct}>
          <div className="mb-4">
            <label htmlFor="product-title" className="form-label">
              Product name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter product name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="product-price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter product price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="product-in-stock" className="form-label">
              Product in stock
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter number in stock"
              required
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="product-description" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter product category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="product-description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter product description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="product-image" className="form-label">
              Image
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </section>

      <Footer />
      <Contact />
    </>
  );
}

export default AddMainProduct;
