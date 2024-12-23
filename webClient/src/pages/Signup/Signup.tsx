import { ChangeEvent, SyntheticEvent, useState } from "react";
import { signup } from "../../config/endpoints";
// import useAuth from "../../hooks/useAuth";

interface IForm {
  username: string;
  password: string;
  repeatPassword: string;
}

const Signup = () => {
  const [form, setForm] = useState<IForm>({
    username: "",
    password: "",
    repeatPassword: "",
  });
  const [response, setResponse] = useState<any>(null);
  // const { authUser } = useAuth();

  const createNewUser = async ({ username, password }: IForm) => {
    const req = await fetch(signup, {
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
  const handleOnChangeEventRepeatPassword = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setForm({ ...form, repeatPassword: e.target.value });
  };

  const handleFormEvent = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.repeatPassword) {
      console.log("Your password doesn't match");
      return;
    }
    console.log(form);

    createNewUser(form);
  };

  // useEffect(() => {
  //   if (response && response.isAuth) {
  //     authUser(response.token);
  //   }
  // }, [response]);

  return (
    <form onSubmit={handleFormEvent}>
      <div>
        <label htmlFor="">Username:</label>
        <input
          type="text"
          value={form.username}
          onChange={handleOnChangeEventUsername}
          placeholder="Type your username"
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="">Password:</label>
        <input
          type="password"
          onChange={handleOnChangeEventPassword}
          value={form.password}
          placeholder="Type your password"
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="">Repeat Password:</label>
        <input
          type="password"
          onChange={handleOnChangeEventRepeatPassword}
          value={form.repeatPassword}
          placeholder="Type your password"
          autoComplete="off"
        />
      </div>
      <button>Create</button>
      <p>{response ? response.message : null}</p>
    </form>
  );
};

export default Signup;
