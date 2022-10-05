const createProxyMiddleware = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:45336';

const context =  [
    "/weatherforecast",
    "/api/Auth/register",
    "api/Auth/login",
    "/api/Auth/getIfAdminOrUser",
    "/api/Auth/getUserId",
    "/api/Account/getAllAccounts",
    "/api/Account/addAccount",
    "/api/Medicine/getAccountById",
    "/api/Account/updateAccount",
    "/api/Medicine/addMedicine",
    "/api/Medicine/getAllMedicine",
    "/api/Medicine/getMedicineById",
    "/api/Medicine/deleteMedicineById",
    "/api/Medicine/getMedicineByUses",
    "/api/Cart/addToCart",
    "/api/Cart/removeFromCartByUserId",
    "/api/Cart/getCartByUserId",
    "/api/Order/checkOut",
    "/api/Order/getOrderByUserId",
    "/api/Order/generateReports"

];

module.exports = function(app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};
