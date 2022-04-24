import { AuthPage } from './pages/AuthPage'
import { MainPage } from './pages/MainPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { AUTH_ROUTE, REG_ROUTE, MAIN_ROUTE } from './utils/consts'

export const routes = [
    {
        Component: <AuthPage />,
        path: AUTH_ROUTE
    },
    {
        Component: <MainPage />,
        path: MAIN_ROUTE
    },
    {
        Component: <RegistrationPage />,
        path: REG_ROUTE
    }
];