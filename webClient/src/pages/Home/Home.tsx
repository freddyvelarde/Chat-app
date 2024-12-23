import useAuth from "../../hooks/useAuth";

function Home() {
  const { clearAuthUser } = useAuth();
  return (
    <>
      <h1>Starting the web client project</h1>
      <button onClick={clearAuthUser}>Log out</button>
    </>
  );
}

export default Home;
