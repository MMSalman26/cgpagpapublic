import EceGpa from "@/components/EceGpa/EceGpa";
import React from "react";
import { useState } from "react";
import Link from "next/link";

export default function Home({ data }) {
  const [selectedName, setSelectedName] = useState("");
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [selectedTermName, setSelectedTermName] = useState("");
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [calc, setCalc] = useState(false);
  const [gpShow, setGpShow] = useState(true);

  const handleSelectChange = (event) => {
    const selectedName = event.target.value;
    const selectedObject = data.find((item) => item.name === selectedName);

    setSelectedName(selectedName);
    if (selectedObject) {
      setSelectedSyllabus(selectedObject.syllabus);
    }
  };

  const handleSelectChange2 = (event) => {
    const selectedTermName = event.target.value;
    const selectedObject = selectedSyllabus.find(
      (item) => item.name === selectedTermName
    );

    setSelectedTermName(selectedTermName);
    if (selectedObject) {
      setSelectedTerm(selectedObject);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-blue-100 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center">
        {!selectedSyllabus && (
          <div className="flex flex-col justify-center items-center">
            {!calc && (
              <div className="text-center mb-8 text-xl font-semibold bg-violet-700 py-2 w-fit px-4 text-white rounded-lg">
                <Link href={`/eceku/cgpa`}>Calculate CGPA of Terms</Link>
              </div>
            )}
            {gpShow && (
              <div className="text-center mb-8 text-xl font-semibold bg-sky-700 py-2 w-fit px-4 text-white rounded-lg">
                <button
                  onClick={() => {
                    setCalc(true);
                    setGpShow(!gpShow);
                  }}
                >
                  Calculate Term GPA
                </button>
              </div>
            )}
            {calc && (
              <div className="flex flex-col justify-center items-center">
                <select
                  value={selectedName}
                  onChange={handleSelectChange}
                  className="bg-transparent py-2 px-4 border-2 border-blue-700 rounded-lg text-xl font-semibold outline-none text-center"
                >
                  <option value="" className="bg-transparent">
                    Select a Syllabus
                  </option>
                  {data.map((item) => (
                    <option
                      key={item.name}
                      value={item.name}
                      className="bg-transparent font-semibold"
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="text-center font-semibold text-lg my-8 px-4">
                  **Note : If You cant find your Syllabus in the option you can
                  create new syllabus
                </div>
                <div className="w-[200px] mb-8 bg-indigo-700 py-2 rounded-lg font-semibold text-white text-center">
                  <Link href={`/eceku/addsyllabus`}>Create New Syllabus</Link>
                </div>
                <button
                  className="bg-black text-white font-semibold text-center w-[100px] py-1 rounded-md my-4"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Go Back
                </button>
              </div>
            )}
          </div>
        )}
        {selectedSyllabus && !selectedTerm && (
          <div className="flex flex-col justify-center items-center">
            <select
              value={selectedTermName}
              onChange={handleSelectChange2}
              className="bg-transparent py-2 px-4 border-2 border-blue-700 rounded-lg text-xl font-semibold outline-none text-center"
            >
              <option value="" className="bg-transparent">
                Select a Term
              </option>
              {selectedSyllabus &&
                selectedSyllabus.map((item) => (
                  <option
                    key={item.name}
                    value={item.name}
                    className="bg-transparent font-semibold "
                  >
                    {item.name}
                  </option>
                ))}
            </select>
            <button
              className="bg-black text-white font-semibold text-center w-[100px] py-1 rounded-md my-4"
              onClick={() => {
                window.location.reload();
              }}
            >
              Go Back
            </button>
          </div>
        )}
      </div>
      {selectedTerm && <EceGpa terms={selectedTerm}></EceGpa>}
    </div>
  );
}

// export async function getServerSideProps() {
//   //   const response = await fetch("http://localhost:3000/api/hello");
//   const response = await fetch(
//     "https://cgpagpacalculation.vercel.app/api/hello"
//     // "http://localhost:3000/api/hello"
//   );
//   const data = await response.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }

export async function getStaticProps() {
  //   const response = await fetch("http://localhost:3000/api/hello");
  const response = await fetch(
    "https://cgpagpacalculation.vercel.app/api/hello"
    // "http://localhost:3000/api/hello"
  );
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}
