import { useCallback, useEffect } from "react"

export const useAuth = () => {
    const login = useCallback((jwt) => {
        localStorage.setItem('userData', JSON.stringify({
            token: jwt
        }))

        console.log(jwt);
    }, [])

    const logout = useCallback(() => {
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