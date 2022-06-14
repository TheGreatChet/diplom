import { MainPage } from './components/pages/main/MainPage'
import { MAIN_ROUTE, REG_ROUTE, SEARCH_ROUTE, PROFILE_ROUTE, REGUSER_ROUTE, MYTASKS_ROUTE, CHAT_ROUTE } from './utils/consts'
import { RegPage } from './components/pages/registration/RegPage'
import { ListPage } from './components/pages/list/ListPage'
import { ProfilePage } from './components/pages/profile/ProfilePage'
import { RegUserPage } from './components/pages/registration/RegUserPage'
import { MyTasksPage } from './components/pages/mytasks/MyTasksPage'
import { ChatPage } from './components/pages/chat/ChatPage'

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
        Component: <RegUserPage />,
        path: REGUSER_ROUTE
    },
    {
        Component: <ChatPage/>,
        path: CHAT_ROUTE
    }
];

export const ClientRoutes = [
    {
        Component: <ProfilePage />,
        path: PROFILE_ROUTE
    },
    {
        Component: <MyTasksPage />,
        path: MYTASKS_ROUTE
    },
    {
        Component: <ChatPage/>,
        path: CHAT_ROUTE
    }
];

export const WorkerRoutes = [
    {
        Component: <ProfilePage />,
        path: PROFILE_ROUTE
    },
    {
        Component: <MyTasksPage />,
        path: MYTASKS_ROUTE
    },
    {
        Component: <ChatPage/>,
        path: CHAT_ROUTE
    }
];

export const AdminRoutes = [
    {
        Component: <ProfilePage />,
        path: PROFILE_ROUTE
    }, 
    {
        Component: <MyTasksPage />,
        path: MYTASKS_ROUTE
    }
];