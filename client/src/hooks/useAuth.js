import { useCallback, useEffect, useState } from "react"

export const useAuth = () => {
    const [token, setToken] = useState('')
    const [role, setRole] = useState('')

    const login = useCallback((jwt, roleId) => {
        localStorage.setItem('userData', JSON.stringify({
            token: jwt,
            roleId: roleId 
        }))
        setToken(jwt)
        setRole(roleId)
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem('userData')
        setToken('')
        setRole('')
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))

        if (data && data.token) {
            login(data.token, data.roleId)
        }
    }, [login])


    return { login, logout, token, role }
}