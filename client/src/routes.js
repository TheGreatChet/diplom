import { MainPage } from './components/pages/main/MainPage'
import { MAIN_ROUTE, REG_ROUTE } from './utils/consts'
import { RegPage } from './components/pages/registration/RegPage'
import { ListPage } from './components/pages/list/ListPage'

export const PublicRoutes = [
    {
        Component: <MainPage />,
        path: MAIN_ROUTE
    },
    {
        Component: <RegPage />,
        path: REG_ROUTE
    }
];

export const ClientRoutes = [
    {
        Component: <ListPage />,
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