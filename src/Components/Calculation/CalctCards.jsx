/* eslint-disable prettier/prettier */
import React from "react";
// import { useAppContext } from "../../Context/AppContextProvider";
// import { removeStructureFromRoomAction } from "../../Context/AppActionsCreators";
import { CalctCard } from "./CalctCard";

export const CalctCards = ({ room, setEditingStructure, apt }) => {
  //   const p27 = 18;
  //   const { dispatch } = useAppContext();
  const sumS27 = room.structures.reduce((sum, s) => {
    const s27 =
      (s.i27 || 0) * (s.j27 || 0) * (s.M27 || 0) * (s.q27 || 0) * (s.r27 || 0);
    return sum + s27;
  }, 0);

  const sum = sumS27 / 1000;
  const sumAg27 = room.structures.reduce((sum, s) => {
    // გამოთვალე ინდივიდუალურად ag27 თითოეულ სტრუქტურაზე

    const t27 = (s.i27 || 0) * (s.j27 || 0) * 18;
    const x27 = 0.4 * (s.v27 || 0) * (s.i27 || 0);
    const ac27 = 1 * 120 * (s.z27 || 0);
    const af27 = (s.ae27 || 0) * 11;
    const ag27 = af27 + ac27 + x27 + t27;
    return sum + ag27;
  }, 0);

  const sumG = sumAg27 / 1000;
  return (
    <div>
      {" "}
      <ul className="pl-5 list-disc text-sm mt-2">
        {room.structures.map((s, i) => (
          //   <li key={i}>
          //     {s.type} – {s.length}მ x {s.height}მ = {s.i27} მ² | კოეფიციენტი (k):{" "}
          //     {s.k} | k27: {s.k27 ?? "?"} | M27: {s.M27 ?? "?"} |{" "}
          //     {s.length * s.height}
          //     <div className="flex pl-20 flex-row gap-2 mt-2">
          //       <button
          //         onClick={() => {
          //           setEditingStructure({
          //             aptId: apt.id,
          //             roomId: room.id,
          //             structureIndex: i,
          //             structure: s,
          //           });
          //         }}
          //         className="text-blue-600"
          //       >
          //         გამოსწორება
          //       </button>
          //       <button
          //         onClick={() => {
          //           if (confirm("ნამდვილად გსურს წაშლა?")) {
          //             dispatch(removeStructureFromRoomAction(apt.id, room.id, i));
          //           }
          //         }}
          //         className="text-red-600"
          //       >
          //         წაშლა
          //       </button>
          //     </div>
          //   </li>
          <CalctCard
            key={i}
            props={s}
            setEditingStructure={setEditingStructure}
            apt={apt}
          />
        ))}
      </ul>
      {/* ✅ i27 ჯამი */}
      <div className="mt-2 text-right font-semibold text-blue-600">
        ჯამური ფართობი:{" "}
        {room.structures.reduce((sum, s) => sum + Number(s.i27 || 0), 0)} მ²
      </div>
      <div>
        <ul className="pl-5 list-disc text-sm mt-2">
          {room.structures.map((s, i) => (
            <CalctCard
              key={i}
              props={s}
              setEditingStructure={setEditingStructure}
              apt={apt}
            />
          ))}
        </ul>
        <div className="mt-2 text-right font-semibold text-blue-600">
          ჯამური ფართობი (SUM S27/1000): {sum.toFixed(2)}{" "}
          {/* ციფრების ოდენობა შეგიძლია დაარეგულირო */}
        </div>

        <div className="mt-2 text-right font-semibold text-blue-600">
          ჯამური ფართობი (sumG S27/1000): {sumG.toFixed(2)}{" "}
          {/* ციფრების ოდენობა შეგიძლია დაარეგულირო */}
        </div>
      </div>
    </div>
  );
};
