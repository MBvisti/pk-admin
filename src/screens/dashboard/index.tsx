import React from 'react';
import {SideBar} from "./components/sideBar";

function Admin() {
    return (
        <div className="border border-purple-600 md:flex md:min-h-screen md:min-w-full md:max-w">
            <SideBar />
        </div>
    )
}

export default Admin;