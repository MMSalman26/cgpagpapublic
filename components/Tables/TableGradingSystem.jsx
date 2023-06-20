import React from "react";

const TableGradingSystem = (props) => {
  return (
    <table className="table my-12 w-full text-lg">
      <thead className="bg-slate-800 text-cyan-300">
        <tr>
          <th>Numerical Grade</th>
          <th>Letter Grade</th>
          <th>Grade Point</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item) => (
          <tr
            key={Math.random()}
            className="odd:bg-indigo-950 even:bg-blue-950 text-cyan-100 font-semibold"
          >
            <td>{item.NumericalGrade}</td>
            <td>{item.LetterGrade}</td>
            <td>{item.GradePoint}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableGradingSystem;
