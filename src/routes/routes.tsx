import { RouteObject } from 'react-router-dom';
import { ErrorPage } from '../pages/Error/ErrorPage';
import { RootPage } from '../pages/Root/RootPage';
import { ScheduleList } from '../pages/ScheduleList/ScheduleList';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <RootPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'schedule',
                element: <ScheduleList />,
                errorElement: <ErrorPage />,
            },
        ],
    },
];
