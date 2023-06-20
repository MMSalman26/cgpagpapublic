import React from "react";
import { useState, Fragment, useRef, useEffect } from "react";
import ResultCard from "./ResultCard";
import Markdown from "./Markdown";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import BasicCalculator from "@/components/Extras/BasicCalculator";
import { AttendanceCalc } from "./AttendanceCalc";

const GpaCalc = (props) => {
  const [inputValues, setInputValues] = useState(
    props.data.map((course) => ({
      name: course.courseName,
      totalCredits: course.courseCredits,
      gpa: "",
      marks: "",
      letter: "",
      type: course.type,
    }))
  );
  const [showResult, setShowResult] = useState(true);
  const [showCalculation, setShowCalculation] = useState(false);
  const [result, setResult] = useState();
  const [opacity, setOpacity] = useState(0.5);
  const [att, setAtt] = useState(false);
  const [basic, setBasic] = useState(false);

  const options2 = [
    "4.00",
    "3.75",
    "3.50",
    "3.25",
    "3.00",
    "2.75",
    "2.50",
    "2.25",
    "2.00",
    "0.00",
  ];

  const options3 = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"];
  const numerical = [
    "80% or above",
    "75% to less than 80%",
    "70% to less than 75%",
    "65% to less than 70%",
    "60% to less than 65%",
    "55% to less than 60%",
    "50% to less than 55%",
    "45% to less than 50%",
    "40% to less than 45%",
    "less than 40%",
  ];

  const returnGpa = (number) => {
    if (number >= 80) {
      return 0;
    } else if (number >= 75 && number < 80) {
      return 1;
    } else if (number >= 70 && number < 75) {
      return 2;
    } else if (number >= 65 && number < 70) {
      return 3;
    } else if (number >= 60 && number < 65) {
      return 4;
    } else if (number >= 55 && number < 60) {
      return 5;
    } else if (number >= 50 && number < 55) {
      return 6;
    } else if (number >= 45 && number < 50) {
      return 7;
    } else if (number >= 40 && number < 45) {
      return 8;
    } else {
      return 9;
    }
  };

  const divRef = useRef(null);

  const handleDownload = () => {
    const element = document.getElementById("your-component-id");

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "result.png";
      link.click();
    });
  };

  const inputCheckerMarkDown = (inputVals) => {
    const values = inputVals;
    values.map((value, index) => {
      if (value.gpa == "0.00" || value.gpa == "0") {
        values.splice(index, 1);
        return values;
      }
      if (value.type == "(retake)" && parseFloat(value.gpa) > 2) {
        const mod = {
          name: value.name,
          totalCredits: value.totalCredits,
          gpa: (parseFloat(value.gpa) - 0.25).toFixed(2),
          marks: value.marks,
          letter: value.letter,
          type: value.type,
        };
        values.splice(index, 1, mod);
        return values;
      }
    });
    const values2 = [];
    inputVals.map((value) => {
      if (value.gpa != "") {
        values2.push(value);
      }
    });
    return values2;
  };

  const inputCheckerResult = (inputVals) => {
    const values = inputVals;
    values.map((value, index) => {
      if (value.type == "(retake)" && parseFloat(value.gpa) > 2) {
        const mod = {
          name: value.name,
          totalCredits: value.totalCredits,
          gpa: (parseFloat(value.gpa) - 0.25).toFixed(2),
          marks: value.marks,
          letter: value.letter,
          type: value.type,
        };
        values.splice(index, 1, mod);
        return values;
      }
    });
    const values2 = [];
    inputVals.map((value) => {
      if (value.gpa != "") {
        values2.push(value);
      }
    });
    return values2;
  };

  const CalcHandler = () => {
    let totalCredits = 0;
    let weightedGPASum = 0;
    inputValues.map((term) => {
      let credits = 0;
      let gpa = 0;
      if (term.type == "(regular)") {
        credits = parseFloat(term.totalCredits);
        gpa = parseFloat(term.gpa);
      } else {
        credits = parseFloat(term.totalCredits);
        gpa = parseFloat(term.gpa) - 0.25;
        if (gpa < 2) {
          gpa = gpa + 0.25;
        }
      }

      if (
        !isNaN(credits) &&
        !isNaN(gpa) &&
        term.marks != "Invalid Grade Point" &&
        gpa != 0
      ) {
        totalCredits += credits;
        weightedGPASum += credits * gpa;
      }
    });

    const cgpa = (weightedGPASum / totalCredits).toFixed(2);
    setResult(isNaN(cgpa) ? "Calculating" : cgpa);
  };

  const handleGpaInputChange = (index, event) => {
    setShowCalculation(false);
    const values = [...inputValues];
    values[index].gpa = event.target.value;
    const ret = parseFloat(event.target.value).toFixed(2);
    if (event.target.value === "") {
      values[index].marks = "";
      values[index].letter = "";
    } else if (options2.indexOf(ret) >= 0) {
      values[index].marks = numerical[options2.indexOf(ret)];
      values[index].letter = options3[options2.indexOf(ret)];
    } else {
      values[index].marks = "Invalid Grade Point";
      values[index].letter = "Invalid Grade Point";
    }

    setInputValues([...values]);
    CalcHandler();
    // if (values[index].totalCredits != "") {
    //   setShowResult(false);
    //   setOpacity(1);
    // }
  };
  const handleMarksChange = (index, event) => {
    setShowCalculation(false);
    const values = [...inputValues];

    values[index].marks = event.target.value;
    if (event.target.value === "") {
      values[index].gpa = "";
      values[index].letter = "";
    } else if (
      parseInt(event.target.value) < 0 ||
      isNaN(parseInt(event.target.value)) ||
      parseInt(event.target.value) > 100
    ) {
      values[index].gpa = "Invalid Course Marks";
      values[index].letter = "Invalid Course Marks";
    } else {
      values[index].gpa = options2[returnGpa(parseInt(event.target.value))];
      values[index].letter = options3[returnGpa(parseInt(event.target.value))];
    }

    setInputValues([...values]);
    CalcHandler();
    // if (values[index].totalCredits != "") {
    //   setShowResult(false);
    //   setOpacity(1);
    // }
  };
  const handleLetterChange = (index, event) => {
    setShowCalculation(false);
    const values = [...inputValues];

    values[index].letter = event.target.value;
    if (event.target.value === "") {
      values[index].marks = "";
      values[index].gpa = "";
    } else if (options3.indexOf(event.target.value) >= 0) {
      values[index].marks = numerical[options3.indexOf(event.target.value)];
      values[index].gpa = options2[options3.indexOf(event.target.value)];
    } else {
      values[index].marks = "Invalid Letter Grade";
      values[index].gpa = "Invalid Letter Grade";
    }
    setInputValues([...values]);
    CalcHandler();
    // if (values[index].totalCredits != "") {
    //   setShowResult(false);
    //   setOpacity(1);
    // }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {att && <AttendanceCalc></AttendanceCalc>}
      <button
        className="bg-blue-950 mt-8 my-4 py-2 px-4 text-white rounded-lg font-semibold"
        onClick={() => setAtt(!att)}
      >
        {!att ? "Attendance Calculator" : "Hide"}
      </button>
      {basic && <BasicCalculator></BasicCalculator>}
      <button
        className="bg-indigo-950 my-4 py-2 px-4 text-white rounded-lg font-semibold"
        onClick={() => setBasic(!basic)}
      >
        {!basic ? "Basic Calculator" : "Hide"}
      </button>
      <div className="text-center w-[90%] md:w-[700px] font-semibold text-blue-800">
        {!inputValues[0].gpa != "" &&
          "**Note : When calculating the GPA of a course, you are not required to provide input for all fields: Grade Point, Letter Grade, and Course Marks. You have the option to input any of these fields, and the remaining two will be automatically determined based on your input."}
      </div>

      <form className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center mt-8">
          {inputValues.map((value, index) => (
            <div
              key={index}
              className="w-full flex flex-col justify-center items-center mb-12"
            >
              <div className="w-full flex flex-col justify-center items-center">
                <div className="w-[90%] md:w-[700px] font-semibold mb-4 text-xl text-indigo-600 text-center px-2 border-b-2 border-dotted border-indigo-600 pb-2">
                  {`${value.name} ${value.type}`}
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <div className="font-semibold mb-4 text-lg text-center px-2 text-purple-600">
                  Total Credits in The Course : {value.totalCredits}
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <div className="font-semibold mb-2 text-lg">Grade Point :</div>
                <input
                  type="text"
                  value={value.gpa}
                  onChange={(event) => handleGpaInputChange(index, event)}
                  className="w-[90%] h-[40px] md:w-[700px] rounded-md bg-transparent border-2 border-solid border-blue-700 mb-4 text-center font-semibold outline-none text-xl placeholder:text-base pb-1"
                  placeholder="Please Enter Grade point"
                />
              </div>

              <div
                ref={divRef}
                className="w-full flex flex-col justify-center items-center"
              >
                <div className="font-semibold mb-2 text-lg">Letter Grade :</div>
                <input
                  type="text"
                  value={value.letter}
                  onChange={(event) => handleLetterChange(index, event)}
                  className="w-[90%] h-[40px] md:w-[700px] rounded-md bg-transparent border-2 border-solid border-blue-700 mb-4 text-center font-semibold outline-none text-xl placeholder:text-base pb-1"
                  placeholder="Please Enter Letter Grade"
                />
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <div className="font-semibold mb-2 text-lg">Course Marks :</div>
                <input
                  type="text"
                  value={value.marks}
                  onChange={(event) => handleMarksChange(index, event)}
                  className="w-[90%] h-[40px] md:w-[700px] rounded-md bg-transparent border-2 border-solid border-blue-700 mb-4 text-center font-semibold outline-none text-xl placeholder:text-base pb-1"
                  placeholder="Please Enter Course Marks"
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-[110px] h-[37px] bg-indigo-600 text-white font-semibold rounded-md mb-4 text-lg"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });

            if (inputValues[0].totalCredits == "" || inputValues[0].gpa == "") {
              window.alert("First Fill up The Form with Valid Input");
            } else {
              setShowResult(false);
              setOpacity(1);
            }
            let totalCredits = 0;
            let weightedGPASum = 0;
            inputValues.map((term) => {
              let credits = 0;
              let gpa = 0;
              if (term.type == "(regular)") {
                credits = parseFloat(term.totalCredits);
                gpa = parseFloat(term.gpa);
              } else {
                credits = parseFloat(term.totalCredits);
                gpa = parseFloat(term.gpa) - 0.25;
                if (gpa < 2) {
                  gpa = gpa + 0.25;
                }
              }

              if (
                !isNaN(credits) &&
                !isNaN(gpa) &&
                term.marks != "Invalid Grade Point" &&
                gpa != 0
              ) {
                totalCredits += credits;
                weightedGPASum += credits * gpa;
              }
            });

            const cgpa = (weightedGPASum / totalCredits).toFixed(2);
            setResult(isNaN(cgpa) ? "Calculating" : cgpa);
          }}
        >
          See Result
        </button>
      </form>
      <ResultCard
        id="containerRef"
        terms={inputCheckerResult([...inputValues])}
        result={result}
      ></ResultCard>
      {!showCalculation && (
        <button
          style={{ opacity: opacity }}
          disabled={showResult}
          className="h-fit w-fit px-4 py-2 bg-blue-900 rounded-lg mt-2 text-teal-100 text-lg font-semibold text-center mb-8"
          onClick={() => {
            setShowCalculation(true);
          }}
        >
          Show Calculation
        </button>
      )}
      {showCalculation && (
        <div className="h-fit w-[90%] md:w-[700px] flex flex-col justify-center items-center">
          {/* <Markdown result={result} terms={inputValues}></Markdown> */}
          <Markdown
            result={result}
            terms={inputCheckerMarkDown([...inputValues])}
          ></Markdown>
        </div>
      )}
      {showCalculation && (
        <button
          className="h-fit w-fit px-4 py-2 bg-gray-900 rounded-lg mt-2 text-teal-100 text-lg font-semibold text-center mb-8"
          onClick={() => {
            setShowCalculation(false);
          }}
        >
          Hide
        </button>
      )}
      <div className="mb-8">
        {inputValues[0] && (
          <button
            style={{ opacity: opacity }}
            disabled={showResult}
            onClick={handleDownload}
            className="w-fit h-fit px-4 py-2 bg-black text-white rounded-md"
          >
            Download Result as Image
          </button>
        )}
      </div>
      <button
        className="bg-black text-white font-semibold text-center w-[100px] py-1 rounded-md mt-4 mb-8"
        onClick={() => {
          window.location.reload();
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default GpaCalc;
