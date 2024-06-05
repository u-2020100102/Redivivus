import { useNavigate } from "react-router-dom";
import useAuthToken from "../hooks/useAuthToken";
import { useEffect } from "react";

const Login = () => {
  const hasToken = useAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (hasToken) {
      navigate("/");
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const newForm = new FormData(event.target);
    await fetch("https://localhost:7082/Users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: newForm.get("userName"),
        password: newForm.get("password"),
      }),
    }).then(async (res) => {
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.id);
        navigate("/");
      }
    });
  }

  return (
    <div className="w-full h-full bg-slate-100 flex flex-wrap content-center justify-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <form
            className="flex flex-col justify-start gap-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Your name"
              class="input input-bordered w-full max-w-xs"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              class="input input-bordered w-full max-w-xs"
            />
            <input className="btn btn-primary" type="submit" />
          </form>
          <button
            className="btn btn-secondary"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
