import dotenv from "dotenv";
dotenv.config();
const { HOST_PORT, SECRET_KEY_JWT, MODE, PROD_URL, DEV_URL } = process.env;

const PORT = HOST_PORT || 7575;
const SECRET_KEY_JWT_VAR = SECRET_KEY_JWT || "secret_key :D";

const _URL = MODE == "development" || !MODE ? DEV_URL : PROD_URL;

export { PORT, SECRET_KEY_JWT_VAR, _URL };
