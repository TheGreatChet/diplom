import { useCallback, useState } from "react"
import { toast } from "react-toastify";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            
            if (!!localStorage.getItem("userData")) {
                headers['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem("userData")).token
            }

            const response = await fetch(url, { method, body, headers })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Неизвестная ошибка')
            }
            setLoading(false)
            return data;
        } catch (error) {
            setLoading(false)
            setError(error.message)
            if (!error.message.includes("Unexpected")) toast.error(error.message)
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError }
}