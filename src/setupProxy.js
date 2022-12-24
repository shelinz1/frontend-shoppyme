const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/products/",
    createProxyMiddleware({
      target: "https://shoppyme-shadrach-api.onrender.com/",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/users/",
    createProxyMiddleware({
      target: "https://shoppyme-shadrach-api.onrender.com/",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/orders/",
    createProxyMiddleware({
      target: "https://shoppyme-shadrach-api.onrender.com/",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/password/",
    createProxyMiddleware({
      target: "https://shoppyme-shadrach-api.onrender.com/",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/keys/paypal",
    createProxyMiddleware({
      target: "https://shoppyme-shadrach-api.onrender.com/",
      changeOrigin: true,
    })
  );
};
