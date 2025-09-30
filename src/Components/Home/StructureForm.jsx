/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { structureTypes } from "../../Constants/structureTypes";
import { useAppContext } from "../../Context/AppContextProvider";

// const sunTypes = [
//   { label: "აღმ", v27: 570 },
//   { label: "დას", v27: 570 },
//   { label: "სამ", v27: 280 },
//   { label: "ჩრდ", v27: 100 },
//   { label: "სა-აღ", v27: 450 },
//   { label: "სა-და", v27: 450 },
//   { label: "ჩრ-აღ", v27: 430 },
//   { label: "ჩრ-და", v27: 430 },
// ];

export const StructureForm = ({
  apartmentId,
  roomId,
  onAddStructure,
  editingStructure,
  cancelEdit,
}) => {
  const { state } = useAppContext();

  // ვპოულობთ ამჟამინდელ ოთახს state-იდან
  const currentRoom = state.hvacItems
    .flatMap((floor) => floor.apartments)
    .find((apt) => apt.id === apartmentId)
    ?.rooms.find((room) => room.id === roomId);

  const [form, setForm] = useState({
    type: "",
    length: "",
    height: "",
    quantity: "1",
    // sunny: "",
    // humans: "1",
    m2: currentRoom?.m2 || "", // ავტომატური ჩასმა
  });
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      m2: currentRoom?.m2 || "",
    }));
  }, [currentRoom]);

  const [ErStructure, setErStructure] = useState(false);
  // const currentApart = state.hvacItems
  //   ?.flatMap((floor) => floor.apartments ?? [])
  //   .find((app) => app.id === apartmentId);
  // const allSctructure =
  //   currentApart?.rooms?.map((room) => room.name.toLowerCase().trim()) ?? [];
  const handleAdd = () => {
    if (!form.type || !form.length || !form.height || !form.quantity) {
      setErStructure(true);
      return;
    } else {
      setErStructure(false);
      const F27 = Number(form.length);
      const G27 = Number(form.height);
      const H27 = Number(form.quantity);
      const I27 = F27 * G27 * H27;

      const Mm27 = Number(currentRoom?.m2) || 0;

      // ვამოწმებთ — თუ ეს არის პირველი სტრუქტურა ამ ოთახში
      // const isFirstStructure = (currentRoom?.structures?.length || 0) === 0;

      const v27 = Number(currentRoom?.sunny);
      const z27 = Number(currentRoom?.humans);
      const sunnyLabel = currentRoom?.sunnyLabel || "უცნობი";

      const selected = structureTypes.find((t) => t.label === form.type);
      const D27 = selected ? selected.j27 : 0;
      //გაომთვლა
      const s27 =
        I27 *
        (D27 || 0) *
        (selected?.M27 || 0) *
        (selected?.q27 || 0) *
        (selected?.r27 || 0);

      const t27 = I27 * (D27 || 0) * (selected?.P27 || 0);

      let x27, af27, ac27;
      // // ვამოწმებთ, უკვე არსებობს თუ არა ვიტრაჟი ოთახში
      const PRIORITY_TYPES = ["ვიტრაჟი", "ფანჯარა", "მინის კარი"];

      const alreadyHasVitrazh =
        currentRoom?.structures?.some((s) => PRIORITY_TYPES.includes(s.type)) ||
        false;
      const isPriorityType = PRIORITY_TYPES.includes(form.type);

      if (form.type === "იატაკი" || form.type === "ჭერი") {
        x27 = 1;
        af27 = 1;
        ac27 = 1;
      } else if (isPriorityType && !alreadyHasVitrazh) {
        // პირველი ვიტრაჟი
        x27 = 0.4 * (v27 || 0) * I27;
        ac27 = 120 * (z27 || 0);
        af27 = Mm27 * 11;
      } else {
        x27 = 1;
        af27 = 1;
        ac27 = 1;
      }
      const fullStructure = {
        ...form,
        i27: I27,
        j27: D27,

        L27: selected?.k27 ?? null,
        k27: selected?.k27 ?? null,
        M27: selected?.M27 ?? null,

        N27: selected?.N27 ?? null,
        O27: selected?.O27 ?? null,
        P27: selected?.P27 ?? null,

        q27: selected?.q27 ?? null,
        r27: selected?.r27 ?? null,
        //

        v27,
        sunnyLabel,
        z27,
        Mm27, // m² ყოველთვის
        //
        // ახალი ველები
        s27,
        t27,
        x27,
        af27,
        ac27,
        Temp: currentRoom?.Temp || "",
      };

      onAddStructure(fullStructure);

      setForm({
        roomtemp: "",
        type: "",
        length: "",
        height: "",
        quantity: "1",
        // sunny: "",
        // humans: "1",
      });
    }
  };
  const ChangeInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (editingStructure) {
      setForm({
        roomtemp: editingStructure.roomtemp ?? "",
        type: editingStructure.type ?? "",
        length: editingStructure.length ?? "",
        height: editingStructure.height ?? "",
        quantity: editingStructure.quantity ?? "1",
        // sunny: editingStructure.sunny ?? "",
        // humans: editingStructure.humans ?? "1",
        // m2: editingStructure.m2 ?? currentRoom?.m2 || "",
      });
    }
  }, [editingStructure, currentRoom]);
  const cancel = () => {
    cancelEdit();

    setForm({
      roomtemp: "",
      type: "",
      length: "",
      height: "",
      quantity: "1",
    });
  };
  return (
    <div className="flex flex-col">
      <div className="flex  gap-2 mb-2 items-center flex-wrap">
        <div className="flex flex-col">
          <div
            className={`rounded-md transition-colors duration-100 ease-out ${"bg-[#222222]"}`}
          >
            <select
              name="type"
              value={form.type}
              onChange={ChangeInput}
              className={`w-[180px] text-zinc-500  h-[40px] border-2 rounded-md px-5 font-bold  bg-[#e8e8e8] text-[15px] font-sans transition-transform duration-100 ease-out focus:outline-none focus:-translate-y-[3px] placeholder:text-[#646464] placeholder:font-bold placeholder:text-[15px] ${"border-[#222222]"}`}
            >
              <option value=""> სტრუქტურა</option>
              {structureTypes.map((t) => (
                <option key={t.label} value={t.label}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className={`rounded-md transition-colors duration-100 ease-out ${"bg-[#222222]"}`}
          >
            <input
              name="length"
              type="number"
              placeholder="სიგრძე (მ)"
              value={form.length}
              onChange={ChangeInput}
              className={`w-[150px] h-[40px] text-zinc-500  border-2 rounded-md px-5 font-bold  bg-[#e8e8e8] text-[15px] font-sans transition-transform duration-100 ease-out focus:outline-none focus:-translate-y-[3px] placeholder:text-[#646464] placeholder:font-bold placeholder:text-[15px] ${"border-[#222222]"}`}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className={`rounded-md transition-colors duration-100 ease-out ${"bg-[#222222]"}`}
          >
            <input
              name="height"
              type="number"
              placeholder="სიმაღლე (მ)"
              value={form.height}
              onChange={ChangeInput}
              className={`w-[170px] h-[40px] text-zinc-500  border-2 rounded-md px-5 font-bold  bg-[#e8e8e8] text-[15px] font-sans transition-transform duration-100 ease-out focus:outline-none focus:-translate-y-[3px] placeholder:text-[#646464] placeholder:font-bold placeholder:text-[15px] ${"border-[#222222]"}`}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className={`rounded-md transition-colors duration-100 ease-out ${"bg-[#222222]"}`}
          >
            <select
              name="quantity"
              value={form.quantity}
              onChange={ChangeInput}
              className={`w-[90px] h-[40px] text-zinc-500  border-2 rounded-md px-5  font-bold  bg-[#e8e8e8] text-[15px] font-sans transition-transform duration-100 ease-out focus:outline-none focus:-translate-y-[3px] placeholder:text-[#646464] placeholder:font-bold placeholder:text-[15px] ${"border-[#222222]"}`}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
        {/* <select
        name="sunny"
        value={form.sunny}
        onChange={ChangeInput}
        className="border p-2"
      >
        <option value="">აირჩიე ორიენტაცია</option>
        {sunTypes.map((t) => (
          <option key={t.label} value={t.label}>
            {t.label}
          </option>
        ))}
      </select>

      <select
        name="humans"
        value={form.humans}
        onChange={ChangeInput}
        className="border p-2"
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select> */}

        <div className="flex gap-2">
          {/* <button
          onClick={handleAdd}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          {editingStructure ? "შენახვა" : "დამატება"}
        </button> */}
          <button
            onClick={handleAdd}
            className="
bg-yellow-500        font-semibold
        
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
            {editingStructure ? "შენახვა" : "დამატება"}
          </button>
          {editingStructure && (
            // <button
            //   onClick={cancelEdit}
            //   className="bg-gray-400 text-white px-3 py-1 rounded"
            // >
            //   გაუქმება
            // </button>
            <button
              onClick={cancel}
              className="
bg-gray-400     font-semibold
        
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
              გაუქმება{" "}
            </button>
          )}
        </div>
      </div>
      {ErStructure && (
        <p className="text-red-600 font-semibold animate-bounce">
          შეავსეთ ყველა მოცემული ველი !
        </p>
      )}
    </div>
  );
};
