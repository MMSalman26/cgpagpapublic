import React from "react";
import TableGradingSystem from "./TableGradingSystem";
import TableBaseAttendance from "./TableBaseAttendance";

const ManageTables = (props) => {
  const GradingSystemData = [];
  props.data.marksPercentage.map((marks, index) => {
    if (index == 0) {
      const obj = {
        NumericalGrade: `${marks.start}% or Above`,
        LetterGrade: `${marks.letterGrade}`,
        GradePoint: `${marks.gradePoint}`,
      };
      GradingSystemData.push(obj);
    } else if (index == props.data.marksPercentage.length - 1) {
      const obj = {
        NumericalGrade: `less than ${parseFloat(marks.end) + 1}%`,
        LetterGrade: `${marks.letterGrade}`,
        GradePoint: `${marks.gradePoint}`,
      };
      GradingSystemData.push(obj);
    } else {
      const obj = {
        NumericalGrade: `${marks.start}% to less than ${
          parseFloat(marks.end) + 1
        }%`,
        LetterGrade: `${marks.letterGrade}`,
        GradePoint: `${marks.gradePoint}`,
      };
      GradingSystemData.push(obj);
    }
  });

  const BaseAttendanceData = [];

  props.data.attendancePercentage.map((marks, index) => {
    if (index == 0) {
      const obj = {
        attendance: `${marks.start}% or Above`,
        marks: `${marks.marks}`,
      };
      BaseAttendanceData.push(obj);
    } else if (index == props.data.attendancePercentage.length - 1) {
      const obj = {
        attendance: `less than ${parseFloat(marks.end) + 1}%`,
        marks: `${marks.marks}`,
      };
      BaseAttendanceData.push(obj);
    } else {
      const obj = {
        attendance: `${marks.start}% to less than ${
          parseFloat(marks.end) + 1
        }%`,
        marks: `${marks.marks}`,
      };
      BaseAttendanceData.push(obj);
    }
  });
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="w-[90%] md:w-[700px] flex justify-center items-center">
        <TableGradingSystem data={GradingSystemData}></TableGradingSystem>
      </div>
      <div className="w-[90%] md:w-[700px] flex justify-center items-center">
        <TableBaseAttendance data={BaseAttendanceData}></TableBaseAttendance>
      </div>
      <div className="text-center text-xl my-8 font-semibold">
        Retake Course Deduction Point : {props.data.deductionMark}
      </div>
    </div>
  );
};

export default ManageTables;
