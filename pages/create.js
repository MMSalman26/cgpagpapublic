import GradingSystemForm from "@/components/Extras/GradingSystemForm";
import { useState } from "react";

export default function Home(props) {
  return (
    <div className="min-h-screen w-screen bg-blue-100 flex flex-col justify-center items-center">
      <GradingSystemForm></GradingSystemForm>
    </div>
  );
}
