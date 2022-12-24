const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/products/",
    createProxyMiddleware({
      target: `${process.env.REACT_APP_ENDPOINT}`,
      changeOrigin: true,
    })
  );

  app.use(
    "/api/users/",
    createProxyMiddleware({
      target: `${process.env.REACT_APP_ENDPOINT}`,
      changeOrigin: true,
    })
  );

  app.use(
    "/api/orders/",
    createProxyMiddleware({
      target: `${process.env.REACT_APP_ENDPOINT}`,
      changeOrigin: true,
    })
  );

  app.use(
    "/api/password/",
    createProxyMiddleware({
      target: `${process.env.REACT_APP_ENDPOINT}`,
      changeOrigin: true,
    })
  );

  app.use(
    "/api/keys/paypal",
    createProxyMiddleware({
      target: `${process.env.REACT_APP_ENDPOINT}`,
      changeOrigin: true,
    })
  );
};
