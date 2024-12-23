import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
// import router from "./routers";
// import App from "./Home.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import useRouter from "./routers";

const App = () => {
  const { router } = useRouter();

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
