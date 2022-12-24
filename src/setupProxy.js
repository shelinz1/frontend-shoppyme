const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/products/",
    createProxyMiddleware({
      target: "http://localhost:5000/",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/users/",
    createProxyMiddleware({
      target: "http://localhost:5000/",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/orders/",
    createProxyMiddleware({
      target: "http://localhost:5000/",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/password/",
    createProxyMiddleware({
      target: "http://localhost:5000/",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/keys/paypal",
    createProxyMiddleware({
      target: "http://localhost:5000/",
      changeOrigin: true,
    })
  );
};
