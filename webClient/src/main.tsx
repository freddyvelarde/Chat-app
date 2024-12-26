// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import useRouter from "./routers";
import { ThemeProvider } from "styled-components";
import { darkColors } from "./styles/colors";
import GlobalStyle from "./styles/GlobalStyles";

const App = () => {
  const { router } = useRouter();
  return (
    <ThemeProvider theme={darkColors}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
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
