import React from "react";
import { useState, Fragment, useRef, useEffect } from "react";
import ResultCard from "./ResultCard";
import Markdown from "./Markdown";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CgpaCalc = () => {
  const [inputValues, setInputValues] = useState([
    { name: "", totalCredits: "", gpa: "" },
  ]);
  const [showResult, setShowResult] = useState(true);
  const [showCalculation, setShowCalculation] = useState(false);
  const [result, setResult] = useState();
  const [opacity, setOpacity] = useState(0.5);
  const [animate, setAnimate] = useState("appear-div");

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
    // html2canvas(element).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const imgWidth = canvas.width;
    //   const imgHeight = canvas.height;
    //   const pdf = new jsPDF(`${inputValues.length > 3 ? "p" : "l"}`, "pt", [
    //     imgWidth,
    //     imgHeight,
    //   ]);
    //   pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    //   pdf.save("result.pdf");
    // });
  };

  const CalcHandler = () => {
    let totalCredits = 0;
    let weightedGPASum = 0;
    inputValues.map((term) => {
      const credits = parseFloat(term.totalCredits);
      const gpa = parseFloat(term.gpa);

      if (!isNaN(credits) && !isNaN(gpa)) {
        totalCredits += credits;
        weightedGPASum += credits * gpa;
      }
    });

    const cgpa = (weightedGPASum / totalCredits).toFixed(2);
    setResult(isNaN(cgpa) ? "Calculating" : cgpa);
  };

  const handleCreditInputChange = (index, event) => {
    setShowCalculation(false);
    const values = [...inputValues];
    values[index].name = `Term - ${index + 1}`;
    values[index].totalCredits = event.target.value;
    setInputValues([...values]);
    CalcHandler();
  };
  const handleGpaInputChange = (index, event) => {
    setShowCalculation(false);
    const values = [...inputValues];
    values[index].name = `Term - ${index + 1}`;
    values[index].gpa = event.target.value;
    setInputValues([...values]);
    CalcHandler();
  };

  const addInputField = (event) => {
    event.preventDefault();
    setAnimate("appear-div");
    setShowCalculation(false);
    if (divRef.current !== null) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setInputValues([...inputValues, { name: "", totalCredits: "", gpa: "" }]);
    CalcHandler();
  };

  const removeInputField = (index, event) => {
    event.preventDefault();
    setShowCalculation(false);
    const values = [...inputValues];
    values.splice(index, 1);
    setInputValues([...values]);
    let totalCredits = 0;
    let weightedGPASum = 0;
    values.map((term) => {
      const credits = parseFloat(term.totalCredits);
      const gpa = parseFloat(term.gpa);

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

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <form className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center mt-16">
          {inputValues.map((value, index) => (
            <div
              ref={divRef}
              key={index}
              className={`w-full flex flex-col justify-center items-center mb-8 ${animate}`}
            >
              <div className="text-center text-xl text-indigo-600 font-semibold border-b-2 border-dotted border-indigo-600 pb-1 mb-4">
                {`Term - ${index + 1}`}
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <div className="font-semibold mb-4 text-lg">
                  Total Credits in The Term :
                </div>
                <input
                  type="number"
                  value={value.totalCredits}
                  onChange={(event) => handleCreditInputChange(index, event)}
                  className="w-[90%] h-[40px] md:w-[700px] rounded-md bg-transparent border-2 border-solid border-blue-700 mb-4 text-center font-semibold outline-none text-xl placeholder:text-base pb-1 "
                  placeholder="Please Enter Term Credits"
                />
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <div className="font-semibold mb-4 text-lg">Term GPA : </div>
                <input
                  type="number"
                  value={value.gpa}
                  onChange={(event) => handleGpaInputChange(index, event)}
                  className="w-[90%] h-[40px] md:w-[700px] rounded-md bg-transparent border-2 border-solid border-blue-700 mb-4 text-center font-semibold outline-none text-xl placeholder:text-base pb-1"
                  placeholder="Please Enter Term GPA"
                />
              </div>
              <button
                onClick={(event) => removeInputField(index, event)}
                className="w-[80px] h-[30px] bg-red-600 text-white font-semibold rounded-md mb-4 text-base"
              >
                Remove
              </button>
              <div className="w-[90%] md:w-[700px] h-[2px] bg-blue-700 mb-4"></div>
            </div>
          ))}
          <button
            onClick={addInputField}
            className="w-[110px] h-[37px] bg-green-600 text-white font-semibold rounded-md mb-4 text-lg"
          >
            Add Term
          </button>
        </div>
        {inputValues[1] && (
          <button
            type="submit"
            className="w-[110px] h-[37px] bg-indigo-600 text-white font-semibold rounded-md mb-4 text-lg"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
              });

              if (
                inputValues[0].totalCredits == "" ||
                inputValues[0].gpa == ""
              ) {
                window.alert("First Fill up The Form with Valid Input");
              } else {
                setShowResult(false);
                setOpacity(1);
              }
              let totalCredits = 0;
              let weightedGPASum = 0;
              inputValues.map((term) => {
                const credits = parseFloat(term.totalCredits);
                const gpa = parseFloat(term.gpa);

                if (!isNaN(credits) && !isNaN(gpa)) {
                  totalCredits += credits;
                  weightedGPASum += credits * gpa;
                }
              });

              const cgpa = (weightedGPASum / totalCredits).toFixed(2);
              setResult(isNaN(cgpa) ? "Calculating" : cgpa);
              // console.log(cgpa);
            }}
          >
            See Result
          </button>
        )}
      </form>
      {inputValues[1] && (
        <ResultCard
          id="containerRef"
          terms={inputValues}
          result={result}
        ></ResultCard>
      )}
      {!showCalculation && inputValues[1] && (
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
          <Markdown result={result} terms={inputValues}></Markdown>
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
        {inputValues[1] && (
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
    </div>
  );
};

export default CgpaCalc;
