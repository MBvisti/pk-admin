import React, { useState } from "react";
import { SideBarElement } from "./sideBarElement";
import { AiOutlineHome } from "react-icons/ai";
import { MdPlace } from "react-icons/md";
import { BiEuro } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { RiParkingLine } from "react-icons/ri";
import { BsExclamationTriangle } from "react-icons/bs";
import { IoHardwareChipOutline } from "react-icons/io5";
import { FiMessageSquare, FiSettings } from "react-icons/fi";
import { FaWpforms } from "react-icons/fa";

interface SideBarState {
  selectedElement: string | undefined;
}

export const SideBar = () => {
  const [state, setState] = useState<SideBarState>({
    selectedElement: "dashboard",
  });

  const handleActiveElement = (e: Event) => {
    const element = e.currentTarget as HTMLDivElement;
    const elName = element.dataset["element"];

    setState({
      ...state,
      selectedElement: elName,
    });
  };
  return (
    <div className="md:w-80 md:flex md:flex-col md:max-h-screen md:bg-pk-dark-gray md:overflow-y-hidden md:flex-none">
      <img
        className="md:px-10 md:mt-6"
        src="https://parkeringskompagniet.dk/wp-content/uploads/2020/10/logologo-800x355-1-400x106.png"
        alt="parkeringskompagniet logo"
      />
      <div className="md:mt-12 md:pl-10 md:relative md:overflow-auto">
        <SideBarElement
          handleActiveElement={(e: Event) => handleActiveElement(e)}
          icon={
            <AiOutlineHome className="md:mr-4 md:h-6 md:w-6 md:stroke-current md:text-white" />
          }
          isActive={state.selectedElement === "dashboard"}
          elementName={"dashboard"}
        >
          Dashboard
        </SideBarElement>
        <SideBarElement
          handleActiveElement={(e: Event) => handleActiveElement(e)}
          icon={
            <MdPlace className="md:mr-4 md:h-6 md:w-6 md:stroke-current md:text-white" />
          }
          subLinks={["Parking statistics", "Parking list"]}
          isActive={state.selectedElement === "parking"}
          elementName={"parking"}
        >
          Parking
        </SideBarElement>
        <SideBarElement
          handleActiveElement={(e: Event) => handleActiveElement(e)}
          icon={
            <BiEuro className="md:mr-4 md:h-6 md:w-6 md:stroke-current md:text-white" />
          }
          subLinks={["Charge package"]}
          isActive={state.selectedElement === "accounting"}
          elementName={"accounting"}
        >
          Accounting
        </SideBarElement>
        <SideBarElement
          handleActiveElement={(e: Event) => handleActiveElement(e)}
          icon={
            <FaUsers className="md:mr-4 md:h-6 md:w-6 md:stroke-current md:text-white" />
          }
          subLinks={["User list", "User management"]}
          isActive={state.selectedElement === "users"}
          elementName={"users"}
        >
          Users
        </SideBarElement>
        <SideBarElement
          handleActiveElement={(e: Event) => handleActiveElement(e)}
          icon={
            <RiParkingLine className="md:mr-4 md:h-6 md:w-6 md:stroke-current md:text-white" />
          }
          subLinks={["Resident parking", "Guest parking"]}
          isActive={state.selectedElement === "permits"}
          elementName={"permits"}
        >
          Parking permits
        </SideBarElement>
        <SideBarElement
          handleActiveElement={(e: Event) => handleActiveElement(e)}
          icon={
            <BsExclamationTriangle className="md:mr-4 md:h-6 md:w-6 md:stroke-current md:text-white" />
          }
          subLinks={[
            "Parking tickets",
            "Vehicle violation",
            "Property violation",
          ]}
          isActive={state.selectedElement === "violations"}
          elementName={"violations"}
        >
          Violations
        </SideBarElement>
        <SideBarElement
          handleActiveElement={(e: Event) => handleActiveElement(e)}
          icon={
            <IoHardwareChipOutline className="md:mr-4 md:h-6 md:w-6 md:stroke-current md:text-white" />
          }
          subLinks={["Live view"]}
          isActive={state.selectedElement === "hardware"}
          elementName={"hardware"}
        >
          Hardware
        </SideBarElement>
        <SideBarElement
          handleActiveElement={(e: Event) => handleActiveElement(e)}
          icon={
            <FiMessageSquare className="md:mr-4 md:h-6 md:w-6 md:stroke-current md:text-white" />
          }
          isActive={state.selectedElement === "messages"}
          elementName={"messages"}
        >
          Messages
        </SideBarElement>
        <SideBarElement
          handleActiveElement={(e: Event) => handleActiveElement(e)}
          icon={
            <FaWpforms className="md:mr-4 md:h-6 md:w-6 md:stroke-current md:text-white" />
          }
          isActive={state.selectedElement === "forms"}
          elementName={"forms"}
        >
          Forms
        </SideBarElement>
        <SideBarElement
          handleActiveElement={(e: Event) => handleActiveElement(e)}
          icon={
            <FiSettings className="md:mr-4 md:h-6 md:w-6 md:stroke-current md:text-white" />
          }
          isActive={state.selectedElement === "settings"}
          elementName={"settings"}
        >
          Settings
        </SideBarElement>
      </div>
    </div>
  );
};
