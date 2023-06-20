import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import CgpaCalc from "./CgpaCalculation/CgpaCalc";
import { useRouter } from "next/router";

const EceCgpa = ({ syllabus }) => {
  const stateArray = [];

  syllabus.map((term, index) => {
    const obj = {
      id: index,
      termName: term.name,
      termCredits: parseFloat(term.totalCredits),
    };
    stateArray.push(obj);
  });

  const [terms, setTerms] = useState(
    // { id: 1, termName: "Year - 1 Term - I", termCredits: 19.5 },
    // { id: 2, termName: "Year - 1 Term - II", termCredits: 20.5 },
    // { id: 3, termName: "Year - 2 Term - I", termCredits: 19.5 },
    // { id: 4, termName: "Year - 2 Term - II", termCredits: 20.5 },
    // { id: 5, termName: "Year - 3 Term - I", termCredits: 19.5 },
    // { id: 6, termName: "Year - 3 Term - II", termCredits: 20.5 },
    // { id: 7, termName: "Year - 4 Term - I", termCredits: 20.0 },
    // { id: 8, termName: "Year - 4 Term - II", termCredits: 20.0 },
    [...stateArray]
  );
  const [termName, setTermName] = useState("");
  const [termCredits, setTermCredits] = useState("");
  const [calculate, setCalculate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addnewTerm, setAddNewterm] = useState(false);
  const router = useRouter();

  const addTerm = () => {
    setAddNewterm(!addnewTerm);
    if (termName != "" && termCredits != "") {
      const newTerms = [...terms];
      newTerms.push({
        id: Date.now(),
        termName: termName,
        termCredits: termCredits,
      });
      setTerms(newTerms);
      setTermName("");
      setTermCredits("");
    }
  };

  const removeTerm = (id) => {
    const newTerms = terms.filter((term) => term.id !== id);
    setTerms(newTerms);
  };

  return (
    <Fragment>
      {!calculate && (
        <div className="w-[90%] md:w-[700px] h-full flex flex-col justify-center items-center">
          {edit && (
            <div className="w-full h-full flex flex-col justify-center items-center mb-8">
              {terms.map((term) => (
                <div
                  className="w-full flex flex-col justify-center items-center mt-12 border-2 border-blue-700 rounded-lg py-2"
                  key={term.id}
                >
                  <div className="w-full">
                    <div className="w-full pb-2 text-center text-xl font-semibold bg-transparent border-b-2 border-blue-700">
                      {term.termName}
                    </div>
                  </div>

                  <div>
                    <div className="w-full flex flex-col justify-center items-center">
                      <div className="text-center font-semibold text-xl my-4">
                        Total Credits :
                      </div>
                      <input
                        className="w-[90%] py-2 text-center text-xl font-semibold bg-transparent outline-none border-fuchsia-700 border-2 rounded-lg mb-4"
                        type="number"
                        value={term.termCredits}
                        onChange={(e) => {
                          const updatedTerms = [...terms];
                          const updatedTerm = updatedTerms.find(
                            (t) => t.id === term.id
                          );
                          updatedTerm.termCredits = e.target.value;
                          setTerms(updatedTerms);
                        }}
                      />
                    </div>
                    <div className="mt-2 flex justify-center items-center">
                      <button
                        className="bg-red-700 text-white font-semibold px-3 py-1 rounded-md mb-2"
                        onClick={() => removeTerm(term.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!edit && (
            <div className="w-full text-xl font-semibold mt-12 flex flex-col justify-center items-center">
              {terms.map((term) => (
                <div
                  className="w-full md:h-[40px] flex flex-col md:flex-row justify-center items-center mb-8 border-2 border-blue-900 py-2 md:py-0 rounded-md"
                  key={term.id}
                >
                  <div className="border-b-2 md:border-b-0 md:border-r-2 border-blue-700 w-full md:h-full flex justify-center items-center md:w-[50%] text-center mb-2 md:mb-0 pb-2 md:pb-0">
                    {term.termName}
                  </div>
                  <div className="md:w-[50%] text-center">
                    {term.termCredits} Credits
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
            {addnewTerm && (
              <div className="w-full">
                <input
                  className="w-full py-2 px-4 text-center text-xl font-semibold bg-transparent outline-none border-fuchsia-700 border-2 rounded-lg mb-8"
                  type="text"
                  placeholder="Term Name"
                  value={termName}
                  onChange={(e) => setTermName(e.target.value)}
                />
              </div>
            )}
            {addnewTerm && (
              <div className="w-full">
                <input
                  className="w-full py-2 px-4 text-center text-xl font-semibold bg-transparent outline-none border-fuchsia-700 border-2 rounded-lg mb-4"
                  type="number"
                  placeholder="Term Credits"
                  value={termCredits}
                  onChange={(e) => setTermCredits(e.target.value)}
                />
              </div>
            )}
            <div className="mb-8 flex flex-col justify-center items-center">
              <button
                className="bg-emerald-700 text-white font-semibold px-3 py-1 rounded-md mb-6"
                onClick={addTerm}
              >
                Add Term
              </button>
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
                Calculate Cgpa
              </button>
              <button
                className="bg-black text-white font-semibold text-center w-[100px] py-1 rounded-md my-4"
                onClick={() => {
                  router.back("/eceku");
                }}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
      {calculate && (
        <div className="w-full flex flex-col justify-center items-center">
          <CgpaCalc data={terms}></CgpaCalc>
          <button
            className="bg-black text-white font-semibold text-center w-[100px] py-1 rounded-md mt-4 mb-8"
            onClick={() => {
              setCalculate(false);
            }}
          >
            Go Back
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default EceCgpa;
