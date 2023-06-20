import React from "react";
import { useState } from "react";

const BasicCalculator = () => {
  const [result, setResult] = useState(0.0);
  return (
    <div className="w-[90%] md:w-[700px] h-[300px] bg-slate-800 rounded-lg flex flex-col justify-center items-center">
      <div className="w-full flex justify-center">
        <input
          type="text"
          placeholder="Numerical Operation"
          className="text-center w-[90%] bg-transparent rounded-lg border-b-2 border-purple-500 mb-4 py-2 px-3 text-purple-300 outline-none text-lg md:text-xl md:w-[600px] font-semibold"
          onChange={(event) => {
            try {
              setResult(eval(event.target.value));
            } catch (error) {}
          }}
        ></input>
      </div>
      <div className="text-fuchsia-300 text-lg md:text-xl font-semibold mb-4">
        =
      </div>
      <div className="text-fuchsia-300 text-lg md:text-xl font-semibold ">
        {result ? result.toFixed(2) : "0.00"}
      </div>
    </div>
  );
};

export default BasicCalculator;
