import EceCgpa from "@/components/EceCgpa/EceCgpa";
import AddEceSyllabus from "@/components/Extras/AddEceSyllabus";

export default function home() {
  return (
    <div className="min-h-screen w-screen bg-blue-100 flex flex-col justify-center items-center">
      <AddEceSyllabus></AddEceSyllabus>
    </div>
  );
}
