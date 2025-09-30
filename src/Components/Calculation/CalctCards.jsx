/* eslint-disable prettier/prettier */
import React from "react";
// import { useAppContext } from "../../Context/AppContextProvider";
// import { removeStructureFromRoomAction } from "../../Context/AppActionsCreators";
// import { CalctCard } from "./CalctCard";
import { removeStructureFromRoomAction } from "../../Context/AppActionsCreators";
import { useAppContext } from "../../Context/AppContextProvider";

export const CalctCards = ({ room, setEditingStructure, apt }) => {
  const { dispatch } = useAppContext();
  //   const p27 = 18;
  //   const { dispatch } = useAppContext();
  const sumS27 = room.structures.reduce((sum, s) => {
    const s27 = s.s27;
    // (s.i27 || 0) * (s.j27 || 0) * (s.M27 || 0) * (s.q27 || 0) * (s.r27 || 0);
    return sum + s27;
  }, 0);

  const sumS = sumS27 / 1000;
  // let firstVitrazhUses = false;
  const sumAg27 = room.structures.reduce((sum, s) => {
    // const t27 = (s.i27 || 0) * (s.j27 || 0) * (s.P27 || 0);
    // let x27, af27, ac27;
    // if (s.type === "იატაკი" || s.type === "ჭერი") {
    //   x27 = 1;
    //   af27 = 1;
    //   ac27 = 1;
    // } else if (s.type === "ვიტრაჟი" && !firstVitrazhUses) {
    //   x27 = 0.4 * (s.v27 || 0) * (s.i27 || 0);
    //   ac27 = 120 * (s.z27 || 0);
    //   af27 = (s.Mm27 || 0) * 11;
    //   firstVitrazhUses = true;
    // } else {
    //   x27 = 1;
    //   af27 = 1;
    //   ac27 = 1;
    // }

    const ag27 = s.af27 + s.ac27 + s.x27 + s.t27;

    return sum + ag27;
  }, 0);
  // z27=xalxi,, Mm27 == kv ,
  const sumG = sumAg27 / 1000;
  return (
    <div className="p-4 border rounded-lg bg-gray-200">
      {/* 🟡 ოთახის საერთო ინფორმაცია */}
      <div className="mb-4 p-3 rounded-lg bg-white shadow">
        <h3 className="text-lg font-bold mb-2">ოთახის პარამეტრები</h3>
        <div className="grid grid-cols-2 gap-2 text-[15px] text-gray-700">
          <div>
            <span className="font-semibold">ორიენტაცია:</span>{" "}
            {room.sunnyLabel || "უცნობი"}
          </div>
          <div>
            <span className="font-semibold">ფართობი (m²):</span>{" "}
            {room.m2 || "—"}
          </div>
          <div>
            <span className="font-semibold">მაცხოვრებელი:</span>{" "}
            {room.humans || 0}
          </div>
          <div>
            <span className="font-semibold">ტემპერატურა:</span>{" "}
            {room.Temp || "—"}°C
          </div>
        </div>
      </div>

      {/* 🟡 სტრუქტურების ჩამონათვალი */}
      <ul className="pl-5 list-disc text-sm mt-2 space-y-3">
        {room.structures.map((s, i) => (
          <li key={i} className="bg-white p-2 rounded shadow-sm">
            <div className="font-semibold text-[15px] p-2 text-gray-800">
              {s.type} –{" "}
              {s.type === "იატაკი" || s.type === "ჭერი"
                ? "მთლიანი კვადრატის არეალით"
                : `სიგრძე: ${s.length}მ x სიმაღლე: ${s.height}მ`}
            </div>

            {/* ღილაკები */}
            <div className="flex gap-3 mt-1 text-sm">
              {s.type === "იატაკი" || s.type === "ჭერი" ? null : (
                // <button

                //   className="text-blue-600 hover:underline"
                // >

                // </button>
                <button
                  onClick={() => {
                    setEditingStructure({
                      aptId: apt.id,
                      roomId: room.id,
                      structureIndex: i,
                      structure: s,
                    });
                  }}
                  className="inline-flex items-center justify-center p-2  rounded-md  text-blue-600 text-sm font-medium transition-all duration-200 ease-in-out delay-75  hover:-translate-y-1 hover:scale-110 active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 16 16"
                    stroke="currentColor"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                  </svg>
                  გამოსწორება
                </button>
              )}
              <button
                onClick={() => {
                  if (confirm("ნამდვილად გსურს წაშლა?")) {
                    dispatch(removeStructureFromRoomAction(apt.id, room.id, i));
                  }
                }}
                className="inline-flex items-center justify-center p-2  rounded-md  text-red-600 text-sm font-medium transition-all duration-200 ease-in-out delay-75  hover:-translate-y-1 hover:scale-110 active:scale-95"
              >
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                  ></path>
                </svg>
                წაშლა
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 🟡 ჯამური მონაცემები */}
      <div className="mt-4 text-right space-y-1">
        {/* <div className="font-semibold text-blue-600">
          ჯამური ფართობი:{" "}
          {room.structures.reduce((sum, s) => sum + Number(s.i27 || 0), 0)} მ²
        </div> */}
        <h5 className="font-semibold text-lg text-blue-600">
          სითბოს დანაკარგი (kW): {sumS.toFixed(2)}
        </h5>
        <h5 className="font-semibold text-lg text-red-600">
          სითბოს შემოსავალი (kW): {sumG.toFixed(2)}
        </h5>
      </div>
    </div>
  );
};
