import React from 'react';

interface SideBarElementProps {
    icon: JSX.Element,
    children: React.ReactChild
}

export const SideBarElement = ({icon, children}: SideBarElementProps) => {
    return (
        <div className="border border-white text-white md:mb-4 md:flex md:items-center md:h-10 md:min-w-full">
            {icon}
            {children}
        </div>
    )
}