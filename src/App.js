import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"; // Remove Switch from import
import Home from "./pages/Home";
import Login from "./pages/login";
import { AuthContext } from "./helpers/AuthContext";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./App.css";
import Register from "./pages/Register";
import About from "./pages/About";
import Question from "./pages/Question";
import Quiz from "./pages/Quiz";
import QuizInfo from "./pages/QuizInfo";
import { QuizContext } from "./helpers/QuizContext";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });


 
  const [dropdownOpen, setDropdownOpen] = useState(false); // Define dropdownOpen state
  

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    setDropdownOpen(false); // Close dropdown on logout
    window.location.href = "/";
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log("ppp", response.data);
        if (response.data.error) {
          setAuthState({ username: "", id: 0, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <div className="bg-black">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="sticky h-full flex items-center text-white justify-between py-2 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-md bg-black bg-opacity-50 m-5 rounded-md z-10">
            <div className="md:hidden lg:flex w-1/3">
              <Link
                to="/"
                className="text-sm bg-black rounded-md p-1 font-semibold flex items-center justify-center"
              >
                <img src="/bxs-graduation.svg" alt="Icon" />
                <span>BizMathPro</span>
              </Link>
            </div>

            <Link to="/about"> About</Link>
            <Link to="/quiz">Quiz</Link>
            {!authState.status ? (
              <>
                <Link to="/login"> Login</Link>
                {/* {/<Link to="/register"> Register</Link>/} */}
              </>
            ) : (
              <div className="relative">
                <button className="text-white focus:outline-none" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  {authState.username}
                  <svg className="h-5 w-5 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#334155] rounded-lg shadow-lg z-10">
                    <button onClick={logout} className="block px-4 py-2 text-white hover:bg-[#8094b0] w-full text-left rounded-lg shadow-lg z-10">Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Remove Switch component */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/info/:quizId" element={<QuizInfo />} />
            <Route path="/quiz/:quizId" element={<Question />} />
            <Route path="/answer/:quizId" element={<Question />} />

          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;