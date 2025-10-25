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

    const ag27 = s.ag27;

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
          <div className="flex justify-between items-center">
            <div className="font-semibold text-[15px] p-2 text-gray-800">
              {s.type} –{" "}
              {s.type === "იატაკი" || s.type === "ჭერი"
                ? "მთლიანი კვადრატის არეალით"
                : `სიგრძე: ${s.length}მ x სიმაღლე: ${s.height}მ`}
            </div>
                {/* <div className="text-[15px] pr-10 font-medium text-red-600 cursor-pointer"> */}
                    
                    

{s.priort ?  <div className="relative inline-block group">
      <button
        className="relative hover:scale-110 px-10 top-2 text-sm font-semibold text-orange-600 rounded-xl  transition-all duration-300 overflow-hidden"
      >
        <div className="absolute inset-0  blur-xl group-hover:opacity-75 transition-opacity" />
        <span className="relative flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            className="w-4 h-4"
          >
            <path
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
{s.priort || ""}
        </span>
      </button>

      {/* Tooltip */}
      <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2 z-50">
        <div className="relative p-4 bg-gradient-to-br from-orange-500/95 to-red-700/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(79,70,229,0.15)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-red-300"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-white">
              მნიშვნელოვანია!
            </h3>
          </div>

          <div className="space-y-2">
<p className="text-sm text-gray-300">
  ეს სტრუქტურა პრიორიტეტულია — ერთდროულად მხოლოდ ერთი შეიძლება იყოს.  
  თუ წაშლით, შემდეგში შეგიძლიათ ახალი დაამატოთ.  
  პირველად დამატებისას გაითვალისწინეთ: ვიტრაჟი, ფანჯარა და მინის კარი არის პრიორიტეტული სტრუქტურები.
</p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                />
              </svg>
              <span>Premium Feature</span>
            </div>
          </div>

          {/* background blur overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl opacity-50" />

          {/* arrow */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-red-700/95 to-red-500/95 rotate-45 border-r border-b border-white/10" />
        </div>
      </div>
    </div>

  : null}

  
                {/* </div> */}
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
        <h5 className="font-semibold text-lg text-red-600">
          სითბოს დანაკარგი (kW): {sumS.toFixed(2)}
        </h5>
        <h5 className="font-semibold text-lg text-blue-600">
          სითბოს შემოსავალი (kW): {sumG.toFixed(2)}
        </h5>
      </div>
    </div>
  );
};
