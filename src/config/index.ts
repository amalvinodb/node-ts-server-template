import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const { DATABASE_STR } = process.env;
export const { ORIGIN } = process.env;
