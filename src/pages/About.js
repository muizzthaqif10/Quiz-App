import React from "react";
// import axios from "axios";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

function About() {
  return (
    <main className="flex bg-black min-h-screen flex-col sm:p-24">
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

      <section className="hero relative flex flex-col gap-8 justify-center  items-center z-10">
        {/* Text */}
        <div className=" w-2/3">
          <h1 className="flex gap-6 justify-center items-center text-4xl lg:text-4xl font-bold text-[#c28f33] mb-4">
            <img
              className="w-[4rem] bg-black rounded-full p-2"
              src="/bxs-graduation.svg"
              alt="Icon"
            />
            <span>What is BizzMathPro</span>
            <img
              className="w-[4rem] bg-black rounded-full p-2"
              src="/bxs-graduation.svg"
              alt="Icon"
            />
          </h1>
          <p className="text-xl font-medium text-white mt-8 text-center">
            Learn about the brilliant minds behind the linear equations.
            Challenge yourself with our set questions that will spark your
            curiosity and showcase the playful side of mathematics.
          </p>
        </div>

        <div className=" rounded-lg">
          <div className="flex gap-6 justify-center items-center text-2xl font-bold text-white mb-[2rem]">
            {/* <img
              className="w-[4rem] bg-black rounded-full p-2"
              src="/bxs-graduation.svg"
              alt="Icon"
            /> */}
            <span className="bg-zinc-900 p-4 rounded-t-full rounded-br-full border-2 border-[#c28f33]">
              Our Team
            </span>
            {/* <img
              className="w-[4rem] bg-black rounded-full p-2"
              src="/bxs-graduation.svg"
              alt="Icon"
            /> */}
          </div>
          <div className="grid grid-cols-3 items-center gap-8">
            <div className="flex flex-col justify-center shadow-lg shadow-yellow-100/30  items-center bg-gray-900 bg-opacity-80 p-4 rounded-lg border-2 border-[#c28f33]">
              <img
                className="border rounded-full w-[7rem] h-[7rem] object-cover mb-[2.4rem]"
                src="./User1.jpeg"
              ></img>
              <p className="text-[#c28f33] text-lg font-bold mb-[2rem]">
                Siti Nur Aisyah Binti Mohd Nasir
              </p>
              <p className="text-white text-center text-lg font-thin">
                Life is like MATH if it goes too easy something is wrong.
              </p>
            </div>
            <div className="flex flex-col justify-center shadow-lg shadow-yellow-100/30  items-center bg-gray-900 bg-opacity-80 p-4 rounded-lg border-2 border-[#c28f33]">
              <img
                className="border rounded-full w-[7rem] h-[7rem] object-cover mb-[2.4rem]"
                src="./User2.jpeg"
              ></img>
              <p className="text-[#c28f33] text-lg font-bold mb-[2rem]">
                Muhammad Haziq Imran Bin Abu Sufian
              </p>
              <p className="text-white text-center text-lg font-thin">
                Maths can be related to our lives. It teaches us to always be
                careful with the signs.
              </p>
            </div>
            <div className="flex flex-col justify-center shadow-lg shadow-yellow-100/30  items-center bg-gray-900 bg-opacity-80 p-4 rounded-lg border-2 border-[#c28f33]">
              <img
                className="border rounded-full w-[7rem] h-[7rem] object-cover mb-[2.4rem]"
                src="./User3.jpeg"
              ></img>
              <p className="text-[#c28f33] text-lg font-bold mb-[2rem]">
                Nur Nabilah Binti Abdul Rashid
              </p>
              <p className="text-white text-center text-lg font-thin">
                ⁠The only way to learn mathematics is to do mathematics.
              </p>
            </div>
          </div>
        </div>
        {/* Image */}
      </section>
    </main>
  );
}

export default About;