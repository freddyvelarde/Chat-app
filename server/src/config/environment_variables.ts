import dotenv from "dotenv";
dotenv.config();
const { HOST_PORT, SECRET_KEY_JWT } = process.env;

const PORT = HOST_PORT || 7575;
const SECRET_KEY_JWT_VAR = SECRET_KEY_JWT || "secret_key :D";

export { PORT, SECRET_KEY_JWT_VAR };
