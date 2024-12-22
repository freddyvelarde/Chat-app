import { useEffect } from "react";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setAuthValue } from "../redux/slices/auth";

const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth.value);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
    console.log(`auth: ${auth}`);
  }, [auth]);

  const authUser = (token: string) => {
    dispatch(setAuthValue({ isAuth: true, token }));
  };
  return { authUser };
};

export default useAuth;
