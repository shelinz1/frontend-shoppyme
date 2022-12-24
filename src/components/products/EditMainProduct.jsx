import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Toast from "../Toast";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { ADMIN_PRODUCT_UPDATE_RESET } from "../../redux/constants/productsTypes";
import {
  productEdit,
  productUpdate,
} from "../../redux/actions/productsActions";
import Footer from "../Footer";
import Contact from "../Contact";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 5000,
};

function EditMainProduct({ id }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const adminproductEdit = useSelector((state) => state.editProduct);
  const { product } = adminproductEdit;

  const adminproductUpdate = useSelector((state) => state.updateProduct);
  const {
    loading: loadingUpdate,
    success,
    error: errorUpdate,
  } = adminproductUpdate;

  useEffect(() => {
    if (success) {
      dispatch({ type: ADMIN_PRODUCT_UPDATE_RESET });
      toast.success("Product updated successfully", ToastObjects);
    } else {
      if (!product.name || product._id !== id) {
        dispatch(productEdit(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setCountInStock(product.countInStock);
        setCategory(product.category);
        setDescription(product.description);
        setImage(product.image);
      }
    }
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [product, dispatch, id, success]);

  const updateProduct = (e) => {
    e.preventDefault();
    dispatch(
      productUpdate({
        _id: id,
        name,
        price,
        countInStock,
        category,
        description,
        image,
      })
    );
  };

  return (
    <>
      <Toast />
      <div className="d-flex justify-content-between">
        <p style={{ fontSize: "1.5rem" }}>Update product</p>
        <div>
          <Link to="/admin-products" className="btn btn-primary btn-sm">
            products
          </Link>
        </div>
      </div>
      <section className="content-main mx-auto" style={{ maxWidth: "500px" }}>
        {loadingUpdate && <Spinner />}
        {errorUpdate && <ErrorMessage error={errorUpdate} />}
        <form onSubmit={updateProduct}>
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

export default EditMainProduct;
