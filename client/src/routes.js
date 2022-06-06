import { MainPage } from './components/pages/main/MainPage'
import { MAIN_ROUTE, REG_ROUTE, SEARCH_ROUTE, PROFILE_ROUTE, REGUSER_ROUTE } from './utils/consts'
import { RegPage } from './components/pages/registration/RegPage'
import { ListPage } from './components/pages/list/ListPage'
import { ProfilePage } from './components/pages/profile/ProfilePage'
import { RegUserPage } from './components/pages/registration/RegUserPage'

export const PublicRoutes = [
    {
        Component: <MainPage />,
        path: MAIN_ROUTE
    },
    {
        Component: <RegPage />,
        path: REG_ROUTE
    },
    {
        Component: <ListPage />,
        path: SEARCH_ROUTE
    },
    {
        Component: <RegUserPage/>,
        path: REGUSER_ROUTE
    }
];

export const ClientRoutes = [
    {
        Component: <ProfilePage />,
        path: PROFILE_ROUTE
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