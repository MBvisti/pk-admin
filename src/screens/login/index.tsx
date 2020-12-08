import React, {ChangeEvent, FormEvent, useState} from 'react';
import { useAuth } from "../../context/authContext";
import {AuthFunctions, UserAuthDetails} from '../../context/interfaces'

function Login() {
    const [state, setState] = useState<UserAuthDetails>({
        password: "",
        username: "",
    });
    const authData = useAuth() as AuthFunctions;

    const handleFormInput = (e: ChangeEvent) => {
        const {name, value} = e.target as HTMLInputElement;

        setState({
            ...state,
            [name]: value
        })
    }

    return (
        <div className="md:flex md:min-h-screen md:min-w-full md:max-w-full md:items-center md:justify-center md:bg-gray-200">
            <form
                onSubmit={(e: FormEvent) => authData.login(e, state)}
                className="bg-white md:rounded md:h-64 md:w-1/3 md:border md:border-black md:shadow-md md:py-6 md:px-10 md:flex md:flex-col md:items-center">
                <h2 className="md:font-bold">Parkeringskompagniet administrator</h2>
                <input onChange={(e: ChangeEvent) => handleFormInput(e)} value={state.username} className="md:w-full md:border md:border-black md:px-2 md:py-2 md:rounded md:mb-4 md:mt-4" name="username" type="text" placeholder="Please insert your username" required />
                <input onChange={(e: ChangeEvent) => handleFormInput(e)} value={state.password} className="md:w-full md:border md:border-black md:px-2 md:py-2 md:rounded md:mb-4" name="password" type="password" placeholder="Please insert your username" required />
                <button className="md:w-full md:h-10 md:text-white md:font-bolds md:rounded md:bg-blue-400 md:my-auto">Login</button>
            </form>
        </div>
    )
}

export default Login;