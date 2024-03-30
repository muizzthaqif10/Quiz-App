import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  //   let history = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <main className="flex bg-black min-h-screen flex-col items-center gap-2 p-8 sm:p-24">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="fixed inset-0 object-cover w-full h-full z-0"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero relative flex flex-column items-center mt-6 z-10">
        {/* Text */}
        <div className="lg:pl-10 lg:w-2/3  md:w-2/3 sm:w-full xs:text-center xs:text-justify ">
          <h1 className="text-4xl lg:text-6xl font-bold text-[#c28f33] mb-4">
            Welcome to BizMathPro :
          </h1>
          <h1 className="text-4xl lg:text-3xl text-[#c28f33] mb-4 font-semibold">
            Your Gateway to Business Mathematics Excellence!
          </h1>
          <p className="text-lg lg:text-xl text-[white] mb-6 text-justify mt-10">
            Unlock the power of numbers and elevate your understanding of
            business mathematics with BizMathPro. We're thrilled to introduce a
            dynamic online platform tailored for students to master the
            intricate world where mathematics meets business.
          </p>
          <button className="bg-[#2174ea] text-white font-bold mr-4 p-2 rounded w-1/4"> 
              About
          </button>
          <button className="bg-[#334155] text-white font-bold p-2 rounded w-1/4">
              Contact Us
          </button>
        </div>
        {/* Image */}
      </div>
      <div className="flex relative w-full justify-end z-10">
        <img src="./math.svg" className="w-1/6 sm:1/2"></img>
      </div>
    </main>
  );
}

export default Home;