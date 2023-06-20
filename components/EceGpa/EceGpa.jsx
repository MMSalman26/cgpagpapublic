import React from "react";
import GpaCalc from "./GpaCalculation/GpaCalc";
import { useState } from "react";
import { Fragment } from "react";

const EceGpa = (props) => {
  const [courses, setcourses] = useState(
    props.terms.courses.map((course, index) => ({
      id: index,
      courseName: course,
      courseCredits: props.terms.credits[index],
      type: "(regular)",
    }))
  );

  const [courseName, setcourseName] = useState("");
  const [courseCredits, setcourseCredits] = useState("");
  const [calculate, setCalculate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addnewcourse, setAddNewcourse] = useState(false);
  const [showRegular, setShowRegular] = useState(true);
  const [showRetake, setShowRetake] = useState(true);

  const addcourse = () => {
    setAddNewcourse(!addnewcourse);
    setShowRetake(!showRetake);
    if (courseName != "" && courseCredits != "") {
      const newcourses = [...courses];
      newcourses.push({
        id: Date.now(),
        courseName: courseName,
        courseCredits: courseCredits,
        type: "(regular)",
      });
      setcourses(newcourses);
      setcourseName("");
      setcourseCredits("");
    }
  };

  const addRetakecourse = () => {
    setAddNewcourse(!addnewcourse);
    setShowRegular(!showRegular);
    if (courseName != "" && courseCredits != "") {
      const newcourses = [...courses];
      newcourses.push({
        id: Date.now(),
        courseName: courseName,
        courseCredits: courseCredits,
        type: "(retake)",
      });
      setcourses(newcourses);
      setcourseName("");
      setcourseCredits("");
    }
  };

  const removecourse = (id) => {
    const newcourses = courses.filter((course) => course.id !== id);
    setcourses(newcourses);
  };

  return (
    <Fragment>
      {!calculate && (
        <div className="w-[90%] md:w-[700px] h-full flex flex-col justify-center items-center">
          {edit && (
            <div className="w-full text-xl font-semibold mt-12 flex flex-col justify-center items-center">
              {courses.map((course) => (
                <div
                  className="w-full md:h-[65px] flex flex-col md:flex-row justify-center items-center mb-8 border-2 border-blue-900 py-2 md:py-0 md:px-2 rounded-md"
                  key={course.id}
                >
                  <div className="border-b-2 md:border-b-0 md:border-r-2 border-blue-700 w-full md:h-full flex justify-center items-center md:w-[50%] text-center mb-2 md:mb-0 pb-2 md:pb-0">
                    {course.courseName}
                  </div>
                  <div className="md:w-[50%] text-center">
                    <button
                      className="bg-red-700 text-white font-semibold px-3 py-1 rounded-md my-2 text-base"
                      onClick={() => removecourse(course.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!edit && (
            <div className="w-full text-xl font-semibold mt-12 flex flex-col justify-center items-center">
              {courses.map((course) => (
                <div
                  className="w-full md:h-[65px] flex flex-col md:flex-row justify-center items-center mb-8 border-2 border-blue-900 py-2 md:py-0 md:px-2 rounded-md"
                  key={course.id}
                >
                  <div className="border-b-2 md:border-b-0 md:border-r-2 border-blue-700 w-full md:h-full flex justify-center items-center md:w-[50%] text-center mb-2 md:mb-0 pb-2 md:pb-0">
                    {course.courseName}
                  </div>
                  <div className="md:w-[50%] text-center">
                    {course.courseCredits} Credits
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-center items-center">
            {edit && (
              <button
                className="bg-green-600 text-white font-semibold px-3 py-1 rounded-md"
                onClick={() => setEdit(false)}
              >
                Save
              </button>
            )}
            {!edit && (
              <button
                className="bg-green-600 text-white font-semibold px-3 py-1 rounded-md"
                onClick={() => {
                  setEdit(true);
                  //   window.scrollTo({
                  //     top: 0,
                  //     behavior: "smooth",
                  //   });
                }}
              >
                Edit
              </button>
            )}
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center mt-8">
            {addnewcourse && (
              <div className="w-full">
                <input
                  className="w-full py-2 px-4 text-center text-xl font-semibold bg-transparent outline-none border-fuchsia-700 border-2 rounded-lg mb-8"
                  type="text"
                  placeholder="Course Name"
                  value={courseName}
                  onChange={(e) => setcourseName(e.target.value)}
                />
              </div>
            )}
            {addnewcourse && (
              <div className="w-full">
                <input
                  className="w-full py-2 px-4 text-center text-xl font-semibold bg-transparent outline-none border-fuchsia-700 border-2 rounded-lg mb-4"
                  type="number"
                  placeholder="Course Credits"
                  value={courseCredits}
                  onChange={(e) => setcourseCredits(e.target.value)}
                />
              </div>
            )}
            <div className="mb-8 flex flex-col justify-center items-center">
              {showRegular && (
                <button
                  className="bg-emerald-700 text-white font-semibold px-3 py-1 rounded-md mb-6"
                  onClick={addcourse}
                >
                  Add Regular Course
                </button>
              )}
              {showRetake && (
                <button
                  className="bg-teal-700 text-white font-semibold px-3 py-1 rounded-md mb-6"
                  onClick={addRetakecourse}
                >
                  Add Retake Course
                </button>
              )}
              <button
                className="bg-cyan-800 text-white font-semibold px-3 py-1 rounded-md mb-4"
                onClick={() => {
                  setCalculate(true);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                Calculate Gpa
              </button>
              <button
                className="bg-black text-white font-semibold text-center w-[100px] py-1 rounded-md my-4"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
      {calculate && <GpaCalc data={courses}></GpaCalc>}
    </Fragment>
  );
};

export default EceGpa;
