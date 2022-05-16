import {createContext} from 'react'

function empt () {}

export const AuthContext = createContext({
    token: null,
    login: empt,
    logout: empt,
    isAuth: false
})