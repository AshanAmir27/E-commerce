import customersRoute from '../routes/customers.routes.js'

// routes/index.ts
export const registerRoutes = (app) => {
  app.use("/api/customers", customersRoute);
};