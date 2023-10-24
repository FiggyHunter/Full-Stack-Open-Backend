import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.DB_TWO;

export const PORT = 3777;
