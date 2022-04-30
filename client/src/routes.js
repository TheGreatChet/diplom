import { AuthPage } from './components/pages/AuthPage'
import { MainPage } from './components/pages/MainPage'
import { RegistrationPage } from './components/pages/RegistrationPage'
import { AUTH_ROUTE, REG_ROUTE, MAIN_ROUTE } from './utils/consts'

export const PublicRoutes = [
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

export const ClientRoutes = [
    {
        Component: <MainPage />,
        path: MAIN_ROUTE
    }
];

export const WorkerRoutes = [
    {
        Component: <MainPage />,
        path: MAIN_ROUTE
    }
];

export const AdminRoutes = [
    {
        Component: <MainPage />,
        path: MAIN_ROUTE
    }
];