import express from "express";
import authRoutes from "./routes/auth.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());
app.use("/api/v1/auth", authRoutes);

// Connect to DB first, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on port at http://localhost:" + PORT);
  });
});
