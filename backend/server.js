import express from "express";
import authRoutes from "./routes/auth.route.js";

const app = express();
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/v1/auth", authRoutes);

app.listen(5000, () => {
    console.log("Server started on port at http://localhost:5000");
});