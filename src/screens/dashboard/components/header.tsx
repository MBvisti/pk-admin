import React from 'react';
import {AiOutlineLogout, AiOutlineUser} from "react-icons/all";

export const Header = () => {
    return (
        <div className="md:h-14 md:mt-6 md:flex md:justify-end md:items-center">
            <span className="md:mr-4 md:flex md:items-center">
                <AiOutlineUser className="md:mr-2" />
                <p className="text-sm">Simon Høj</p>
            </span>
            <AiOutlineLogout className="cursor-pointer" />
        </div>
    )
}