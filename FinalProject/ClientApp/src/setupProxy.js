const createProxyMiddleware = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:45336';

const context =  [
    "/weatherforecast",
    "/api/Auth/register",
    "api/Auth/login",
    "/api/Auth/getIfAdminOrUser",
    "/api/Account/getAllAccounts",
    "/api/Account/addAccount",
    "/api/Medicine/addMedicine",
    "/api/Medicine/getAllMedicine",
    "/api/Medicine/getMedicineById",
    "/api/Medicine/deleteMedicineById"    
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
