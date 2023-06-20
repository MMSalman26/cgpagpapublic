import React from "react";

const TableBaseAttendance = (props) => {
  return (
    <table className="table w-full text-lg">
      <thead className="bg-slate-800 text-cyan-300">
        <tr>
          <th>Attendance</th>
          <th>Marks</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item) => (
          <tr
            key={Math.random()}
            className="odd:bg-indigo-950 even:bg-blue-950 text-cyan-100 font-semibold"
          >
            <td>{item.attendance}</td>
            <td>{item.marks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableBaseAttendance;
