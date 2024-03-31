import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
// import { QuizContext } from "../helpers/QuizContext";

function Quiz() {
  const [listOfQuiz, setListOfQuiz] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [attemptByUser, setAttemptByUser] = useState();
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  // const [quizState, setQuizState] = useState({
  //   id: 0,
  //   status: false,
  // });
  const [quizIdToNavigate, setQuizIdToNavigate] = useState(null);
  const { id } = authState;

  useEffect(() => {
    axios.get("https://api-quiz-app.onrender.com/quiz").then((response) => {
      setListOfQuiz(response.data);
    });
  }, []);

  const startAttempt = (quizId) => {
    axios
      .get(`https://api-quiz-app.onrender.com/attempt/${id}/${quizId}`)
      .then((response) => {
        console.log(response.data.length);
        const attemptLength = response.data.length; // Store the attempt length in a variable
        setAttemptByUser(attemptLength); // Update the state variable

        const data = {
          userId: id,
          quizId: quizId,
          score: 85,
          attemptedAt: "2024-03-30T08:00:00Z",
        };

        //   axios.post("https://api-quiz-app.onrender.com/attempt", data).then((response) => {
        //     console.log(response);
        //  navigate(/quiz/${quizId}?attemptLength=${attemptLength + 1}); // Pass the attempt length directly to navigate
        //   });
        navigate(`/quiz/${quizId}`);
      });
  };

  const handleConfirmAttempt = (quizId) => {
    // Show modal and set quizId to navigate after confirmation
    // setShowModal(true);
    setQuizIdToNavigate(quizId);
  };

  const handleModalConfirm = () => {
    startAttempt(quizIdToNavigate);
    setShowModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* <QuizContext.Provider value={(quizState, setQuizState)}> */}
      <div className="flex bg-black min-h-screen p-8 sm:p-24">
        {/* Video Background */}
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
        <div className="flex flex-col w-full gap-[3rem]">
          <div className="flex flex-col lg:flex-row gap-[2rem] w-full h-full z-10">
            {/* Text */}
            {listOfQuiz.slice(0, 3).map((value, key) => (
              <div
                key={key}
                className="w-full lg:w-1/3 sm:w-full flex flex-col gap-[2rem] items-center bg-zinc-800 bg-opacity-70 text-white border-2  p-6 border-[#c28f33] cursor-pointer hover:bg-orange-400 hover:bg-opacity-70  transition duration-300 ease-in-out hover:scale-105"
                onClick={() => navigate(`/quiz/info/${value.id}`)}
              >
                <img
                  src="./bx-math.svg"
                  className="w-[5rem] h-[5rem] mt-[1rem] p-4 bg-[#c28f33] rounded-full"
                ></img>
                <div className="text-2xl font-bold">{value.title}</div>
                <div className="text-md font-thin text-center">
                  {value.description}
                </div>
              </div>
            ))}
          </div>

          {/* Nested grid for items 4 and 5 */}
          <div className="flex justify-center gap-[2rem] w-full h-full z-10">
            {listOfQuiz.slice(3).map((value, key) => (
              <div
                key={key}
                className="w-1/3 sm:w-full flex flex-col gap-[2rem] items-center bg-zinc-800 bg-opacity-70 text-white border-2  p-6 border-[#c28f33] cursor-pointer hover:bg-orange-400 hover:bg-opacity-70  transition duration-300 ease-in-out hover:scale-105"
                onClick={() => navigate(`/quiz/info/${value.id}`)}
              >
                <img
                  src="./bx-math.svg"
                  className="w-[5rem] h-[5rem] mt-[1rem] p-4 bg-[#c28f33] rounded-full"
                ></img>
                <div className="text-2xl font-bold">{value.title}</div>
                <div className="text-md font-thin text-center">
                  {value.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md">
              <h2 className="text-lg font-semibold mb-4">
                Are you sure you want to start this quiz?
              </h2>
              <div className="flex justify-end">
                <button
                  className="text-red-500 hover:text-red-700 font-semibold mr-4"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button
                  className="text-green-500 hover:text-green-700 font-semibold"
                  onClick={handleModalConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Image */}
      </div>
      {/* </QuizContext.Provider> */}
    </div>
  );
}

export default Quiz;
