import React from 'react';
import {AiOutlineLogout, AiOutlineUser} from "react-icons/ai";
import {useAuth} from "../../../context/authContext";
import {AuthFunctions} from "../../../context/interfaces";

interface HeaderProps {
    userName: string,
}

export const Header = ({userName}: HeaderProps) => {
    const authData = useAuth() as AuthFunctions;
    return (
        <div className="md:h-14 md:mt-6 md:flex md:justify-end md:items-center">
            <span className="md:mr-4 md:flex md:items-center">
                <AiOutlineUser className="md:mr-2" />
                <p className="text-sm">{userName}</p>
            </span>
            <AiOutlineLogout onClick={() => authData.logout()} className="cursor-pointer" />
        </div>
    )
}