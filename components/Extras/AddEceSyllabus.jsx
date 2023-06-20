import React, { useState } from "react";
import { useRouter } from "next/router";

const AddEceSyllabus = () => {
  const [terms, setTerms] = useState([]);
  const [newTermName, setNewTermName] = useState("");
  const [syllabusName, setSyllabusName] = useState("");
  const router = useRouter();

  const addTerm = () => {
    const newTerm = {
      name: newTermName,
      courses: [],
      totalCredits: "",
    };
    setTerms([...terms, newTerm]);
    setNewTermName("");
  };

  const addCourse = (termIndex) => {
    const newCourse = {
      name: "",
      credit: "",
    };

    const updatedTerms = [...terms];
    updatedTerms[termIndex].courses.push(newCourse);

    setTerms(updatedTerms);
  };

  const removeTerm = (termIndex) => {
    const updatedTerms = [...terms];
    updatedTerms.splice(termIndex, 1);

    setTerms(updatedTerms);
  };

  const removeCourse = (termIndex, courseIndex) => {
    const updatedTerms = [...terms];
    updatedTerms[termIndex].courses.splice(courseIndex, 1);

    setTerms(updatedTerms);
  };

  const handleCourseNameChange = (termIndex, courseIndex, event) => {
    const updatedTerms = [...terms];
    updatedTerms[termIndex].courses[courseIndex].name = event.target.value;

    setTerms(updatedTerms);
  };

  const handleCourseCreditChange = (termIndex, courseIndex, event) => {
    const updatedTerms = [...terms];
    updatedTerms[termIndex].courses[courseIndex].credit = event.target.value;

    setTerms(updatedTerms);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const finalData = { name: syllabusName, syllabus: terms };
  //   try {
  //     const response = await fetch("/api/eceSyllabus", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(finalData),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();

  //       console.log(data);
  //       router.push(`/eceku`);
  //     } else {
  //       console.error("Error:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  //   window.alert(
  //     "Your Form Has been Submitted Successfully! You will get the option of newly added syllabus after admin's approval"
  //   );
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    const finalData = { name: syllabusName, syllabus: terms };
    fetch("/api/eceSyllabus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Post request successful:", result);
        router.push(`/eceku`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    window.alert(
      "Your Form Has been Submitted Successfully! You will get the Option of Newly Added Syllabus after Admin's Approval"
    );
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-center items-center">
        <input
          className="bg-transparent w-[90%] md:w-[700px] font-semibold border-2 border-blue-700 border-dashed rounded-lg outline-none text-center py-2 px-2 my-4"
          type="text"
          value={syllabusName}
          onChange={(event) => {
            setSyllabusName(event.target.value);
          }}
          placeholder="Enter Syllabus Name"
        />
      </div>
      {terms.map((term, termIndex) => (
        <div
          key={termIndex}
          className="w-full flex flex-col justify-center items-center appear-div"
        >
          <div className="w-[90%] md:w-[700px] bg-black h-[2px] my-4"></div>

          <button
            onClick={() => removeTerm(termIndex)}
            className="bg-red-700 text-white py-2 px-4 rounded-lg my-2 font-semibold"
          >
            Remove Term
          </button>
          <input
            className="bg-transparent w-[80%] md:w-[600px] font-semibold border-b-2 border-blue-700 border-dotted rounded-lg outline-none text-center py-2 px-2 my-4"
            type="text"
            value={term.name}
            onChange={(event) => {
              const updatedTerms = [...terms];
              updatedTerms[termIndex].name = event.target.value;
              setTerms(updatedTerms);
            }}
            placeholder="Term Name"
          />
          <input
            className="bg-transparent w-[80%] md:w-[600px] font-semibold border-b-2 border-blue-700 border-dotted rounded-lg outline-none text-center py-2 px-2 my-4"
            type="number"
            value={term.totalCredits}
            onChange={(event) => {
              const updatedTerms = [...terms];
              updatedTerms[termIndex].totalCredits = event.target.value;
              setTerms(updatedTerms);
            }}
            placeholder="Total Credits in The Term"
          />

          {term.courses.map((course, courseIndex) => (
            <div
              key={courseIndex}
              className="w-full flex flex-col justify-center items-center text-center"
            >
              <input
                className="bg-transparent w-[80%] md:w-[600px] font-semibold border-2 border-blue-700 rounded-lg outline-none text-center py-2 px-2 my-4"
                type="text"
                value={course.name}
                onChange={(event) =>
                  handleCourseNameChange(termIndex, courseIndex, event)
                }
                placeholder="Course Name"
              />
              <input
                className="bg-transparent w-[80%] md:w-[600px] font-semibold border-2 border-blue-700 rounded-lg outline-none text-center py-2 px-2 my-4"
                type="number"
                value={course.credit}
                onChange={(event) =>
                  handleCourseCreditChange(termIndex, courseIndex, event)
                }
                placeholder="Course Credit"
              />
              <button
                className="bg-pink-700 w-[150px] py-2 font-semibold rounded-lg text-white mb-4"
                onClick={() => removeCourse(termIndex, courseIndex)}
              >
                Remove Course
              </button>
              <div className="w-[90%] md:w-[700px] bg-black h-[2px] mb-8"></div>
            </div>
          ))}
          <button
            className="bg-indigo-600 px-4 py-2 text-white font-semibold rounded-lg mb-16"
            onClick={() => addCourse(termIndex)}
          >
            Add Course
          </button>
        </div>
      ))}
      <button
        onClick={addTerm}
        className="bg-sky-600 px-4 py-2 text-white font-semibold rounded-lg mt-16 mb-4"
      >
        Add Term
      </button>
      <button
        onClick={handleSubmit}
        className="bg-emerald-600 px-4 py-2 text-white font-semibold rounded-lg my-4 mb-12"
      >
        Submit
      </button>
    </div>
  );
};

export default AddEceSyllabus;
