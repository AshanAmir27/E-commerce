// server.ts
import app from "./app.js";
import pool from '../src/database/index.js'

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Database connection
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();

    // server start
    const server = app.listen(PORT, ()=> {
      console.log(`Server running on port ${PORT}`);
    })

    // Graceful shutdown
    const shutdown = () => {
      console.log("Shutting down server...")

      server.close(async () => {
        console.log('HTTP server closed');

        try {
          await pool.end();
          console.log('Database pool closed');
        } catch (error) {
          console.error(`Error closing DB pool: ${error.message}`);
        }
        process.exit(0);
      });

      setTimeout(()=>process.exit(1), 10000);
    };

    // shutdown handlers
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);

  } catch (error) {
    console.error("Failed to connect to database", error.message);
    process.exit(1);
  }
};

startServer();