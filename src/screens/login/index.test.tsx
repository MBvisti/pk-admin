import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import Login from './index'
import App from "../../App";
import AuthProvider from "../../context/authContext";

const loginWrapper: React.FC = ({children}) => {
    return (
        <AuthProvider>
            <App>
                {children}
            </App>
        </AuthProvider>
    )
}

const customRender = (ui: React.ReactElement, options: any) => {
    render(ui, {wrapper: loginWrapper, ...options})
}

// re-export everything
export * from '@testing-library/react'

export {customRender as render}

test("should render login screen", () => {
    render(<Login isLoading={false} />)
    const loginScreen = screen.queryByText("Parkeringskompagniet administrator")
    const loadingMsg = screen.queryByText("Loading...")
    expect(loginScreen).toBeInTheDocument()
    expect(loadingMsg).not.toBeInTheDocument()
})

test("should render loading message", () => {
    render(<Login isLoading={true} />)
    const loginScreen = screen.queryByText("Parkeringskompagniet administrator")
    expect(loginScreen).not.toBeInTheDocument()
    const loadingMsg = screen.queryByText("Loading...")
    expect(loadingMsg).toBeInTheDocument()
})

// TODO: this test is really frustrating at the moment
xtest("clicking login should show loading msg", () => {
    render(<Login isLoading={false} />, {})
    const loginButton = screen.queryByText("Login") as HTMLButtonElement;
    const loginScreen = screen.queryByText("Parkeringskompagniet administrator")

    expect(loginScreen).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()

    const userNameInput = screen.queryByPlaceholderText("Please insert your username") as HTMLInputElement;
    userNameInput.value = "test user"
    const passwordInput = screen.queryByPlaceholderText("Please insert your password") as HTMLInputElement;
    passwordInput.value = "qwerty1234"

    fireEvent.click(loginButton)


    const loadingMsg = screen.queryByText("Loading...")
    expect(loadingMsg).toBeInTheDocument()
})