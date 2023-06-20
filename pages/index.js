import ManageTables from "@/components/Tables/ManageTables";
import Image from "next/image";
import CgpaCalc from "@/components/CgpaCalculation/CgpaCalc";
import { AttendanceCalc } from "@/components/Extras/AttendanceCalc";
import BasicCalculator from "@/components/Extras/BasicCalculator";
import GpaCalc from "@/components/GpaCalculation/GpaCalc";
import GradingSystemForm from "@/components/Extras/GradingSystemForm";
import AddEceSyllabus from "@/components/Extras/AddEceSyllabus";
import { useState } from "react";
import Link from "next/link";
import DgpaCalc from "@/components/GpaCalculation/DgpaCalc";
import Head from "next/head";
import { Fragment } from "react";

export default function Home(props) {
  const [selectedUniversity, setSelectedUniversity] = useState(0);
  const [calcCg, setCalcCg] = useState(false);
  const [caclGp, setCalcGp] = useState(false);
  const [calc, setCalc] = useState(false);
  const handleUniversityChange = (event) => {
    setSelectedUniversity(event.target.value);
  };
  return (
    <Fragment>
      <Head>
        <title>CGPA & GPA Calculator</title>
        <meta
          name="description"
          content="This Application is developed by M M Salman. With most possible dynamic functionality while Calculating CGPA & GPA"
        />
        <meta
          property="og:url"
          content="https://cgpagpacalculation.vercel.app/"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="CGPA & GPA Calculator" />
        <meta
          property="og:description"
          content="This Application is developed by M M Salman. With most possible dynamic functionality while Calculating CGPA & GPA"
        />
        <meta property="og:image" content="./state.png" />
        <meta property="og:image:alt" content="Image" />
        <meta property="og:site_name" content="Promotional" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CGPA & GPA Calculator" />
        <meta
          name="twitter:description"
          content="This Application is developed by M M Salman. With most possible dynamic functionality while Calculating CGPA & GPA"
        />
        <meta name="twitter:site" content="@yourusername" />
        <meta name="twitter:image" content="./state.png" />
        <meta name="twitter:creator" content="mmsalman" />
      </Head>
      <div className="min-h-screen w-screen bg-blue-100 flex flex-col justify-center items-center">
        {!calc && (
          <div className="w-full mt-8 flex flex-col justify-center items-center">
            <div className="w-full text-center mb-4 font-semibold text-xl">
              Please Select Your University before Calculating CGPA & GPA
            </div>
            <select
              value={selectedUniversity}
              onChange={handleUniversityChange}
              className="w-[90%] md:w-[700px] bg-transparent text-center py-2 border-2 border-blue-700 rounded-lg px-2 outline-none text-lg font-semibold"
            >
              {/* <option className="text-center font-semibold">
                Default is Selected Now
              </option> */}
              {props.data.map((university, index) => (
                <option
                  key={index}
                  value={index}
                  className="text-center font-semibold"
                >
                  {university.universityName}
                </option>
              ))}
            </select>
          </div>
        )}

        {!calc && (
          <ManageTables data={props.data[selectedUniversity]}></ManageTables>
        )}
        {calcCg && (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <CgpaCalc></CgpaCalc>
            <button
              className="bg-black py-2 px-4 rounded-lg font-semibold text-white mb-4"
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
            {/* <GpaCalc></GpaCalc> */}
            <DgpaCalc data={props.data[selectedUniversity]}></DgpaCalc>
            <button
              className="bg-black py-2 px-4 rounded-lg font-semibold text-white mb-4"
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
              Calculate Term GPA
            </button>
          </div>
        )}
        {!calc && (
          <div className="w-full flex flex-col justify-center items-center">
            <div className="mt-4 mb-8 px-4 text-center text-lg font-semibold">
              **Note : If you cant find your University name in the option then
              you can add your University Grading System.
            </div>
            <div className="mb-8 bg-rose-950 py-2 px-2 rounded-lg font-semibold text-white">
              <Link href={`/create`}>Add Grading System</Link>
            </div>

            <div className="mt-4 mb-4 px-4 text-center text-lg font-semibold">
              Are You From KU ECE?
            </div>
            <div className="mb-8 bg-indigo-700 py-2 px-4 rounded-lg font-semibold text-white">
              <Link href={`/eceku`}>Click Here</Link>
            </div>
          </div>
        )}
        {/* <AttendanceCalc></AttendanceCalc> */}
        {/* <BasicCalculator></BasicCalculator> */}
        {/* <CgpaCalc></CgpaCalc> */}
        {/* <GpaCalc></GpaCalc> */}
        {/* <AddEceSyllabus></AddEceSyllabus> */}
      </div>
    </Fragment>
  );
}

// export async function getServerSideProps() {
//   try {
//     const response = await fetch(
//       "https://cgpagpacalculation.vercel.app/api/allUniversity"
//       // "http://localhost:3000/api/allUniversity"
//     );
//     if (response.ok) {
//       const data = await response.json();
//       return {
//         props: { data },
//       };
//     } else {
//       console.error("Error:", response.statusText);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }

//   return {
//     props: { universities: [] },
//   };
// }
export async function getStaticProps() {
  try {
    const response = await fetch(
      "https://cgpagpacalculation.vercel.app/api/allUniversity"
      // "http://localhost:3000/api/allUniversity"
    );
    if (response.ok) {
      const data = await response.json();
      return {
        props: { data },
      };
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }

  return {
    props: { universities: [] },
  };
}
