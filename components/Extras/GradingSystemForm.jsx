import React, { useState } from "react";
import { useRouter } from "next/router";

function GradingSystemForm() {
  const [percentageRanges, setPercentageRanges] = useState([
    // { start: "", end: "", letterGrade: "", gradePoint: "" },
  ]);
  const [attendanceRanges, setAttendanceRanges] = useState([
    // { start: "", end: "", marks: "" },
  ]);
  const [retakeCourseDeduction, setRetakeCourseDeduction] = useState("");

  const [versityName, setVersityname] = useState("");

  const router = useRouter();

  const handlePercentageRangeChange = (index, field, value) => {
    const updatedRanges = [...percentageRanges];
    updatedRanges[index][field] = value;
    setPercentageRanges(updatedRanges);
  };

  const handleAttendanceRangeChange = (index, field, value) => {
    const updatedRanges = [...attendanceRanges];
    updatedRanges[index][field] = value;
    setAttendanceRanges(updatedRanges);
  };

  const handleRetakeCourseDeductionChange = (value) => {
    setRetakeCourseDeduction(value);
  };

  const addPercentageRange = () => {
    setPercentageRanges([
      ...percentageRanges,
      { start: "", end: "", letterGrade: "", gradePoint: "" },
    ]);
  };

  const addAttendanceRange = () => {
    setAttendanceRanges([
      ...attendanceRanges,
      { start: "", end: "", marks: "" },
    ]);
  };
  const removePercentageRange = (index) => {
    const updatedRanges = [...percentageRanges];
    updatedRanges.splice(index, 1);
    setPercentageRanges(updatedRanges);
  };
  const removeAttendanceRange = (index) => {
    const updatedRanges = [...attendanceRanges];
    updatedRanges.splice(index, 1);
    setAttendanceRanges(updatedRanges);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      universityName: versityName,
      marksPercentage: percentageRanges,
      attendancePercentage: attendanceRanges,
      deductionMark: retakeCourseDeduction,
    };

    fetch("/api/gradingSystem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Post request successful:", result);
        router.push(`/`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    window.alert(
      "Your Form Has been Submitted Successfully. You will get the Option of Your University after Admin's Approval."
    );
  };
  return (
    <div className="w-full flex flex-col justify-center items-center my-8">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-center items-center"
      >
        <input
          className="w-[90%] md:w-[700px] bg-transparent border-2 border-blue-700 rounded-lg my-4 text-center py-2 px-4 outline-none font-semibold text-lg"
          type="text"
          placeholder="Your University Name"
          value={versityName}
          onChange={(e) => setVersityname(e.target.value)}
        />
        <div className="w-full flex flex-col justify-center items-center mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center text-indigo-600 border-b-2 pb-2 border-indigo-600 border-dotted">
            Marks Percentage Ranges
          </h2>
          {percentageRanges.map((range, index) => (
            <div
              key={index}
              className="w-full flex flex-col justify-center items-center mb-12 appear-div"
            >
              <div className="w-[90%] md:w-[700px] flex justify-center items-center">
                <input
                  className="w-[40%] bg-transparent border-2 border-blue-700 rounded-lg my-4 text-center py-2 px-4 outline-none font-semibold text-lg"
                  type="number"
                  placeholder="Start"
                  value={range.start}
                  onChange={(e) =>
                    handlePercentageRangeChange(index, "start", e.target.value)
                  }
                />
                <div className="text-center font-semibold my-4 px-2">% to</div>
                <input
                  className="w-[40%] bg-transparent border-2 border-blue-700 rounded-lg my-4 text-center py-2 px-4 outline-none font-semibold text-lg"
                  type="number"
                  placeholder="End"
                  value={range.end}
                  onChange={(e) =>
                    handlePercentageRangeChange(index, "end", e.target.value)
                  }
                />
                <div className="text-center font-semibold my-4 px-2">%</div>
              </div>
              <input
                className="w-[90%] md:w-[700px] bg-transparent border-2 border-blue-700 rounded-lg my-4 text-center py-2 px-4 outline-none font-semibold text-lg"
                type="text"
                placeholder="Letter Grade"
                value={range.letterGrade}
                onChange={(e) =>
                  handlePercentageRangeChange(
                    index,
                    "letterGrade",
                    e.target.value
                  )
                }
              />
              <input
                className="w-[90%] md:w-[700px] bg-transparent border-2 border-blue-700 rounded-lg my-4 text-center py-2 px-4 outline-none font-semibold text-lg"
                type="number"
                placeholder="Grade Point"
                value={range.gradePoint}
                onChange={(e) =>
                  handlePercentageRangeChange(
                    index,
                    "gradePoint",
                    e.target.value
                  )
                }
              />
              <button
                className="bg-red-600 text-white py-1 px-2 mt-4 rounded-lg font-semibold"
                type="button"
                onClick={() => removePercentageRange(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPercentageRange}
            className="bg-purple-700 text-white font-semibold rounded-lg px-4 py-1"
          >
            Add Marks Range
          </button>
        </div>

        <div className="w-full flex flex-col justify-center items-center mt-12">
          <h2 className="text-xl font-semibold mb-4 text-center text-indigo-600 border-b-2 pb-2 border-indigo-600 border-dotted">
            Attendance Ranges
          </h2>
          {attendanceRanges.map((range, index) => (
            <div
              key={index}
              className="w-full flex flex-col justify-center items-center mb-12 appear-div"
            >
              <div className="w-[90%] md:w-[700px] flex justify-center items-center">
                <input
                  className="w-[40%] bg-transparent border-2 border-blue-700 rounded-lg my-4 text-center py-2 px-4 outline-none font-semibold text-lg"
                  type="number"
                  placeholder="Start"
                  value={range.start}
                  onChange={(e) =>
                    handleAttendanceRangeChange(index, "start", e.target.value)
                  }
                />
                <div className="text-center font-semibold my-4 px-2">% to</div>
                <input
                  className="w-[40%] bg-transparent border-2 border-blue-700 rounded-lg my-4 text-center py-2 px-4 outline-none font-semibold text-lg"
                  type="number"
                  placeholder="End"
                  value={range.end}
                  onChange={(e) =>
                    handleAttendanceRangeChange(index, "end", e.target.value)
                  }
                />
                <div className="text-center font-semibold my-4 px-2">%</div>
              </div>
              <input
                className="w-[90%] md:w-[700px] bg-transparent border-2 border-blue-700 rounded-lg my-4 text-center py-2 px-4 outline-none font-semibold text-lg"
                type="text"
                placeholder="Marks"
                value={range.marks}
                onChange={(e) =>
                  handleAttendanceRangeChange(index, "marks", e.target.value)
                }
              />
              <button
                className="bg-red-600 text-white py-1 px-2 mt-4 rounded-lg font-semibold"
                type="button"
                onClick={() => removeAttendanceRange(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-indigo-700 text-white font-semibold rounded-lg px-4 py-1"
            onClick={addAttendanceRange}
          >
            Add Attendance Range
          </button>
        </div>

        <div className="w-full flex flex-col justify-center items-center mt-16">
          <h2 className="text-xl font-semibold mb-4 text-center text-indigo-600 border-b-2 pb-2 border-indigo-600 border-dotted">
            Retake Course Deduction Point
          </h2>
          <input
            className="w-[90%] md:w-[700px] bg-transparent border-2 border-blue-700 rounded-lg my-4 text-center py-2 px-4 outline-none font-semibold text-lg"
            type="number"
            placeholder="Retake Course Deduction"
            value={retakeCourseDeduction}
            onChange={(e) => handleRetakeCourseDeductionChange(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-green-700 text-white py-2 px-4 rounded-lg my-8 font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default GradingSystemForm;
