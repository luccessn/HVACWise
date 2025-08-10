/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContextProvider";
import { addFloorAction } from "../../Context/AppActionsCreators";

export const AddFloor = () => {
  const { dispatch } = useAppContext();
  const [floorName, setfloorName] = useState("");
  //   const [floorApartmentsNames, setfloorApartmentsNames] = useState({});
  const addFloor = () => {
    if (!floorName.trim()) return;
    const newFloor = {
      floorId: Date.now(),
      floorName,
      apartments: [],
    };
    dispatch(addFloorAction(newFloor));
    setfloorName("");
  };
  //   console.log(state.hvacItems);
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">
        ბინების და ოთახების მენეჯმენტი
      </h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="სართულის სახელი"
          value={floorName}
          onChange={(e) => setfloorName(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={addFloor}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          სართულის დამატება
        </button>
      </div>
    </div>
  );
};
