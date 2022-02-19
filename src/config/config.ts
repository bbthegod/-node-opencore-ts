import dotenv from 'dotenv';

dotenv.config();

export const ENVIRONMENT = process.env.NODE_ENV || "";
export const PORT = process.env.PORT || 8000;
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const MASTER_SECRET = process.env.MASTER_SECRET || "";
export const MONGO_HOST = process.env.MONGO_HOST || "";
