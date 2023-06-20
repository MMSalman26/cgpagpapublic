import CgpaCalc from "@/components/CgpaCalculation/CgpaCalc";
import GpaCalc from "@/components/GpaCalculation/GpaCalc";
import { useState } from "react";

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home(props) {
  const [calcCg, setCalcCg] = useState(false);
  const [caclGp, setCalcGp] = useState(false);
  const [calc, setCalc] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen w-screen bg-blue-100 flex flex-col justify-center items-center">
      {calcCg && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <CgpaCalc></CgpaCalc>
          <button
            className="bg-black py-2 px-4 rounded-lg font-semibold text-white"
            onClick={() => {
              setCalcCg(false);
              setCalc(false);
            }}
          >
            Go Back
          </button>
        </div>
      )}

      {caclGp && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <GpaCalc></GpaCalc>
          <button
            className="bg-black py-2 px-4 rounded-lg font-semibold text-white"
            onClick={() => {
              setCalcGp(false);
              setCalc(false);
            }}
          >
            Go Back
          </button>
        </div>
      )}
      {!calc && (
        <div>
          <button
            className="bg-emerald-700 py-2 px-4 rounded-lg font-semibold text-white my-4"
            onClick={() => {
              setCalcCg(true);
              setCalc(true);
            }}
          >
            Calculate CGPA of Terms
          </button>
        </div>
      )}
      {!calc && (
        <div>
          <button
            className="bg-teal-700 py-2 px-4 rounded-lg font-semibold text-white my-4"
            onClick={() => {
              setCalcGp(true);
              setCalc(true);
            }}
          >
            Cacluclate Term GPA
          </button>
        </div>
      )}
    </div>
  );
}
