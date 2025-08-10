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
    roomtemp: "",
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
  const handleAdd = () => {
    if (!form.type || !form.length || !form.height || !form.quantity) return;

    const F27 = Number(form.length);
    const G27 = Number(form.height);
    const H27 = Number(form.quantity);
    // const z27 = Number(form.humans);
    const I27 = F27 * G27 * H27;

    // აქ პირდაპირ ოთახის m² ვიღებთ
    const ae27 = Number(currentRoom?.m2) || 0;
    const v27 = Number(currentRoom?.sunny) || 0;
    const z27 = Number(currentRoom?.humans) || 0;

    const selected = structureTypes.find((t) => t.label === form.type);
    const D27 = selected ? selected.j27 : 0;
    // const selectedsunny = sunTypes.find((t) => t.label === form.sunny);

    const fullStructure = {
      ...form,
      i27: I27,
      j27: D27,
      k27: selected?.k27 ?? null,
      M27: selected?.M27 ?? null,
      q27: selected?.q27 ?? null,
      r27: selected?.r27 ?? null,
      v27,
      z27,
      ae27, // ✅ ყოველთვის ოთახის საერთო m²
    };

    onAddStructure(fullStructure);

    setForm({
      roomtemp: "",
      type: "",
      length: "",
      height: "",
      quantity: "1",
      sunny: "",
      humans: "1",
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
        length: editingStructure.length ?? "",
        height: editingStructure.height ?? "",
        quantity: editingStructure.quantity ?? "1",
        // sunny: editingStructure.sunny ?? "",
        // humans: editingStructure.humans ?? "1",
        // m2: editingStructure.m2 ?? currentRoom?.m2 || "",
      });
    }
  }, [editingStructure, currentRoom]);

  return (
    <div className="flex gap-2 mb-2 items-center flex-wrap">
      <select
        name="type"
        value={form.type}
        onChange={ChangeInput}
        className="border p-2"
      >
        <option value="">აირჩიე სტრუქტურა</option>
        {structureTypes.map((t) => (
          <option key={t.label} value={t.label}>
            {t.label}
          </option>
        ))}
      </select>

      <input
        name="roomtemp"
        type="number"
        placeholder="ოთახის (ტმპ)"
        value={form.roomtemp}
        onChange={ChangeInput}
        className="border p-2 w-28"
      />

      <input
        name="length"
        type="number"
        placeholder="სიგრძე (მ)"
        value={form.length}
        onChange={ChangeInput}
        className="border p-2 w-28"
      />

      <input
        name="height"
        type="number"
        placeholder="სიმაღლე (მ)"
        value={form.height}
        onChange={ChangeInput}
        className="border p-2 w-28"
      />

      <select
        name="quantity"
        value={form.quantity}
        onChange={ChangeInput}
        className="border p-2"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

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
        <button
          onClick={handleAdd}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          {editingStructure ? "შენახვა" : "დამატება"}
        </button>

        {editingStructure && (
          <button
            onClick={cancelEdit}
            className="bg-gray-400 text-white px-3 py-1 rounded"
          >
            გაუქმება
          </button>
        )}
      </div>
    </div>
  );
};
