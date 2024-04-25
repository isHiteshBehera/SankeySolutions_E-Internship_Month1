import "reflect-metadata"; // Import this line at the top of your file
import { createConnection } from "typeorm";
import express from "express";
import { User } from "./entities/User"; // Import your TypeORM entities

const app = express();

createConnection().then(async () => {
  console.log("Connected to the database");

  // Your other Express.js configurations and routes here

  // Example route to fetch all users from the database
  app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error("Database connection error:", error);
});
