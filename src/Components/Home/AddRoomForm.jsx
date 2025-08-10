/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { structureTypes } from "../../Constants/structureTypes";

const sunTypes = [
  { label: "აღმ", v27: 570 },
  { label: "დას", v27: 570 },
  { label: "სამ", v27: 280 },
  { label: "ჩრდ", v27: 100 },
  { label: "სა-აღ", v27: 450 },
  { label: "სა-და", v27: 450 },
  { label: "ჩრ-აღ", v27: 430 },
  { label: "ჩრ-და", v27: 430 },
];

export const AddRoomForm = ({ onAddRoom }) => {
  const [rmForm, setrmForm] = useState({
    name: "",
    m2: "",
    sunny: "",
    humans: "",
  });

  const handleAdd = () => {
    if (!rmForm.name || !rmForm.m2) return;

    const floorType = structureTypes.find((s) => s.label === "იატაკი");
    const ceilingType = structureTypes.find((s) => s.label === "ჭერი");
    const selectedsunny = sunTypes.find((t) => t.label === rmForm.sunny);
    const z27 = Number(rmForm.humans);

    const floor = {
      type: "იატაკი",
      i27: Number(rmForm.m2),
      j27: floorType?.j27 ?? 0,
      k27: floorType?.k27 ?? null,
      M27: floorType?.M27 ?? null,
      q27: floorType?.q27 ?? null,
      r27: floorType?.r27 ?? null,
      v27: selectedsunny?.v27 ?? null,
      z27,
      ae27: Number(rmForm.m2),
      length: "",
      height: "",
      quantity: 1,
    };

    const ceiling = {
      type: "ჭერი",
      i27: Number(rmForm.m2),
      j27: ceilingType?.j27 ?? 0,
      k27: ceilingType?.k27 ?? null,
      M27: ceilingType?.M27 ?? null,
      q27: ceilingType?.q27 ?? null,
      r27: ceilingType?.r27 ?? null,
      v27: selectedsunny?.v27 ?? null,
      z27,
      ae27: Number(rmForm.m2),
      length: "",
      height: "",
      quantity: 1,
    };

    const newRoom = {
      name: rmForm.name.trim(),
      m2: Number(rmForm.m2),
      sunny: Number(selectedsunny?.v27),
      humans: Number(rmForm.humans),
      structures: [floor, ceiling],
    };

    onAddRoom(newRoom);

    setrmForm({
      name: "",
      m2: "",
      sunny: "",
      humans: "",
    });
  };

  const ChangeInput = (e) => {
    const { name, value } = e.target;
    setrmForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      <input
        name="name"
        type="text"
        placeholder="ოთახის სახელი"
        value={rmForm.name}
        onChange={ChangeInput}
        className="border p-2"
      />
      <input
        name="m2"
        type="number"
        placeholder="ოთახის ფართობი (მ²)"
        value={rmForm.m2}
        onChange={ChangeInput}
        className="border p-2 w-28"
      />
      <select
        name="sunny"
        value={rmForm.sunny}
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
        value={rmForm.humans}
        onChange={ChangeInput}
        className="border p-2"
      >
        <option value="">აირჩიე</option>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        ოთახის დამატება
      </button>
    </div>
  );
};
