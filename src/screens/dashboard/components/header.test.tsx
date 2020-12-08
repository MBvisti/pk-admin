import React from 'react';
import {render, screen} from '@testing-library/react'
import {Header} from "./header";

test("should render header with user Simon Høj", () => {
    render(<Header userName={"Simon Høj"} />);
    const userName = screen.getByText("Simon Høj");
    expect(userName).toBeInTheDocument()
})