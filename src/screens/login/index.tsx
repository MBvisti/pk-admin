import React, {ChangeEvent, FormEvent, Fragment, useState} from 'react';
import { useAuth } from "../../context/authContext";
import {AuthFunctions} from '../../context/interfaces'

interface LoginState {
    password: string,
    username: string,
    loading: boolean,
}

interface LoginProps {
    isLoading: boolean,
}

function Login({isLoading}: LoginProps) {
    const [state, setState] = useState<LoginState>({
        password: "",
        username: "",
        loading: isLoading,
    });
    const authData = useAuth() as AuthFunctions;

    const handleFormInput = (e: ChangeEvent): void => {
        const {name, value} = e.target as HTMLInputElement;

        setState({
            ...state,
            [name]: value
        })
    }

    return (
        <div className="md:flex md:min-h-screen md:min-w-full md:max-w-full md:items-center md:justify-center md:bg-gray-200">
            <form
                onSubmit={(e: FormEvent) => authData.login(e, {password: state.password, username: state.username}) }
                className="bg-white md:rounded md:h-64 md:w-1/3 md:border md:border-black md:shadow-md md:py-6 md:px-10 md:flex md:flex-col md:items-center md:justify-center">
                {
                    isLoading ?
                        <p>Loading...</p> :
                        <Fragment>
                            <h2 className="md:font-bold">Parkeringskompagniet administrator</h2>
                            <input onChange={(e: ChangeEvent) => handleFormInput(e)} value={state.username} className="md:w-full md:border md:border-black md:px-2 md:py-2 md:rounded md:mb-4 md:mt-4" name="username" type="text" placeholder="Please insert your username" required />
                            <input onChange={(e: ChangeEvent) => handleFormInput(e)} value={state.password} className="md:w-full md:border md:border-black md:px-2 md:py-2 md:rounded md:mb-4" name="password" type="password" placeholder="Please insert your password" required />
                            <button className="md:w-full md:h-10 md:text-white md:font-bolds md:rounded md:bg-blue-400 md:my-auto">Login</button>
                        </Fragment>
                }
            </form>
        </div>
    )
}

export default Login;