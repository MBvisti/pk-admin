import React from "react";
import {SideBarElement} from "./sideBarElement";
import {AiOutlineHome} from "react-icons/all";

export const SideBar = () => {
    return (
        <div className="md:w-80 md:flex md:flex-col md:max-h-screen md:px-10 md:bg-gray-600">
            <img className="md:mx-auto md:mt-6" src="https://parkeringskompagniet.dk/wp-content/uploads/2020/10/logologo-800x355-1-400x106.png" alt="parkeringskompagniet logo" />
            <div className="md:mt-12">
                <SideBarElement icon={<AiOutlineHome className="md:mr-4 md:h-6 md:w-6 md:stroke-current md:text-white" />}>Dashboard</SideBarElement>
                <SideBarElement icon={<AiOutlineHome className="md:mr-4 md:h-6 md:w-6 md:stroke-current md:text-white" />}>Dashboard</SideBarElement>
            </div>
        </div>
    )
}