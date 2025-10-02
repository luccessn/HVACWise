/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  addApartmentToFloorAction,
  clearFullHVAC,
  removeApartmentFromFloorAction,
  removeFlorAction,
} from "../../Context/AppActionsCreators";
import { AddFloor } from "./AddFloor";
import { useAppContext } from "../../Context/AppContextProvider";
import { RoomCard } from "./Cards/RoomCard";
import { Panel, PanelGroup } from "rsuite"; // დაამატე rsuite-ის იმპორტი
import "rsuite/dist/rsuite.min.css"; // სტილები
import { exportHVACExcel } from "../ExportToExcel";
import "./homeant.css";
export const HomeCard = () => {
  const { state, dispatch } = useAppContext();
  const [floorApartmentsNames, setfloorApartmentsNames] = useState({});
  const [ErrorApart, setErrorApart] = useState(false);
  // const allRoomNames = state.hvacItems.flatMap((floor) =>
  //   floor.apartments.map((apartment) => apartment.name)
  // );
  const AddApartment = (floor) => {
    const ApartName = floorApartmentsNames[floor.floorId].toLowerCase().trim();
    const floorApartmentNames =
      state.hvacItems
        .find((f) => f.floorId === floor.floorId)
        ?.apartments.map((a) => a.name.toLowerCase().trim()) || [];
    if (floorApartmentNames.includes(ApartName)) {
      setErrorApart(true);
    } else {
      const name = floorApartmentsNames[floor.floorId];
      if (!name?.trim()) return;
      const newApartment = {
        id: Date.now(),
        name,
        rooms: [],
      };
      dispatch(addApartmentToFloorAction(floor.floorId, newApartment));
      setfloorApartmentsNames({
        ...floorApartmentsNames,
        [floor.floorId]: "",
      });
      setErrorApart(false);
    }
  };
  const AprtHandelChange = (e, floorId) => {
    const value = e.target.value;
    setfloorApartmentsNames({
      ...floorApartmentsNames,
      [floorId]: value,
    });
  };
  // const panelBackground = "#e6f0ff";
  return (
    <div className="p-6  mx-auto font-sans ">
      <div className="flex justify-between">
        <button
          className="container-btn-file"
          onClick={() => exportHVACExcel(state.hvacItems)}
        >
          <svg
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 50 50"
          >
            <path
              d="M28.8125 .03125L.8125 5.34375C.339844 
    5.433594 0 5.863281 0 6.34375L0 43.65625C0 
    44.136719 .339844 44.566406 .8125 44.65625L28.8125 
    49.96875C28.875 49.980469 28.9375 50 29 50C29.230469 
    50 29.445313 49.929688 29.625 49.78125C29.855469 49.589844 
    30 49.296875 30 49L30 1C30 .703125 29.855469 .410156 29.625 
    .21875C29.394531 .0273438 29.105469 -.0234375 28.8125 .03125ZM32 
    6L32 13L34 13L34 15L32 15L32 20L34 20L34 22L32 22L32 27L34 27L34 
    29L32 29L32 35L34 35L34 37L32 37L32 44L47 44C48.101563 44 49 
    43.101563 49 42L49 8C49 6.898438 48.101563 6 47 6ZM36 13L44 
    13L44 15L36 15ZM6.6875 15.6875L11.8125 15.6875L14.5 21.28125C14.710938 
    21.722656 14.898438 22.265625 15.0625 22.875L15.09375 22.875C15.199219 
    22.511719 15.402344 21.941406 15.6875 21.21875L18.65625 15.6875L23.34375 
    15.6875L17.75 24.9375L23.5 34.375L18.53125 34.375L15.28125 
    28.28125C15.160156 28.054688 15.035156 27.636719 14.90625 
    27.03125L14.875 27.03125C14.8125 27.316406 14.664063 27.761719 
    14.4375 28.34375L11.1875 34.375L6.1875 34.375L12.15625 25.03125ZM36 
    20L44 20L44 22L36 22ZM36 27L44 27L44 29L36 29ZM36 35L44 35L44 37L36 37Z"
            ></path>
          </svg>
          Excel-ში ატვირთვა
          <input className="file" name="text" type="file" />
        </button>
        <button
          onClick={() => dispatch(clearFullHVAC())}
          className="inline-flex  items-center px-4 py-2 bg-red-600 transition ease-in-out duration-300 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
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
            ></path>
          </svg>
          გასუფთავება მთლიანად
        </button>
        {/* <div
  className="group select-none w-[250px] flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl"
>
  <div>
    <div className="text-center p-3 flex-auto justify-center">
      <svg
        fill="currentColor"
        viewBox="0 0 20 20"
        className="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
        ></path>
      </svg>
      <h2 className="text-xl font-bold py-4 text-gray-200">Are you sure?</h2>
      <p className="font-bold text-sm text-gray-500 px-2">
        Do you really want to continue? This process cannot be undone.
      </p>
    </div>
    <div className="p-2 mt-2 text-center space-x-1 md:block">
      <button
        className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
      >
        Cancel
      </button>
      <button
        className="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
      >
        Confirm
      </button>
    </div>
  </div>
</div> */}
      </div>
      <AddFloor />
      <div className="flex justify-center  ">
        <div
          className={`overflow-y-auto ml-24 w-[1300px] h-screen scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-200   p-2 rounded-lg 
          `}
        >
          {" "}
          {state.hvacItems.length === 0 ? (
            <div className="translate-y-32">
              <h2 className="bg-clip-text text-transparent text-center  bg-gradient-to-b from-neutral-900 to-neutral-500  text-2xl md:text-4xl lg:text-6xl font-sans py-8 relative z-20 font-bold tracking-tight">
                HVACWISE =/ Solutions.
              </h2>
              <p className="max-w-xl mx-auto  text-sm md:text-lg   text-neutral-500 text-center">
                HVACWise გაძლევს შენობის კლიმატზე სრულ კონტროლს — ზუსტი სითბოს
                ნაკადის ანალიტიკით .
              </p>
            </div>
          ) : null}
          <PanelGroup accordion defaultActiveKey={state.hvacItems[0]?.floorId}>
            <div className="  flex flex-col gap-3">
              {state.hvacItems.map((floor) => (
                <Panel
                  key={floor.floorId}
                  header={`სართული :  ${floor.floorName}`}
                  eventKey={floor.floorId}
                  className="bg-[#b0c8eb]"
                  style={{
                    // backgroundColor: panelBackground,
                    borderRadius: "8px",
                    padding: "8px",
                  }}
                >
                  {/* ბინის დამატება კონკრეტულ სართულში */}
                  <div className="flex flex-col gap-2 mb-4 ">
                    {/* <input
                      type="text"
                      placeholder="ბინის სახელი"
                      value={floorApartmentsNames[floor.floorId] || ""}
                      onChange={(e) =>
                        setfloorApartmentsNames({
                          ...floorApartmentsNames,
                          [floor.floorId]: e.target.value,
                        })
                      }
                      className="border-2 p-2 w-full rounded-lg border-purple-800 bg-gray-100"
                    /> */}
                    <div className="flex flex-row gap-2 ">
                      <input
                        type="text"
                        placeholder="ბინის სახელი"
                        value={floorApartmentsNames[floor.floorId] || ""}
                        onChange={(e) => AprtHandelChange(e, floor.floorId)}
                        className={`
    w-full  p-3 
    rounded-xl border-2       

    outline-none 
    transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] 
    shadow-[0_0_20px_-18px_rgba(0,0,0,0.25)]
    hover:border-2  hover:shadow-[0_0_20px_-17px_rgba(0,0,0,0.25)]
    active:scale-95
    focus:border-2 focus:border-purple-800
                    ${
                      ErrorApart
                        ? "border-red-500 hover:border-red-800 "
                        : "border-gray-500 hover:border-blue-800"
                    } `}
                      />
                      {/* <button className="bg-blue-600 text-white px-4 py-2 rounded"></button> */}
                      <button
                        className="cta"
                        onClick={() => AddApartment(floor)}
                      >
                        <span className="span">ბინის დამატება</span>
                        <span className="second">
                          <svg
                            width="50px"
                            height="20px"
                            viewBox="0 0 66 43"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <g
                              id="arrow"
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <path
                                className="one"
                                d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                                fill="#FFFFFF"
                              />
                              <path
                                className="two"
                                d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                                fill="#FFFFFF"
                              />
                              <path
                                className="three"
                                d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                                fill="#FFFFFF"
                              />
                            </g>
                          </svg>
                        </span>
                      </button>
                    </div>
                    {ErrorApart && (
                      <p className=" ">ბინის ეს სახელი უკვე გამოყენებულია </p>
                    )}
                  </div>
                  <div
                    className={`overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-200   p-2 ${
                      floor.apartments.length > 4 ? "max-h-[650px]" : ""
                    }`}
                  >
                    <PanelGroup accordion>
                      <div className="flex flex-col gap-3 ">
                        {" "}
                        {floor.apartments.map((apt) => (
                          <Panel
                            className="bg-[#8babdb] p-2"
                            key={apt.id}
                            header={`ბინა :  ${apt.name}`}
                            eventKey={apt.id}
                          >
                            <RoomCard key={apt.id} apt={apt} />
                            {/* <button className="">
                          <span className="text-lg font-bold">{apt.name}</span>
                          {"  "}
                          ბინის წაშლა
                        </button> */}
                            <button
                              onClick={() =>
                                dispatch(
                                  removeApartmentFromFloorAction(
                                    floor.floorId,
                                    apt.id
                                  )
                                )
                              }
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
                              ბინის წაშლა
                            </button>
                          </Panel>
                        ))}
                      </div>
                    </PanelGroup>
                  </div>
                  <button
                    onClick={() => dispatch(removeFlorAction(floor.floorId))}
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
                    სართულის წაშლა
                  </button>
                </Panel>
              ))}
            </div>
          </PanelGroup>
        </div>
      </div>
      {/* 1 */}
      {/* <div className="loader  absolute bottom-80 left-40 -z-10 ">
        <div className="box box-1">
          <div className="side-left"></div>
          <div className="side-right"></div>
          <div className="side-top"></div>
        </div>
        <div className="box box-2">
          <div className="side-left"></div>
          <div className="side-right"></div>
          <div className="side-top"></div>
        </div>
        <div className="box box-3">
          <div className="side-left"></div>
          <div className="side-right"></div>
          <div className="side-top"></div>
        </div>
        <div className="box box-4">
          <div className="side-left"></div>
          <div className="side-right"></div>
          <div className="side-top"></div>
        </div>
      </div> */}
      {/* 2 */}
      <aside className="loader2 -z-10  " style={{ "--wh-number": 22 }}>
        <div className="pixel"></div>
      </aside>
      {/* 3 */}
      <div className="absolute right-0 top-[40%] -z-10">
        {/* 4 */}
        <div
          aria-label="Orange and tan hamster running in a metal wheel"
          role="img"
          className="wheel-and-hamster"
        >
          {/* <div className="wheel"></div> */}
          <div className="hamster">
            <div className="hamster__body">
              <div className="hamster__head">
                <div className="hamster__ear"></div>
                <div className="hamster__eye"></div>
                <div className="hamster__nose"></div>
              </div>
              <div className="hamster__limb hamster__limb--fr"></div>
              <div className="hamster__limb hamster__limb--fl"></div>
              <div className="hamster__limb hamster__limb--br"></div>
              <div className="hamster__limb hamster__limb--bl"></div>
              <div className="hamster__tail"></div>
            </div>
          </div>
          {/* <div className="spoke"></div> */}
        </div>
        <div className="loader7"></div>
      </div>
      <div className="flex flex-col gap-10  absolute left-40 top-52 -z-10  ">
        {/* 5 */}
        <div className=" gap-1 pt-40 relative right-32 pb-40  flex items-center justify-center">
          <div className="flex flex-col items-center animate-[bounce_1s_ease-in-out_infinite_0.1s]">
            <div className="w-1 h-6 bg-blue-500"></div>
            <div className="w-3 h-12 bg-blue-500 rounded-sm"></div>
            <div className="w-1 h-6 bg-blue-500"></div>
          </div>

          <div className="flex flex-col items-center animate-[bounce_1s_ease-in-out_infinite_0.2s]">
            <div className="w-1 h-6 bg-red-500"></div>
            <div className="w-3 h-12 bg-red-500 rounded-sm"></div>
            <div className="w-1 h-6 bg-red-500"></div>
          </div>

          <div className="flex flex-col items-center animate-[bounce_1s_ease-in-out_infinite_0.1s]">
            <div className="w-1 h-6 bg-purple-500"></div>
            <div className="w-3 h-12 bg-purple-500 rounded-sm"></div>
            <div className="w-1 h-6 bg-purple-500"></div>
          </div>
        </div>

        {/* 6 */}

        <div className="container">
          <div className="square">
            <span style={{ "--i": 0 }}></span>
            <span style={{ "--i": 1 }}></span>
            <span style={{ "--i": 2 }}></span>
            <span style={{ "--i": 3 }}></span>
          </div>
          <div className="square">
            <span style={{ "--i": 0 }}></span>
            <span style={{ "--i": 1 }}></span>
            <span style={{ "--i": 2 }}></span>
            <span style={{ "--i": 3 }}></span>
          </div>
          <div className="square">
            <span style={{ "--i": 0 }}></span>
            <span style={{ "--i": 1 }}></span>
            <span style={{ "--i": 2 }}></span>
            <span style={{ "--i": 3 }}></span>
          </div>
        </div>
      </div>
      {/* 7 */}
    </div>
  );
};
