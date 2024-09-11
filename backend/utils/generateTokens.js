import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  try {
    // Generate the JWT token
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {
      expiresIn: "15d",
    });

    // Set the token as an HTTP-only cookie
    res.cookie("jwt-netflix", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
      httpOnly: true,
      sameSite: "Lax", // Corrected value for sameSite
      secure: ENV_VARS.NODE_ENV === "production", // Secure only in production
    });

    return token;
  } catch (error) {
    console.error("Error generating token or setting cookie:", error.message);
    throw new Error("Error generating token");
  }
};
