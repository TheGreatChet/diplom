import { useCallback, useState, useEffect } from "react"

export const useAuth = () => {
    const [token, setToken] = useState(null)

    const login = useCallback((jwt) => {
        setToken(jwt)
        localStorage.setItem('userData', JSON.stringify({
            token: jwt
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)

        localStorage.removeItem('userData')
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))

        if (data && data.token) {
            login(data.token)
        }
    }, [login])


    return { login, logout }
}