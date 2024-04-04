import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { FidgetSpinner } from "react-loader-spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false); // State variable for loading

  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Set loading state to true when login button is clicked
    setLoading(true);

    const data = {
      email: email,
      password: password,
    };

    axios
      .post("https://api-quiz-app.onrender.com/auth/login", data)
      .then((response) => {
        console.log(response.data);
        if (response.data.error) {
          alert(response.data.error);
          setLoading(false); // Set loading to false on error
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        // Set loading to false on error
        setLoading(false);
      });
  };

  return (
    <>
      {loading && (
        <div className="absolute inset-0 h-full bg-black bg-opacity-75 z-50 flex gap-4 flex-col justify-center items-center">
          <FidgetSpinner
            visible={true}
            height={80}
            backgroundColor="#c28f33"
            width={80}
            ariaLabel="fidget-spinner-loading"
            wrapperStyle={{}}
            wrapperClass="fidget-spinner-wrapper"
          />
          <p className="text-white  text-xl">Please wait ..</p>
        </div>
      )}
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
                    placeholder="Password"
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
                    className="bg-[#235785] transition hover:border-black hover:bg-[#c28f33] border text-white font-bold p-2 rounded-full w-1/2"
                  >
                    Login
                  </button>
                  <Link
                    to="/register"
                    className="bg-zinc-800 transition bg-opacity-70 text-white hover:border-black  hover:bg-[#c28f33] rounded-full font-bold border-2 border-orange-200 p-2 rounded-full w-1/2"
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
