import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { logInUser } from "../../config/endpoints";
import useAuth from "../../hooks/useAuth";

interface IForm {
  username: string;
  password: string;
}

const LogIn = () => {
  const [form, setForm] = useState<IForm>({ username: "", password: "" });
  const [response, setResponse] = useState<any>(null);
  const { authUser } = useAuth();

  const createNewUser = async ({ username, password }: IForm) => {
    const req = await fetch(logInUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const res = await req.json();
    setResponse(res);
  };

  const handleOnChangeEventUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, username: e.target.value });
  };
  const handleOnChangeEventPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, password: e.target.value });
  };

  const handleFormEvent = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewUser(form);
  };

  useEffect(() => {
    if (response && response.isAuth && response.token) {
      authUser(response.token);
    }
  }, [response]);

  return (
    <form action="" onSubmit={handleFormEvent}>
      <div>
        <label htmlFor="">Username:</label>
        <input
          type="text"
          value={form.username}
          onChange={handleOnChangeEventUsername}
          placeholder="Type your username"
        />
      </div>
      <div>
        <label htmlFor="">Password:</label>
        <input
          type="password"
          onChange={handleOnChangeEventPassword}
          value={form.password}
          placeholder="Type your password"
        />
      </div>
      <button>Create</button>
      <p>{response ? response.message : null}</p>
    </form>
  );
};

export default LogIn;
