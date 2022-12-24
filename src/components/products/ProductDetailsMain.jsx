import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import { productDetail } from "../../redux/actions/productsActions";

function ProductDetailsMain() {
  const adminProductDetails = useSelector((state) => state.detailProduct);
  const { product, loading, error } = adminProductDetails;

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(productDetail(id));
  }, [dispatch, id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          {" "}
          <Link to={"/admin-products"} className="btn btn-dark">
            Go back
          </Link>
          <div className="row m-3 single-product">
            <div className="col-sm-6 bg-light">
              <div className="single-image text-center mt-5">
                <img className="" src={product.image} alt={product.image} />
              </div>
            </div>
            <div className="col-sm-6 bg-secondary text-white text-center pt-3 product-info-admin mt-5">
              <div>
                <p>
                  <strong>NAME</strong> :{" "}
                  <span className="text-capitalize">{product.name}</span>
                </p>
              </div>

              <div>
                <p>
                  <strong>PRICE</strong> : <span>${product.price}</span>
                </p>
              </div>

              <div>
                <p>
                  <span className="text-capitalize">{product.description}</span>
                </p>
              </div>

              <div>
                <p>
                  {product.countInStock > 0 ? (
                    <span className="active">In stock</span>
                  ) : (
                    <span className="passive">Unavailable</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductDetailsMain;
