import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react'
import {BrowserRouter as Router} from "react-router-dom";
import {SideBar} from "./sideBar";

const routerWrapper: React.FC = ({children}) => {
    return (
        <React.StrictMode>
            <Router>
                {children}
            </Router>
        </React.StrictMode>
    )
}

const customRender = (ui: React.ReactElement, options: any) => {
    render(ui, {wrapper: routerWrapper, ...options})
}

test("should render sidebar with all sidebar elements", () => {
    customRender(<SideBar/>, {})

    const dashboard = screen.queryByText("Dashboard") as HTMLDivElement;
    const parking = screen.getByText("Parking") as HTMLDivElement;
    const accounting = screen.getByText("Accounting") as HTMLDivElement;
    const users = screen.getByText("Users") as HTMLDivElement;
    const parkingPermits = screen.getByText("Parking permits") as HTMLDivElement;
    const violations = screen.getByText("Violations") as HTMLDivElement;
    const hardware = screen.getByText("Hardware") as HTMLDivElement;
    const messages = screen.getByText("Messages") as HTMLDivElement;
    const forms = screen.getByText("Forms") as HTMLDivElement;
    const settings = screen.getByText("Settings") as HTMLDivElement;

    expect(dashboard.textContent).toStrictEqual("Dashboard")
    expect(parking.textContent).toStrictEqual("Parking")
    expect(accounting.textContent).toStrictEqual("Accounting")
    expect(users.textContent).toStrictEqual("Users")
    expect(parkingPermits.textContent).toStrictEqual("Parking permits")
    expect(violations.textContent).toStrictEqual("Violations")
    expect(hardware.textContent).toStrictEqual("Hardware")
    expect(messages.textContent).toStrictEqual("Messages")
    expect(forms.textContent).toStrictEqual("Forms")
    expect(settings.textContent).toStrictEqual("Settings")
})

test("should add /settings to url when clicking settings in the sidebar", () => {
    customRender(<SideBar/>, {})

    const settings = screen.getByText("Settings") as HTMLDivElement;
    let currentPath = window.document.location.href;

    expect(settings.textContent).toStrictEqual("Settings")
    expect(currentPath).toStrictEqual("http://localhost/")
    fireEvent.click(settings)

    currentPath = window.document.location.href;
    expect(currentPath).toStrictEqual("http://localhost/settings")
})

test("should add /accounting to url when clicking settings in the sidebar and show sub links", () => {
    customRender(<SideBar/>, {})

    const settings = screen.getByText("Accounting") as HTMLDivElement;
    let subLink = screen.queryByText("Charge package") as HTMLDivElement;
    let currentPath = window.document.location.href;

    expect(settings.textContent).toStrictEqual("Accounting")
    expect(subLink).not.toBeInTheDocument()
    // TODO: for some reason the href is not reset
    // expect(currentPath).toStrictEqual("http://localhost/")

    fireEvent.click(settings)

    subLink = screen.queryByText("Charge package") as HTMLDivElement;
    currentPath = window.document.location.href;

    expect(currentPath).toStrictEqual("http://localhost/accounting")
    expect(subLink).toBeInTheDocument()
    expect(subLink.textContent).toStrictEqual("Charge package")
})