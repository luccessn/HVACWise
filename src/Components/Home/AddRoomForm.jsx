/* eslint-disable prettier/prettier */
import React, { useState } from "react";
// import { structureTypes } from "../../Constants/structureTypes";
import { useAppContext } from "../../Context/AppContextProvider";

export const AddRoomForm = ({ onAddRoom, apartmentId }) => {
  const { state } = useAppContext();
  const [rmForm, setrmForm] = useState({
    name: "",
    m2: "",
    humans: "",
    roomtemp: "",
  });
  const [roomError, setroomError] = useState("");
  const currentApart = state.hvacItems
    ?.flatMap((floor) => floor.apartments ?? [])
    .find((app) => app.id === apartmentId);
  const allRoomNames =
    currentApart?.rooms?.map((room) => room.name.toLowerCase().trim()) ?? [];
  const handleAdd = () => {
    if (!rmForm.name || !rmForm.m2 || !rmForm.humans || !rmForm.roomtemp) {
      setroomError("შეავსეთ მოცემული ველები!");
      return;
    } else if (allRoomNames.includes(rmForm.name)) {
      setroomError("ოთახის ეს სახელი უკვე გამოყენებულია!");
    } else {
      setroomError("");
      // const floorType = structureTypes.find((s) => s.label === "იატაკი");
      // const ceilingType = structureTypes.find((s) => s.label === "ჭერი");
      // const z27 = Number(rmForm.humans);
      // // const I27 = Number(rmForm.m2);
      // const Mm27 = Number(rmForm.m2);

      //გაომთვლა
      // const s27flor =
      //   Mm27 *
      //   (floorType?.j27 || 0) *
      //   (floorType?.M27 || 0) *
      //   (floorType?.q27 || 0) *
      //   (floorType?.r27 || 0);

      // const t27flor = Mm27 * (floorType?.j27 || 0) * (floorType?.P27 || 0);
      // const ag27flor = t27flor;
      // const floor = {
      //   type: "იატაკი",
      //   // i27: I27,
      //   j27: floorType?.j27 ?? null,

      //   k27: floorType?.k27 ?? null,
      //   L27: floorType?.k27 ?? null,
      //   M27: floorType?.M27 ?? null,

      //   N27: floorType?.N27 ?? null,
      //   O27: floorType?.O27 ?? null,
      //   P27: floorType?.P27 ?? null,

      //   q27: floorType?.q27 ?? null,
      //   r27: floorType?.r27 ?? null,

      //   z27,
      //   Mm27: Mm27,
      //   s27: s27flor,
      //   t27: t27flor,
      //   ag27: ag27flor,
      //   x27: 0,
      //   af27: 1,
      //   ac27: 1,
      // };
      // const s27ceil =
      //   Mm27 *
      //   (ceilingType?.j27 || 0) *
      //   (ceilingType?.M27 || 0) *
      //   (ceilingType?.q27 || 0) *
      //   (ceilingType?.r27 || 0);

      // const t27ceil = Mm27 * (ceilingType?.j27 || 0) * (ceilingType?.P27 || 0);
      // const ag27ceil = t27ceil;

      // const ceiling = {
      //   type: "ჭერი",
      //   // i27: I27,
      //   j27: ceilingType?.j27 ?? null,

      //   k27: ceilingType?.k27 ?? null,
      //   L27: ceilingType?.k27 ?? null,
      //   M27: ceilingType?.M27 ?? null,

      //   N27: ceilingType?.N27 ?? null,
      //   O27: ceilingType?.O27 ?? null,
      //   P27: ceilingType?.P27 ?? null,

      //   q27: ceilingType?.q27 ?? null,
      //   r27: ceilingType?.r27 ?? null,

      //   z27,
      //   Mm27: Mm27,
      //   s27: s27ceil,
      //   t27: t27ceil,
      //   ag27: ag27ceil,

      //   x27: 0,
      //   af27: 1,
      //   ac27: 1,

      //   Temp: rmForm.roomtemp,
      // };

      const newRoom = {
        name: rmForm.name.trim(),
        m2: Number(rmForm.m2),
        humans: Number(rmForm.humans),
        // structures: [floor, ceiling],
        Temp: rmForm.roomtemp,
      };

      onAddRoom(newRoom);

      setrmForm({
        name: "",
        m2: "",
        humans: "",
        roomtemp: "",
      });
    }
  };

  const ChangeInput = (e) => {
    const { name, value } = e.target;
    setrmForm((prev) => ({ ...prev, [name]: value }));

    // თუ ველები არ არის შევსებული → ერორი
    if (
      !rmForm.name ||
      !rmForm.m2 ||
      !rmForm.sunny ||
      !rmForm.humans ||
      !rmForm.roomtemp
    ) {
      setroomError("შეავსეთ მოცემული ველები!");
      return;
    }

    // მხოლოდ სახელის უნიკალურობაზე შემოწმება
    if (allRoomNames.includes(value.toLowerCase().trim()) && name === "name") {
      setroomError("ოთახის ეს სახელი უკვე გამოყენებულია!");
    } else {
      setroomError("");
    }
  };
  // const [touched, setTouched] = useState(false);

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {/* <input
        name="name"
        type="text"
        placeholder="ოთახის სახელი"
        value={rmForm.name}
        onChange={ChangeInput}
        className="border p-2"
      /> */}
      {/* <input
        name="name"
        type="text"
        placeholder="ოთახის სახელი"
        value={rmForm.name}
        onChange={ChangeInput}
        className="
    w-full max-w-[220px] h-[45px] p-3 
    rounded-xl border-[1.5px] border-gray-300 
    outline-none 
    transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] 
    shadow-[0_0_20px_-18px_rgba(0,0,0,0.25)]
    hover:border-2 hover:border-gray-300 hover:shadow-[0_0_20px_-17px_rgba(0,0,0,0.25)]
    active:scale-95
    focus:border-2 focus:border-gray-500
  "
      /> */}
      <div className="flex flex-col">
        <div
          className={`rounded-md transition-colors duration-100 ease-out ${"bg-[#222222]"}`}
        >
          <input
            name="name"
            value={rmForm.name}
            onChange={ChangeInput}
            type="text"
            placeholder="ოთახის სახელი"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            required
            // onBlur={() => setTouched(true)}
            className={`w-[200px] h-[50px] border-2 rounded-md px-5 font-bold text-zinc-500   bg-[#e8e8e8] text-[15px] font-sans transition-transform duration-100 ease-out focus:outline-none focus:-translate-y-[3px] placeholder:text-[#646464] placeholder:font-bold placeholder:text-[15px] ${"border-[#222222]"}`}
          />
        </div>
        {/* <p
          className={`mt-1 text-[11px] select-none transition-colors duration-100 ease-out ${
            touched ? "text-[#f25f5c]" : "text-[#e8e8e8]"
          }`}
        >
          ოთახის სახელი უკვე გამოყენებულია!
        </p> */}
      </div>

      {/* <input
        name="m2"
        type="number"
        placeholder="ოთახის ფართობი (მ²)"
        value={rmForm.m2}
        onChange={ChangeInput}
        className="border p-2 w-28"
      /> */}
      <div className="flex flex-col">
        <div
          className={`rounded-md transition-colors duration-100 ease-out ${"bg-[#222222]"}`}
        >
          <input
            name="m2"
            value={rmForm.m2}
            onChange={ChangeInput}
            type="number"
            placeholder="ფართობი (მ²)"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            required
            // onBlur={() => setTouched(true)}
            className={`w-[180px] h-[50px] border-2 rounded-md px-5 font-bold text-zinc-500  bg-[#e8e8e8] text-[15px] font-sans transition-transform duration-100 ease-out focus:outline-none focus:-translate-y-[3px] placeholder:text-[#646464] placeholder:font-bold placeholder:text-[15px] ${"border-[#222222]"}`}
          />
        </div>
        {/* <p
          className={`mt-1 text-[11px] select-none transition-colors duration-100 ease-out ${
            touched ? "text-[#f25f5c]" : "text-[#e8e8e8]"
          }`}
        >
          ოთახის სახელი უკვე გამოყენებულია!
        </p> */}
      </div>
      {/* <input
        name="roomtemp"
        type="number"
        placeholder="ოთახის ტემპერატურა (TP²)"
        value={rmForm.roomtemp}
        onChange={ChangeInput}
        className="border p-2 w-28"
      /> */}
      <div className="flex flex-col">
        <div
          className={`rounded-md transition-colors duration-100 ease-out ${"bg-[#222222]"}`}
        >
          <input
            value={rmForm.roomtemp}
            onChange={ChangeInput}
            name="roomtemp"
            type="number"
            placeholder="(TP²)"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            required
            // onBlur={() => setTouched(true)}
            className={`w-[130px] h-[50px] border-2 rounded-md px-5 font-bold  text-zinc-500  bg-[#e8e8e8] text-[15px] font-sans transition-transform duration-100 ease-out focus:outline-none focus:-translate-y-[3px] placeholder:text-[#646464] placeholder:font-bold placeholder:text-[15px] ${"border-[#222222]"}`}
          />
        </div>
        {/* <p
          className={`mt-1 text-[11px] select-none transition-colors duration-100 ease-out ${
            touched ? "text-[#f25f5c]" : "text-[#e8e8e8]"
          }`}
        >
          ოთახის სახელი უკვე გამოყენებულია!
        </p> */}
      </div>
      <div className="flex flex-col">
        <div
          className={`rounded-md transition-colors duration-100 ease-out ${"bg-[#222222]"}`}
        >
          <select
            name="humans"
            value={rmForm.humans}
            onChange={ChangeInput}
            className={`w-[150px] h-[50px] border-2 rounded-md px-5 font-bold text-zinc-500   bg-[#e8e8e8] text-[15px] font-sans transition-transform duration-100 ease-out focus:outline-none focus:-translate-y-[3px] placeholder:text-[#646464] placeholder:font-bold placeholder:text-[15px] ${"border-[#222222]"}`}
          >
            <option value="">მცხოვრების რაოდენობა</option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* <button className=" text-white px-4 py-2 rounded"></button> */}
      <button
        onClick={handleAdd}
        className="
     bg-green-600
        font-semibold
        
        text-sm
        border-2 border-black
        rounded-md
        shadow-[0.1em_0.1em_0px_0px_rgba(0,0,0,1)]
       p-2
        transition-transform
        active:translate-x-[0.05em] active:translate-y-[0.05em] active:shadow-[0.05em_0.05em_0px_0px_rgba(0,0,0,1)]
        hover:-translate-x-[0.05em] hover:-translate-y-[0.05em] hover:shadow-[0.15em_0.15em_0px_0px_rgba(0,0,0,1)]
      "
      >
        ოთახის დამატება{" "}
      </button>
      {/* <div className="relative inline-block group">
        <button
          onClick={handleAdd}
          className="relative p-3 text-sm font-semibold text-white bg-indigo-600/90 rounded-xl hover:bg-indigo-700/90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl group-hover:opacity-75 transition-opacity"></div>

          <span className="relative flex items-center gap-2">
            {/* <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              className="w-4 h-4"
            >
              <path
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg> 
            ოთახის დამატება
          </span>
        </button>

        <div className="absolute invisible  opacity-0 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2">
          <div className="relative p-4 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(79,70,229,0.15)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 text-indigo-400"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">
                მნიშვნელოვანი ინფორმაცია
              </h3>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-300">
                ოთახის მონაცემების შეცვლა ვეღარ მოხერხდება !
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  ></path>
                </svg>
                <span>მთავარი წესი</span>
              </div>
            </div>

            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl opacity-50"></div>

            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-gray-900/95 to-gray-800/95 rotate-45 border-r border-b border-white/10"></div>
          </div>
        </div>
      </div> */}
      <p className="text-red-600 font-semibold animate-bounce">{roomError}</p>
    </div>
  );
};
