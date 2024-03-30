import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const data = {
      email: email,
      password: password,
    };

    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      console.log(response.data);
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };
  return (
    <>
      <main className="flex-column justify-center items-center ">
        <video
          autoPlay
          muted
          controls={false}
          loop
          playsInline
          className="fixed inset-0 object-cover w-full h-full z-0"
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h1 className="text-center relative text-orange-200 font-bold text-4xl my-10 z-10">
          Login Form
        </h1>

        <div className="container relative mx-auto min-h-screen z-10">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <form className="" method="post">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block px-3 text-orange-200  font-bold mb-2"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    className="shadow appearance-none border rounded-3xl w-full py-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Email address"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block px-3 text-orange-200 font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="shadow appearance-none border rounded-3xl w-full py-5 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder=""
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    className="mr-2"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className=" text-orange-200"
                    htmlFor="flexCheckDefault"
                  >
                    Remember me
                  </label>
                </div>

                <div className="flex items-center justify-center text-center gap-4 font-bold text-xl">
                  <button
                    onClick={login}
                    className="bg-white text-black p-2 rounded-full w-1/2"
                  >
                    Login
                  </button>
                  <Link
                    to="/register"
                    className="bg-transparent text-white border-2 border-orange-200 p-2 rounded-full w-1/2"
                  >
                    Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
