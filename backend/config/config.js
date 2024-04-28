import { config } from "dotenv";

config();

export const port = process.env.PORT || "8000";
export const dbUrl = process.env.DB_URL || "mongodb://0.0.0.0:27017/DB_URL";

export const apiVersion = process.env.API_VERSION || "/api/v1";

export const fromEmail = process.env.FROM_EMAIL;

export const fromPassword = process.env.FROM_PASSWORD;

export const emailHost = process.env.EMAIL_HOST;

export const emailName = process.env.EMAIL_NAME;

export const clientBaseUrl =
  process.env.CLIENT_BASE_URL || "http://localhost:3000";

export const secretKey = process.env.SECRET_KEY;

export const expiryIn = process.env.EXPIRY_IN;

export const resetExpiryIn = process.env.RESET_EXPIRY_IN;

export const verifyExpiryIn = process.env.VERIFY_EMAIL_EXPIRY_IN;

export const tokenTypes = {
  ACCESS: "access",
  RESET_PASSWORD: "resetPassword",
  VERIFY_EMAIL: "verifyEmail",
};
