import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MAIN_ROUTE } from "../utils/consts"

export const useAuth = () => {
    const [token, setToken] = useState('')
    const [role, setRole] = useState('')
    const [accountId, setId] = useState('')
    const navigate = useNavigate();

    const login = useCallback((jwt, roleId, accountId) => {
        localStorage.setItem('userData', JSON.stringify({
            token: jwt,
            roleId: roleId,
            accountId: accountId 
        }))
        setToken(jwt)
        setRole(roleId)
        setId(accountId)
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem('userData')
        setToken('')
        setRole('')
        setId('')
        navigate(MAIN_ROUTE)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))
        if (data && data.token) {
            login(data.token, data.roleId, data.accountId)
        }
    }, [login])


    return { login, logout, token, role, accountId }
}