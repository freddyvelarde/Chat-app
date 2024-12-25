import { useEffect } from "react";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setAuthValue } from "../redux/slices/auth";
import { IUser } from "../interfaces/user";

const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth.value);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
    console.log(`auth: ${auth}`);
  }, [auth]);

  const authUser = (token: string, user: IUser) => {
    dispatch(setAuthValue({ isAuth: true, token, user }));
  };
  const clearAuthUser = () => {
    dispatch(setAuthValue({ isAuth: false, token: "" }));
  };
  return {
    authUser,
    isAuth: auth.isAuth,
    clearAuthUser,
    token: auth.token,
    user: auth.user,
  };
};

export default useAuth;
