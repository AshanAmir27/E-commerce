import customersRoute from '../modules/customers/customer.route.js'
import analyticsRoute from '../modules/analytics/analytics.route.js'
import ordersRoute from '../modules/orders/orders.route.js'

// routes/index.ts
export const registerRoutes = (app) => {
  app.use("/api/customers", customersRoute);
  app.use("/api/analytics", analyticsRoute)
  app.use("/api/orders", ordersRoute)
};