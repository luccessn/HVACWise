/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { AddRoomForm } from "../AddRoomForm";
import {
  addRoomToApartmentAction,
  addStructureToRoomAction,
  editStructureInRoomAction,
} from "../../../Context/AppActionsCreators";
import { useAppContext } from "../../../Context/AppContextProvider";
import { StructureForm } from "../StructureForm";
import { Panel, PanelGroup } from "rsuite";
import { CalctCards } from "../../Calculation/CalctCards";

export const RoomCard = ({ apt }) => {
  const [editingStructure, setEditingStructure] = useState(null);
  const { dispatch } = useAppContext();
  return (
    <div className="border p-4 mb-6 bg-gray-400 rounded">
      <h3 className="text-lg font-semibold mb-2">{apt.name}</h3>

      {/* ოთახის დამატება */}
      <AddRoomForm
        onAddRoom={(roomName) => {
          if (!roomName.trim()) return;
          const newRoom = {
            id: Date.now(),
            name: roomName,
            structures: [],
          };
          dispatch(addRoomToApartmentAction(apt.id, newRoom));
        }}
      />
      <PanelGroup accordion bordered>
        {apt.rooms.length > 0 &&
          apt.rooms.map((room) => (
            <Panel key={room.id} header={room.name} eventKey={room.id}>
              <div
                key={room.id}
                className="space-y-4 mt-4 bg-white p-3 border rounded"
              >
                <h3 className="font-semibold mb-2">{room.name}</h3>

                {/* სტრუქტურის დამატება/რედაქტირება */}
                <StructureForm
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
  );
};
