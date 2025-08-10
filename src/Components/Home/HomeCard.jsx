/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  addApartmentToFloorAction,
  clearFullHVAC,
  removeFlorAction,
} from "../../Context/AppActionsCreators";
import { AddFloor } from "./AddFloor";
import { useAppContext } from "../../Context/AppContextProvider";
import { RoomCard } from "./Cards/RoomCard";
import { Panel, PanelGroup } from "rsuite"; // დაამატე rsuite-ის იმპორტი
import "rsuite/dist/rsuite.min.css"; // სტილები

export const HomeCard = () => {
  const { state, dispatch } = useAppContext();
  const [floorApartmentsNames, setfloorApartmentsNames] = useState({});
  const panelColors = [
    "#ffadad", // ღია წითელი
    "#ffd6a5", // ღია ნარინჯისფერი
    "#fdffb6", // ღია ყვითელი
    "#caffbf", // ღია მწვანე
    "#9bf6ff", // ღია ცისფერი
    "#a0c4ff", // ღია ლურჯი
    "#bdb2ff", // ღია იისფერი
    "#ffc6ff", // ღია ვარდისფერი
  ];
  const getPanelColor = (index) => {
    return panelColors[index % panelColors.length];
  };
  return (
    <div className="p-6  mx-auto font-sans">
      <AddFloor />

      <PanelGroup accordion defaultActiveKey={state.hvacItems[0]?.floorId}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {state.hvacItems.map((floor, index) => (
            <Panel
              key={floor.floorId}
              header={floor.floorName}
              eventKey={floor.floorId}
              style={{
                backgroundColor: getPanelColor(index),
                borderRadius: "8px",
                padding: "8px",
              }}
            >
              {/* ბინის დამატება კონკრეტულ სართულში */}
              <div className="flex gap-2 mb-4 ">
                <input
                  type="text"
                  placeholder="ბინის სახელი"
                  value={floorApartmentsNames[floor.floorId] || ""}
                  onChange={(e) =>
                    setfloorApartmentsNames({
                      ...floorApartmentsNames,
                      [floor.floorId]: e.target.value,
                    })
                  }
                  className="border p-2 w-full rounded-lg bg-gray-100"
                />
                <button
                  onClick={() => {
                    const name = floorApartmentsNames[floor.floorId];
                    if (!name?.trim()) return;
                    const newApartment = {
                      id: Date.now(),
                      name,
                      rooms: [],
                    };
                    dispatch(
                      addApartmentToFloorAction(floor.floorId, newApartment)
                    );
                    setfloorApartmentsNames({
                      ...floorApartmentsNames,
                      [floor.floorId]: "",
                    });
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  ბინის დამატება
                </button>
              </div>
              <PanelGroup accordion>
                <div className="grid grid-cols-1  gap-4">
                  {floor.apartments.map((apt) => (
                    <Panel
                      className=""
                      key={apt.id}
                      header={apt.name}
                      eventKey={apt.id}
                    >
                      <RoomCard key={apt.id} apt={apt} />
                    </Panel>
                  ))}
                </div>
              </PanelGroup>
              <button onClick={() => dispatch(removeFlorAction(floor.floorId))}>
                ამის წაშლა
              </button>
            </Panel>
          ))}
        </div>
      </PanelGroup>
      <button onClick={() => dispatch(clearFullHVAC())}>
        გასუფთავება მთლიანად
      </button>
    </div>
  );
};
