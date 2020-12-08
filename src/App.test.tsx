import React from 'react';
import { render, screen } from '@testing-library/react';
import App from "./App";
import AuthProvider from "./context/appProviders";

const appWrapper: React.FC = ({children}) => {
    return (
            <AuthProvider>
                {children}
            </AuthProvider>
    )
}

const customRender = (ui: React.ReactElement, options: any) => {
    render(ui, {wrapper: appWrapper, ...options})
}

// re-export everything
export * from '@testing-library/react'

export {customRender as render}

// TODO: change this to be more useful - but not important for now
xtest('should render login screen', () => {
  render(<App />, {})
  const loadingScreen = screen.queryByText("Parkeringskompagniet administrator");
  console.log(document.body.innerText)
  expect(loadingScreen).toBeInTheDocument()
});
