import { useState } from "react";
import React from "react";

export const AttendanceCalc = (props) => {
  const [totalClasses, setTotalCLasses] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [marks, setMarks] = useState(0);

  // const setMarksHandler = (percentage) => {
  //   if (percentage >= 90) {
  //     return 10;
  //   } else if (percentage >= 85 && percentage < 90) {
  //     return 9;
  //   } else if (percentage >= 80 && percentage < 85) {
  //     return 8;
  //   } else if (percentage >= 75 && percentage < 80) {
  //     return 7;
  //   } else if (percentage >= 70 && percentage < 75) {
  //     return 6;
  //   } else if (percentage >= 65 && percentage < 70) {
  //     return 5;
  //   } else if (percentage >= 60 && percentage < 65) {
  //     return 4;
  //   } else {
  //     return 0;
  //   }
  // };

  const setMarksHandler = (percentage) => {
    let track = 0;

    props.data.map((marks, index) => {
      if (
        percentage >= parseFloat(marks.start) &&
        percentage < parseFloat(marks.end) + 1
      ) {
        track = marks.marks;
      }
    });
    return track;
  };

  const CalculateAttendance = (attended) => {
    const percentage = ((attended / totalClasses) * 100).toFixed(2);
    setMarks(setMarksHandler(percentage));
    setPercentage(percentage);
  };

  const TotalClassInputHandler = (event) => {
    setTotalCLasses(event.target.value);
  };

  const AttendedClassInputHandler = (event) => {
    CalculateAttendance(event.target.value);
  };

  return (
    <div className="w-[90%] md:w-[700px] h-[300px] bg-slate-800 rounded-lg flex flex-col justify-center items-center mt-8">
      <div className="w-full flex justify-center items-center">
        <input
          type="number"
          value={totalClasses}
          onChange={(event) => {
            TotalClassInputHandler(event);
          }}
          placeholder="Enter Number of Total Classes"
          className="text-center w-[90%] bg-transparent rounded-lg border-2 border-purple-500 mb-4 py-2 px-3 text-purple-300 outline-none placeholder:text-xs md:placeholder:text-sm md:w-[600px] font-semibold text-lg md:text-xl"
        ></input>
      </div>
      <div className="w-full flex justify-center items-center">
        <input
          type="number"
          onChange={(event) => {
            AttendedClassInputHandler(event);
          }}
          placeholder="Enter Number of Classes Attended"
          className="text-center w-[90%] bg-transparent rounded-lg border-2 border-purple-500 mb-6 py-2 px-3 text-purple-300 outline-none placeholder:text-xs md:placeholder:text-sm md:w-[600px] font-semibold text-lg md:text-xl"
        ></input>
      </div>

      <div className="text-teal-400 text-lg md:text-xl mb-4 text-center font-semibold">
        Your Attendance : {percentage} %
      </div>
      <div className="text-teal-400 text-lg md:text-xl text-center font-semibold">
        Marks : {marks}
      </div>
    </div>
  );
};
