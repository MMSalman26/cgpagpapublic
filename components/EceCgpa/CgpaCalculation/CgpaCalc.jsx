import React from "react";
import { useState } from "react";
import ResultCard from "./ResultCard";
import Markdown from "./Markdown";
import html2canvas from "html2canvas";

const CgpaCalc = (props) => {
  const [inputValues, setInputValues] = useState(
    props.data.map((obj) => ({
      name: obj.termName,
      totalCredits: obj.termCredits,
      gpa: "",
    }))
  );
  const [showResult, setShowResult] = useState(true);
  const [showCalculation, setShowCalculation] = useState(false);
  const [result, setResult] = useState();
  const [opacity, setOpacity] = useState(0.5);
  const [showCard, setShowCard] = useState(true);

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

  const inputChecker = (inputVals) => {
    const values = [];
    inputVals.map((value) => {
      if (value.gpa != "") {
        values.push(value);
      }
    });
    return values;
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

  const handleGpaInputChange = (index, event) => {
    setShowCalculation(false);
    const values = [...inputValues];
    values[index].gpa = event.target.value;
    setInputValues([...values]);
    CalcHandler();
    // if (values[index].totalCredits != "") {
    //   setShowResult(false);
    //   setOpacity(1);
    // }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <form className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center mt-16">
          {inputValues.map((value, index) => (
            <div
              key={index}
              className="w-[90%] md:w-[700px] flex flex-col justify-center items-center mb-12 rounded-lg py-2"
            >
              <div className="w-full text-xl text-center text-indigo-600 font-semibold border-b-2 border-dotted border-indigo-600 pb-2 mb-4">
                {value.name}
              </div>
              <div className="w-full mb-4 text-center text-purple-600 font-semibold text-xl">
                Total Credits in The Term : {value.totalCredits}
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <div className="font-semibold mb-4 text-lg">Term GPA : </div>
                <input
                  type="number"
                  value={value.gpa}
                  onChange={(event) => handleGpaInputChange(index, event)}
                  className="w-full h-[40px] rounded-md bg-transparent border-2 border-solid border-blue-700 mb-4 text-center font-semibold outline-none text-xl placeholder:text-base pb-1"
                  placeholder="Please Enter Term GPA"
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
              // setShowCard(true);
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
          }}
        >
          See Result
        </button>
      </form>
      {showCard && (
        <ResultCard
          id="containerRef"
          // terms={inputValues}
          terms={inputChecker([...inputValues])}
          result={result}
        ></ResultCard>
      )}
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
          <Markdown
            result={result}
            terms={inputChecker([...inputValues])}
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
