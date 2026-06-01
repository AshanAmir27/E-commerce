import customersRoute from '../modules/customers/customer.route.js'

// routes/index.ts
export const registerRoutes = (app) => {
  app.use("/api/customers", customersRoute);
};