import { useEffect } from "react";
import Loader from "../../components/Loader";
import Message from "../../components/ErrorMessage";
import { useSelector, useDispatch } from "react-redux";
import { productLists } from "../../redux/actions/productsActions";
import "./HomeScreen.css";
import { Link, useParams } from "react-router-dom";
import Rating from "../../components/Rating";
import Footer from "../../components/Footer";
import SearchProducts from "../../components/SearchProducts";
import Pagination from "../../components/Pagination";
import Contact from "../../components/Contact";

function HomeScreen() {
  const dispatch = useDispatch();
  const params = useParams();
  const { keyword, pagenumber } = params;

  const productsList = useSelector((state) => state.productsList);
  const { loading, error, products, pages, page } = productsList;

  useEffect(() => {
    dispatch(productLists(keyword, pagenumber));
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [dispatch, keyword, pagenumber]);

  return (
    <div>
      <SearchProducts />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message error={error} />
      ) : (
        <div className="products">
          {products.map((product) => (
            <div className="column" key={product._id}>
              <Link to={`/products/${product._id}`} className="nav-link">
                <section>
                  <div className="container">
                    <div className="cardy">
                      <div className="imageBox">
                        <img src={product.image} alt={product.image} />
                        <p
                          style={{
                            fontSize: "1rem",
                            color: "#fff",
                            textTransform: "capitalize",
                            textDecoration: "none",
                          }}
                        >
                          {product.name}
                        </p>
                      </div>

                      <div className="content">
                        {product.numReviews === 0 ? (
                          <div
                            style={{
                              color: "#fff",
                              paddingLeft: "0.5rem",
                              fontWeight: "bold",
                            }}
                          >
                            0 reviews
                          </div>
                        ) : (
                          <div className="rating">
                            <Rating
                              rating={product.rating}
                              numReviews={product.numReviews}
                            />
                          </div>
                        )}

                        <div className="price">${product.price}</div>
                      </div>
                    </div>
                  </div>
                </section>
              </Link>
            </div>
          ))}
        </div>
      )}
      <Pagination page={page} pages={pages} keyword={keyword ? keyword : ""} />
      <Footer />
      <Contact />
    </div>
  );
}

export default HomeScreen;
