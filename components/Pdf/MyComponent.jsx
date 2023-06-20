import React from "react";
import jsPDF from "jspdf";

const MyComponent = () => {
  const downloadPDF = () => {
    const report = new jsPDF("portrait", "pt", "a4");
    report.html(document.querySelector("#report")).then(() => {
      report.save("report.pdf");
    });
  };
  return (
    <div>
      <div className="hidden">
        <div
          className="w-[595px] h-[600px] flex justify-center items-center flex-col"
          id="report"
        >
          <div className="h-fit w-[595px] bg-blue-300 p-8 font-semibold flex justify-center items-center flex-col rounded-lg">
            <h1 className="text-center">My Content</h1>
            <p className="text-center">This is the content of my component.</p>
            <p className="text-center">This is the content of my component.</p>
          </div>
        </div>
      </div>
      <button onClick={downloadPDF}>Download as PDF</button>
    </div>
  );
};

export default MyComponent;
