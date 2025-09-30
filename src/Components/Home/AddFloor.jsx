/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContextProvider";
import { addFloorAction } from "../../Context/AppActionsCreators";

export const AddFloor = () => {
  const { state, dispatch } = useAppContext();
  const [floorName, setfloorName] = useState("");
  const [errorOpen, seterrorOpen] = useState(false);
  const allfloorname = state.hvacItems.map((item) => item.floorName);
  //   const [floorApartmentsNames, setfloorApartmentsNames] = useState({});
  // const exists = state.hvacItems.reduce((x, item) => {
  //   if (item.floorName === floorName) {
  //     return true;
  //   }
  //   return x;
  // }, false);
  const addFloor = () => {
    if (allfloorname.includes(floorName)) {
      seterrorOpen(true);
    } else {
      if (!floorName.trim()) return;
      const newFloor = {
        floorId: Date.now(),
        floorName,
        apartments: [],
      };
      dispatch(addFloorAction(newFloor));
      setfloorName("");
      seterrorOpen(false);
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setfloorName(value);
    if (allfloorname.includes(floorName)) {
      seterrorOpen(true);
    } else {
      seterrorOpen(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">
        ბინების და ოთახების მენეჯმენტი
      </h1>
      <div className="flex gap-2 mb-6">
        {/* <input
          type="text"
          placeholder="სართულის სახელი"
          value={floorName}
          onChange={(e) => setfloorName(e.target.value)}
          className="border-2 rounded-md p-2 bg-blue-100 border-purple-800 w-full"
        /> */}
        <div className="relative w-full ">
          <input
            type="text"
            placeholder="სართულის სახელი ..."
            value={floorName}
            onChange={handleChange}
            className={`
            w-full h-[60px] p-3 text-[18px] font-mono text-black
            bg-white border-[4px]  rounded-none
            outline-none transition-all duration-400 ease-in-out
            shadow-[8px_8px_0_#000]
            placeholder:text-[#888]
            hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_#000]
            focus:bg-gray-300  
            focus:animate-shake
            [&:not(:placeholder-shown)]:font-bold
            [&:not(:placeholder-shown)]:tracking-wide
            [&:not(:placeholder-shown)]:animate-glitch
           ${errorOpen ? "border-red-700" : "border-black"} `}
          />

          {errorOpen && (
            <p className="absolute left-2 top-[65px] text-red-600 text-sm font-bold">
              ასეთი სართულის სახელი უკვე არსებობს!
            </p>
          )}
        </div>
        {/* <input
          type="text"
          placeholder="სართულის სახელი"
          value={floorName}
          onChange={(e) => setfloorName(e.target.value)}
          className="
          w-full  p-3 
          rounded-xl border-2       border-gray-500
          
          outline-none 
          transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] 
          shadow-[0_0_20px_-18px_rgba(0,0,0,0.25)]
          hover:border-2 hover:border-blue-800 hover:shadow-[0_0_20px_-17px_rgba(0,0,0,0.25)]
          active:scale-95
          focus:border-2 focus:border-purple-800
          "
          /> */}
        <button className="cta" onClick={addFloor}>
          <span className="span">სართულის დამატება</span>
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
    </div>
  );
};
