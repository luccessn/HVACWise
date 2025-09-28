/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { AddRoomForm } from "../AddRoomForm";
import {
  addRoomToApartmentAction,
  addStructureToRoomAction,
  editStructureInRoomAction,
  removeRoomFromApartmenst,
} from "../../../Context/AppActionsCreators";
import { useAppContext } from "../../../Context/AppContextProvider";
import { StructureForm } from "../StructureForm";
import { Panel, PanelGroup } from "rsuite";
import { CalctCards } from "../../Calculation/CalctCards";

export const RoomCard = ({ apt }) => {
  const [editingStructure, setEditingStructure] = useState(null);
  const { dispatch } = useAppContext();

  return (
    <div className="border p-4 mb-6  bg-[#96a4b6] rounded">
      {/* <h3 className="text-lg font-semibold mb-2">{apt.name}</h3> */}
      {/* <h3 className="text-lg font-semibold mb-2">ოთახის დამატება</h3> */}

      {/* ოთახის დამატება */}
      <AddRoomForm
        apartmentId={apt.id}
        onAddRoom={(room) => {
          if (!room.name.trim()) return;
          const newRoom = {
            id: Date.now(),
            name: room.name.trim(),
            m2: room.m2,
            sunny: room.sunny, // ← აქ უნდა იყოს ეს სახელები
            sunnyLabel: room.sunnyLabel,
            humans: room.humans,
            structures: room.structures,
            Temp: room.Temp,
          };
          dispatch(addRoomToApartmentAction(apt.id, newRoom));
        }}
      />
      <div>
        <PanelGroup accordion bordered>
          {apt.rooms.length > 0 &&
            apt.rooms.map((room) => (
              <Panel
                key={room.id}
                header={`ოთახი :  ${room.name} `}
                eventKey={room.id}
              >
                <div
                  key={room.id}
                  className="space-y-4 mt-4 bg-[#b1c0d6] p-4 py-8 border rounded"
                >
                  {/* <h3 className="font-semibold mb-2">{room.name}</h3> */}

                  {/* სტრუქტურის დამატება/რედაქტირება */}
                  <StructureForm
                    apartmentId={apt.id} // ✅ გადასცემ ბინას ID-ს
                    roomId={room.id} // ✅ გადასცემ ოთახის ID-ს
                    onAddStructure={(structure) => {
                      if (editingStructure) {
                        dispatch(
                          editStructureInRoomAction(
                            editingStructure.aptId,
                            editingStructure.roomId,
                            editingStructure.structureIndex,
                            structure
                          )
                        );
                        setEditingStructure(null);
                      } else {
                        console.log("ADDING STRUCTURE", {
                          aptId: apt.id,
                          roomId: room.id,
                          structure,
                        });
                        dispatch(
                          addStructureToRoomAction(apt.id, room.id, structure)
                        );
                      }
                    }}
                    editingStructure={
                      editingStructure &&
                      editingStructure.aptId === apt.id &&
                      editingStructure.roomId === room.id
                        ? editingStructure.structure
                        : null
                    }
                    cancelEdit={() => setEditingStructure(null)}
                  />

                  {room.structures.length > 0 && (
                    <>
                      <CalctCards
                        room={room}
                        setEditingStructure={setEditingStructure}
                        apt={apt}
                      />
                      {/* <button className="text-red-600 mt-2">ოთახის წაშლა</button> */}
                      <button
                        onClick={() => {
                          // if (confirm("ნამდვილად გსურს ოთახის წაშლა?")) {
                          //   dispatch(removeRoomFromApartmenst(apt.id, room.id));
                          // }
                          dispatch(removeRoomFromApartmenst(apt.id, room.id));
                        }}
                        className="inline-flex  items-center mt-2 px-4 py-2 bg-red-600 transition ease-in-out duration-300 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:scale-105"
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
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />
                        </svg>
                        ოთახის წაშლა
                      </button>
                      {/* <ul className="pl-5 list-disc text-sm mt-2">
                      {room.structures.map((s, i) => (
                        <li key={i}>
                          {s.type} – {s.length}მ x {s.height}მ = {s.i27} მ² |
                          კოეფიციენტი (k): {s.k} | k27: {s.k27 ?? "?"} | M27:{" "}
                          {s.M27 ?? "?"} | {s.length * s.height}
                          <div className="flex pl-20 flex-row gap-2 mt-2">
                            <button
                              onClick={() => {
                                setEditingStructure({
                                  aptId: apt.id,
                                  roomId: room.id,
                                  structureIndex: i,
                                  structure: s,
                                });
                              }}
                              className="text-blue-600"
                            >
                              გამოსწორება
                            </button>
                            <button
                              onClick={() => {
                                if (confirm("ნამდვილად გსურს წაშლა?")) {
                                  dispatch(
                                    removeStructureFromRoomAction(
                                      apt.id,
                                      room.id,
                                      i
                                    )
                                  );
                                }
                              }}
                              className="text-red-600"
                            >
                              წაშლა
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* ✅ i27 ჯამი */}
                    </>
                  )}
                </div>
              </Panel>
            ))}
        </PanelGroup>
      </div>
    </div>
  );
};
