/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { structureTypes } from "../../Constants/structureTypes";
import { useAppContext } from "../../Context/AppContextProvider";

const sunTypes = [
  { label: "აღმ", v27: 560 }, //570
  { label: "დას", v27: 110 }, //570
  { label: "სამ", v27: 160 }, //280
  { label: "ჩრდ", v27: 160 }, //100
  { label: "სა-აღ", v27: 150 }, ///450
  { label: "სა-და", v27: 440 }, // 450
  { label: "ჩრ-აღ", v27: 430 }, //430
  { label: "ჩრ-და", v27: 150 }, //430
];

export const StructureForm = ({
  apartmentId,
  roomId,
  onAddStructure,
  editingStructure,
  cancelEdit,
}) => {
  const { state } = useAppContext();

  const currentRoom = state.hvacItems
    .flatMap((floor) => floor.apartments)
    .find((apt) => apt.id === apartmentId)
    ?.rooms.find((room) => room.id === roomId);

  const PRIORITY_TYPES = ["ვიტრაჟი", "ფანჯარა"];
  const FLOR_TYPES = ["იატაკი გრ", "იატაკი", "მინის ჭერი", "ჭერი"];
  const [form, setForm] = useState({
    type: "",
    width: "",
    height: "",
    quantity: "1",
    sunny: "",
    m2: currentRoom?.m2 || "",
  });

  const [ErStructure, setErStructure] = useState(false);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      m2: currentRoom?.m2 || "",
    }));
  }, [currentRoom]);

  const handleAdd = () => {
    // if () {
    //   setErStructure(true);
    //   return;
    // }
    if (FLOR_TYPES.includes(form.type)) {
      if (!form.m2) {
        setErStructure(true);
        return;
      }
    } else if (!form.type || !form.width || !form.height || !form.quantity) {
      setErStructure(true);
      return;
    }

    // თუ ეს არის პრიორიტეტული ტიპი, უნდა იყოს არჩეული sunny
    if (PRIORITY_TYPES.includes(form.type) && !form.sunny) {
      setErStructure(true);
      return;
    }

    setErStructure(false);

    const F27 = Number(form.width);
    const G27 = Number(form.height);
    const H27 = Number(form.quantity);
    let I27 = 0;
    if (FLOR_TYPES.includes(form.type)) {
      I27 = Number(form.m2);
    } else {
      I27 = F27 * G27 * H27;
    }
    const Mm27 = Number(currentRoom?.m2) || 0;
    const z27 = Number(currentRoom?.humans || 0);
    const K27 = Number(currentRoom?.Temp);
    const N27 = Number(currentRoom?.Temp);
    const selectedsunny = sunTypes.find((t) => t.label === form.sunny) || {};
    const sunnyLabel = selectedsunny?.label || "უცნობი";

    const selected = structureTypes.find((t) => t.label === form.type);
    const L27 = Number(selected.L27);
    const O27 = Number(selected?.O27);
    const P27 = O27 - N27;
    const M27 = K27 - L27;
    const J27 = selected ? selected.j27 : 0;

    const s27 =
      I27 *
      (J27 || 0) *
      (M27 || 0) *
      (selected?.q27 || 0) *
      (selected?.r27 || 0);

    const t27 = I27 * (J27 || 0) * (selected?.P27 || 0);

    let x27 = 0,
      af27 = 0,
      ac27 = 0,
      priort = "",
      w27 = 0,
      y27 = "",
      aa27 = 0,
      ab27 = 0,
      ad27 = 0;

    // 👉 აქ ვცვლით ლოგიკას: PRIORITY_TYPES ყოველთვის ითვლება
    // if (form.type === "იატაკი" || form.type === "ჭერი") {
    //   x27 = 0;
    //   af27 = 0;
    //   ac27 = 0;
    // } else
    if (PRIORITY_TYPES.includes(form.type)) {
      // პრიორიტეტული ტიპი ყოველთვის ითვლება
      x27 = 0.4 * (selectedsunny.v27 || 0) * I27;
      ac27 = 120 * (z27 || 0);
      af27 = Mm27 * 5;
      priort = "პრიორიტეტი!";
      w27 = 0.4;
      y27 = "ადამიანი";
      aa27 = 120;
      ab27 = 1;
      ad27 = 5; //11
    } else {
      x27 = 0;
      af27 = 0;
      ac27 = 0;
    }

    const ag27 = af27 + ac27 + x27 + t27;

    const fullStructure = {
      ...form,
      i27: I27,
      j27: J27,
      L27: L27 ?? null,
      k27: K27 ?? null,
      M27: M27 ?? null,
      N27: N27 ?? null,
      O27: O27 ?? null,
      P27: P27 ?? null,
      q27: selected?.q27 ?? null,
      r27: selected?.r27 ?? null,
      sunnyLabel,
      v27: selectedsunny.v27 || 0,
      w27,
      x27,
      y27,
      z27,
      aa27,
      ab27,
      ac27,
      ad27,
      Mm27,
      af27,
      ag27,
      s27,
      t27,
      priort,
      Temp: currentRoom?.Temp || "",
    };

    onAddStructure(fullStructure);

    setForm({
      type: "",
      width: "",
      height: "",
      quantity: "1",
      sunny: "",
    });
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
        width: editingStructure.width ?? "",
        height: editingStructure.height ?? "",
        quantity: editingStructure.quantity ?? "1",
        sunny: editingStructure.sunny ?? "",
      });
    }
  }, [editingStructure, currentRoom]);

  const cancel = () => {
    cancelEdit();
    setForm({
      type: "",
      width: "",
      height: "",
      quantity: "1",
      sunny: "",
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 mb-2 items-center flex-wrap">
        {/* სტრუქტურის ტიპი */}
        <div className="flex flex-col">
          <div className="rounded-md bg-[#222222]">
            <select
              name="type"
              value={form.type}
              onChange={ChangeInput}
              // className="w-[180px] text-zinc-500 h-[40px] border-2 rounded-md px-5 font-bold bg-[#e8e8e8] border-[#222222]"
              className={`w-[180px] h-[40px] border-2 rounded-md px-5 font-bold text-zinc-500  bg-[#e8e8e8] text-[15px] font-sans transition-transform duration-100 ease-out focus:outline-none focus:-translate-y-[3px] placeholder:text-[#646464] placeholder:font-bold placeholder:text-[15px] ${"border-[#222222]"}`}
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
        {FLOR_TYPES.includes(form.type) ? (
          <div className="flex flex-col">
            <div className="rounded-md bg-[#222222]">
              <input
                name="m2"
                value={form.m2}
                onChange={ChangeInput}
                type="number"
                placeholder="ფართობი (მ²)"
                required
                className={`w-[180px] h-[40px] border-2 rounded-md px-5 font-bold text-zinc-500  bg-[#e8e8e8] text-[15px] font-sans transition-transform duration-100 ease-out focus:outline-none focus:-translate-y-[3px] placeholder:text-[#646464] placeholder:font-bold placeholder:text-[15px] ${"border-[#222222]"}`}
              />
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              name="width"
              type="number"
              placeholder="სიგანე (მ)"
              value={form.width}
              onChange={ChangeInput}
              className={`w-[150px] h-[40px] border-2 rounded-md px-5 font-bold text-zinc-500  bg-[#e8e8e8] text-[15px] font-sans transition-transform duration-100 ease-out focus:outline-none focus:-translate-y-[3px] placeholder:text-[#807f7f] placeholder:font-bold placeholder:text-[15px] ${"border-[#222222]"}`}
            />

            <input
              name="height"
              type="number"
              placeholder="სიმაღლე (მ)"
              value={form.height}
              onChange={ChangeInput}
              className={`w-[170px] h-[40px] border-2 rounded-md px-5 font-bold text-zinc-500  bg-[#e8e8e8] text-[15px] font-sans transition-transform duration-100 ease-out focus:outline-none focus:-translate-y-[3px] placeholder:text-[#807f7f] placeholder:font-bold placeholder:text-[15px] ${"border-[#222222]"}`}
            />

            <select
              name="quantity"
              value={form.quantity}
              onChange={ChangeInput}
              className={`w-[90px] h-[40px] border-2 rounded-md px-5 font-bold text-zinc-500  bg-[#e8e8e8] text-[15px] font-sans transition-transform duration-100 ease-out focus:outline-none focus:-translate-y-[3px] placeholder:text-[#646464] placeholder:font-bold placeholder:text-[15px] ${"border-[#222222]"}`}
            >
              {[1, 2, 3].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* ზომები */}

        {/* 🌤 მხოლოდ ვიტრაჟისა და ფანჯრისას გამოვაჩინოთ */}
        {PRIORITY_TYPES.includes(form.type) && (
          <div className="flex flex-col">
            <div className="rounded-md bg-[#222222]">
              <select
                name="sunny"
                value={form.sunny}
                onChange={ChangeInput}
                className="w-[170px] h-[40px] border-2 rounded-md px-5 font-bold text-zinc-500 bg-[#e8e8e8]"
              >
                <option value="">ორიენტაცია</option>
                {sunTypes.map((t) => (
                  <option key={t.label} value={t.label}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ღილაკები */}
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className="bg-yellow-500 font-semibold text-sm border-2 border-black rounded-md shadow-[0.1em_0.1em_0px_0px_rgba(0,0,0,1)] p-2 hover:-translate-x-[0.05em] hover:-translate-y-[0.05em]"
          >
            {editingStructure ? "შენახვა" : "დამატება"}
          </button>

          {editingStructure && (
            <button
              onClick={cancel}
              className="bg-gray-400 font-semibold text-sm border-2 border-black rounded-md shadow-[0.1em_0.1em_0px_0px_rgba(0,0,0,1)] p-2 hover:-translate-x-[0.05em] hover:-translate-y-[0.05em]"
            >
              გაუქმება
            </button>
          )}
        </div>
      </div>

      {ErStructure && (
        <p className="text-red-600 font-semibold animate-bounce">
          შეავსეთ ყველა აუცილებელი ველი!
        </p>
      )}
    </div>
  );
};
