/* eslint-disable prettier/prettier */
import React, { useState } from "react";

export const AddRoomForm = ({ onAddRoom }) => {
  const [name, setName] = useState("");
  const handleAdd = () => {
    onAddRoom(name);
    setName("");
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="ოთახის სახელი"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        ოთახის დამატება
      </button>
    </div>
  );
};
