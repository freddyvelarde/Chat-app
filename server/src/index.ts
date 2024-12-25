import { PORT, httpServer } from "./server";

httpServer.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
