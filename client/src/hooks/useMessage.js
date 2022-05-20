import { useCallback } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useMessage = () => {
    // return useCallback((text) => {
    //     if (text) {
    //         toast(text);
    //     }
    // }, [])
    const notify = () => toast("Wow so easy!");
    
    return (
        <div>
            <button onClick={notify}>Notify!</button>
            <ToastContainer />
        </div>
    );
}