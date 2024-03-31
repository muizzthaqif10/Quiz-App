import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { FidgetSpinner } from "react-loader-spinner";

// import { QuizContext } from "../helpers/QuizContext";

function Question() {
  const [listOfQuestions, setListOfQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [attemptData, setAttemptData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  let { quizId } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true); // State variable for loading
  const [remainingTime, setRemainingTime] = useState(930); // 5 minutes timer
  const [timer, setTimer] = useState(null); // Store timer reference
  const { authState } = useContext(AuthContext);
  const [modalMessage, setModalMessage] = useState("");

  const isAnswerRoute = location.pathname.includes("/answer");
  const { Userid } = authState;

  const searchParams = new URLSearchParams(location.search);
  const attemptId = searchParams.get("attemptId");

  // const { setQuizState } = useContext(QuizContext);

  useEffect(() => {
    axios.get(`https://api-quiz-app.onrender.com/question/${quizId}`).then((response) => {
      setListOfQuestions(response.data);
      console.log("RRRR", response.data);
      setLoading(false); // Set loading to false when data is fetched

    }).catch((error) =>{
      console.log(error);
      setLoading(false); // Set loading to false when data is fetched

    });
  }, [quizId]);

  const handleCheckboxChange = (questionId, choice) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: choice,
    }));
  };

  const allQuestionsAnswered = listOfQuestions.every((question) =>
    selectedAnswers.hasOwnProperty(question.id)
  );

  const notComplete = () => {
    setModalMessage("Please answer all questions before submitting.");
    setShowModal(true);
  };

  useEffect(() => {
    let interval = null;

    if (remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      console.log("Timer reached zero. Selected Answers:", selectedAnswers);
      submitAnswers(); // Submit the answers when timer ends
      clearInterval(timer); // Stop the timer when it reaches zero
    }

    // Clean up function
    return () => clearInterval(interval);
  }, [remainingTime]); // Include remainingTime as the only dependency

  const submitAnswers = async () => {
    // if (!allQuestionsAnswered && remainingTime > 0) {
    //   // Not all questions answered and time remaining, show warning modal
    //   setModalMessage("Please answer all questions before submitting.");
    //   setShowModal(true);
    //   return; // Prevent further execution
    // }

    setLoading(true);
    const answers = Object.entries(selectedAnswers).map(
      ([questionId, choice]) => ({
        attemptId: attemptId,
        questionId: parseInt(questionId),
        selectedAnswer: choice.text,
        isCorrect: choice.isCorrect,
      })
    );

    const requests = [];
    const bulkSubmissionRequest = axios.post(
      "https://api-quiz-app.onrender.com/answer/bulk",
      answers
    );
    requests.push(bulkSubmissionRequest);

    try {
      const [bulkSubmissionResponse] = await Promise.all(requests);
      console.log("Bulk submission success:", bulkSubmissionResponse.data);

      // Wait for bulkSubmissionRequest to finish before updating the score
      const updateScoreRequest = await axios.put(
        `https://api-quiz-app.onrender.com/attempt/updateScore/${attemptId}`
      );
      console.log("Update score success:", updateScoreRequest.data);

      await getScore(); // Wait for score to be fetched

      clearInterval(timer); // Stop the timer after submission
    } catch (error) {
      console.error("Error in bulk submission or score update:", error);
    } finally {
      setLoading(false); // Set loading state to false after submission
    }
  };

  const getScore = async () => {
    try {
      const response = await axios.get(
        `https://api-quiz-app.onrender.com/attempt/${attemptId}`
      );
      console.log(response.data);
      setAttemptData(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching score:", error);
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    navigate(`/quiz/info/${quizId}`);
  };

  return (
    <div>
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
    <div className="flex bg-black min-h-screen p-8 sm:p-24">
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
      <div className="relative p-[2rem] bg-zinc-800 bg-opacity-70 border-2 border-[#c28f33] rounded-lg w-2/3 mx-auto">
        <div className="fixed top-0 left-4 right-4 bg-black z-20">
          {!isAnswerRoute && (
            <div className="flex w-full justify-center items-center p-10 gap-4 ">
              {/* Fixed position for "Question Left" */}
              <div className="bg-[#000000] flex gap-2 border-2 border-[#c28f33] text-white font-bold rounded p-2 ">
                <img src="/bxs-file.svg" alt="Questions Left Icon"></img>
                Question Left:{" "}
                {listOfQuestions.length - Object.keys(selectedAnswers).length}
              </div>
              <p className="bg-[#000000] flex border-2 border-[#c28f33] gap-2 text-white font-bold rounded p-2">
                Set Question {quizId}
              </p>
              {/* Fixed position for "Timer" */}
              <div className="bg-[#000000] flex border-2 border-[#c28f33] gap-2 text-white font-bold rounded p-2 ">
                <img src="/bxs-time.svg"></img>
                Timer: {Math.floor(remainingTime / 60)}:
                {remainingTime % 60 < 10
                  ? `0${remainingTime % 60}`
                  : remainingTime % 60}
              </div>
            </div>
          )}
        </div>{" "}
        {/* Fixed position for "Set Question" */}
        {isAnswerRoute && (
          <p className="bg-[#000000] text-xl mb-4 border-2 border-[#c28f33] text-center text-white font-bold rounded p-2">
            Answer Set Question {quizId}
          </p>
        )}
        <div className=" grid grid-cols-2  gap-[1rem] z-10">
          {listOfQuestions.map((question, questionIndex) => (
            <div
              className={`text-black shadow-lg shadow-black rounded-lg border-2 p-4 transition-all ease-in-out duration-500 bg-white  ${
                selectedAnswers.hasOwnProperty(question.id)
                  ? "bg-green-400"
                  : ""
              }`}
              key={questionIndex}
            >
              <div className="font-semibold mb-2 text-lg">
                <span className="font-bold mr-[1rem]">
                  Question {questionIndex + 1}:{" "}
                </span>
                {question.question_text}
              </div>
              <div className="">
                {question.choices.map((choice, choiceIndex) => (
                  <div key={choiceIndex} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`choice-${question.id}-${choiceIndex}`}
                      name={`choice-${question.id}`}
                      value={choice.text}
                      checked={
                        selectedAnswers[question.id]?.text === choice.text
                      }
                      onChange={() => handleCheckboxChange(question.id, choice)}
                      disabled={isAnswerRoute}
                      className={`form-checkbox h-5 w-5 text-indigo-600 ${
                        isAnswerRoute
                          ? choice.isCorrect
                            ? "bg-green-400"
                            : "bg-red-400"
                          : ""
                      }`}
                    />
                    <label
                      htmlFor={`choice-${question.id}-${choiceIndex}`}
                      className={`ml-2 ${
                        isAnswerRoute
                          ? choice.isCorrect
                            ? "text-green-600"
                            : "text-red-600"
                          : ""
                      }`}
                    >
                      {choice.text}
                      {isAnswerRoute && (
                        <span className="ml-2">
                          {choice.isCorrect ? "(Correct)" : "(Incorrect)"}
                        </span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {!isAnswerRoute && allQuestionsAnswered && (
          <div className="flex mt-6 justify-end">
            <button
              className="hover:text-white text-black font-semibold hover:bg-blue-900 transition ease-in-out duration-300 bg-blue-400 rounded-lg shadow-md py-2 px-[1rem]"
              onClick={submitAnswers}
              disabled={loading}
            >
              Submit
            </button>
          </div>
        )}
        {!isAnswerRoute && !allQuestionsAnswered && (
          <div className="flex mt-6 justify-end">
            <button
              className="hover:text-white text-black font-semibold hover:bg-blue-900 transition ease-in-out duration-300 bg-blue-400 rounded-lg shadow-md py-2 px-[1rem]"
              onClick={notComplete}
              disabled={loading}
            >
              Submit
            </button>
          </div>
        )}
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl">
              {attemptData && attemptData.length > 0 ? (
                <div className="flex flex-col justify-center items-center gap-4">
                  <h2 className="text-lg font-semibold mb-4">
                    Submit Success !
                  </h2>
                  <img
                    className="rounded-full w-[4rem] h-[4rem] bg-[#c28f33]"
                    src="/bxs-medal.svg"
                  ></img>
                  <p className="text-lg font-bold">
                    Your Score : {attemptData[0].score} /{" "}
                    {listOfQuestions.length}
                  </p>
                  <button
                    onClick={handleContinue}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Continue
                  </button>
                </div>
              ) : (
                <div className="flex flex-col justify-center">
                  <h2 className="text-lg font-semibold mb-4">
                    Answer all question
                  </h2>
                  <p className="mb-4">{modalMessage}</p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-green-500 hover:bg-green-700 flex justify-center text-white font-bold py-2 px-4 rounded"
                  >
                    {"OK"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default Question;
