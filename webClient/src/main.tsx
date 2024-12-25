// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import useRouter from "./routers";
// import { MODE } from "./config/env_variable";
// import useListenMessages from "./hooks/useListenMessages";

const App = () => {
  const { router } = useRouter();
  // useListenMessages();

  return <RouterProvider router={router} />;
};

// if (MODE == "development") {
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
// } else if (MODE == "production") {
//   createRoot(document.getElementById("root")!).render(
//     <StrictMode>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </StrictMode>,
//   );
// }
