import EceCgpa from "@/components/EceCgpa/EceCgpa";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home({ data }) {
  const [selectedName, setSelectedName] = useState("");
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);

  const router = useRouter();

  const handleSelectChange = (event) => {
    const selectedName = event.target.value;
    const selectedObject = data.find((item) => item.name === selectedName);

    setSelectedName(selectedName);
    if (selectedObject) {
      setSelectedSyllabus(selectedObject.syllabus);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-blue-100 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center">
        <div className="flex flex-col justify-center items-center">
          {!selectedSyllabus && (
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
                  router.push(`/eceku`);
                }}
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      </div>
      {selectedSyllabus && <EceCgpa syllabus={selectedSyllabus}></EceCgpa>}
    </div>
  );
}

// export async function getServerSideProps() {
//   //   const response = await fetch("http://localhost:3000/api/hello");
//   const response = await fetch(
//     "https://cgpagpacalculation.vercel.app/api/hello"
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
  );
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}
