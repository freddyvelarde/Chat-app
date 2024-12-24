import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import LogIn from "./pages/LogIn/LogIn";
import useAuth from "./hooks/useAuth";
import Signup from "./pages/Signup/Signup";
import ChatRoom from "./pages/Chat/ChatRoom";

const useRouter = () => {
  const { isAuth } = useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuth ? <Home /> : <h1>You need to create an account</h1>,
    },
    { path: "/chat/:chatId", element: <ChatRoom /> },
    { path: "/login", element: <LogIn /> },
    { path: "/signup", element: <Signup /> },
  ]);

  return { router };
};

export default useRouter;
