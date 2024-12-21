import dotenv from "dotenv";
dotenv.config();
const { HOST_PORT } = process.env;

const PORT = HOST_PORT || 7575;

export { PORT };
