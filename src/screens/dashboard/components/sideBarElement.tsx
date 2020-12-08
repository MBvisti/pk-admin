import React, {useEffect, useState} from 'react';
import {IoIosArrowDown} from "react-icons/all";
import {Link} from "react-router-dom";

interface SideBarElementProps {
    icon: JSX.Element,
    children: React.ReactChild,
    subLinks?: Array<string>,
    isActive: boolean,
    handleActiveElement: any,
    elementName: string,
}

export const SideBarElement = ({icon, children, subLinks, isActive, handleActiveElement, elementName}: SideBarElementProps) => {
    const [isOpen, setIsOpen] = useState(isActive);

    useEffect(() => {
        setIsOpen(isActive)
    }, [isActive])
    return (
        <div
            data-element={elementName}
            onClick={(e) => {
            handleActiveElement(e)
            setIsOpen(!isOpen)
        }} className={`text-white cursor-pointer md:mb-2 md:flex md:flex-col md:min-w-full ${isActive ? "md:border-r-4 md:border-white" : "" }`}>
            <Link to={`/${elementName}`}>
                <div className="md:flex md:items-center md:h-10">
                    {icon}
                    {children}
                    {subLinks?.length !== undefined ? <IoIosArrowDown className="md:absolute md:right-6" /> : ""}
                </div>
            </Link>
            {
                isOpen && subLinks !== undefined ?
                <div className="md:ml-10 md:text-sm">
                    {
                        subLinks!.map((subLink, index) => (
                            <p className="md:mb-2" key={index}>{subLink}</p>
                        ))
                    }
                </div>
                    : null
            }
        </div>
    )
}