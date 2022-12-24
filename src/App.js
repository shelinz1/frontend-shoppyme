import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProductScreen from "./screens/ProductScreen/ProductScreen";
import CartScreen from "./screens/CartScreen/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentMethod from "./screens/PaymentMethod";
import PlaceOrderScreen from "./screens/placeOrderScreen/PlaceOrderScreen";
import NotFound from "./screens/NotFound/NotFound";
import OrderScreen from "./screens/OrderScreen/OrderScreen";
import OrderHistory from "./screens/orderHistory/OrderHistory";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./PrivateRoute";
import AdminPrivateRoute from "./AdminPrivateRoute";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";

// ADMIN ROUTES
import AdminProductScreen from "./screens/AdminProductScreen";
import EditProduct from "./screens/EditProduct";
import AddProduct from "./screens/AddProduct";
import UserScreen from "./screens/UserScreen";
import AdminOrderScreen from "./screens/AdminOrderScreen";
import AdminOrderDetailScreen from "./screens/AdminOrderDetailScreen";
import AdminHomeScreen from "./screens/AdminHomeScreen";
import ProductDetailsMain from "./components/products/ProductDetailsMain";

function App() {
  return (
    <Router>
      <div className="App ui container">
        <Header />

        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/search/:keyword" element={<HomeScreen />} />
          <Route path="/page/:pagenumber" element={<HomeScreen />} />
          <Route
            path="/search/:keyword/page/:pagenumber"
            element={<HomeScreen />}
          />

          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route
            path="/shipping"
            element={
              <PrivateRoute>
                <ShippingScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <PrivateRoute>
                <PaymentMethod />
              </PrivateRoute>
            }
          />
          <Route
            path="/placeorder"
            element={
              <PrivateRoute>
                <PlaceOrderScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <PrivateRoute>
                <OrderScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/Orderhistory"
            element={
              <PrivateRoute>
                <OrderHistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfileScreen />
              </PrivateRoute>
            }
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/products/:id" element={<ProductScreen />} />

          <Route path="/cart">
            <Route
              index
              element={
                <PrivateRoute>
                  <CartScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart/:id"
              element={
                <PrivateRoute>
                  <CartScreen />
                </PrivateRoute>
              }
            />
          </Route>

          {/* Start Admin routes */}
          <Route
            path="/dashboard"
            element={
              <AdminPrivateRoute>
                <AdminHomeScreen />
              </AdminPrivateRoute>
            }
          />

          <Route
            path="/admin-products"
            element={
              <AdminPrivateRoute>
                <AdminProductScreen />
              </AdminPrivateRoute>
            }
          />

          <Route
            path="/find/:searchproduct"
            element={
              <AdminPrivateRoute>
                <AdminProductScreen />
              </AdminPrivateRoute>
            }
          />

          <Route path="/search/:keyword" element={<HomeScreen />} />

          <Route
            path="/product/:id/edit"
            element={
              <AdminPrivateRoute>
                <EditProduct />
              </AdminPrivateRoute>
            }
          />

          <Route
            path="/admin-addproducts"
            element={
              <AdminPrivateRoute>
                <AddProduct />
              </AdminPrivateRoute>
            }
          />

          <Route
            path="/users"
            element={
              <AdminPrivateRoute>
                <UserScreen />
              </AdminPrivateRoute>
            }
          />

          <Route
            path="/search/user/:searchuser"
            element={
              <AdminPrivateRoute>
                <UserScreen />
              </AdminPrivateRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <AdminPrivateRoute>
                <AdminOrderScreen />
              </AdminPrivateRoute>
            }
          />

          <Route
            path="/admin-order/:id"
            element={
              <AdminPrivateRoute>
                <AdminOrderDetailScreen />
              </AdminPrivateRoute>
            }
          />

          <Route
            path="/admin-product/:id"
            element={
              <AdminPrivateRoute>
                <ProductDetailsMain />
              </AdminPrivateRoute>
            }
          />

          {/* End of Admin route */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
