import React from "react";

const ResultCard = (props) => {
  if (props.terms[0]) {
    if (props.terms[0].gpa == "") {
      return (
        <div className="h-fit w-[90%] md:w-[700px] text-xl my-8 bg-slate-800 rounded-lg text-center px-4 text-cyan-300 p-8">
          Your Result will Appear Here
        </div>
      );
    }
  } else {
    return;
  }

  return (
    <div
      id="your-component-id"
      className=" h-fit w-[90%] md:w-[700px] text-xl my-8 bg-slate-800 rounded-lg flex flex-col justify-center items-center pb-8 px-4"
    >
      <div className="text-cyan-300 my-4 text-xl border-b-2 border-cyan-400 border-dashed pb-2">
        Result Details
      </div>
      {props.terms.map((term) => (
        <div
          className="w-[90%] md:w-[500px] text-cyan-300 flex flex-col justify-center items-center my-4 border-2 rounded-md py-4 md:px-8"
          key={Math.random()}
        >
          <div className="text-sky-300 text-center border-b-2 border-sky-300 pb-2 mb-2 mt-2">
            {term.name}
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center mb-4">
            <div className="md:mr-4 text-indigo-300 text-center">
              Total Credits : {term.totalCredits}
            </div>
            <div className="text-fuchsia-300 text-center">
              Term GPA : {term.gpa}
            </div>
          </div>
        </div>
      ))}
      <div className="mt-3 text-emerald-300 text-lg">
        Your CGPA : {props.result}
      </div>
    </div>
  );
};

export default ResultCard;
