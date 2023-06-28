import { RouteObject } from 'react-router-dom';
import { ErrorPage } from '../pages/Error/ErrorPage';
import { Index } from '../pages/Index/Index';
import { RootPage } from '../pages/Root/RootPage';
import { ScheduleCreate } from '../pages/ScheduleCreate/ScheduleCreate';
import { ScheduleEdit } from '../pages/ScheduleEdit/ScheduleEdit';
import { ScheduleList } from '../pages/ScheduleList/ScheduleList';
import { WorkstationCreate } from '../pages/WorkstationCreate/WorkstationCreate';
import { WorkstationEdit } from '../pages/WorkstationEdit/WorkstationEdit';
import { WorkstationList } from '../pages/WorkstationList/WorkstationList';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <RootPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Index />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'schedule',
                element: <ScheduleList />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'schedule/create',
                element: <ScheduleCreate />,
                errorElement: <ErrorPage />,
            },
            /* {
                path: 'schedule/:id',
                element: <ScheduleDetails />,
                errorElement: <ErrorPage />,
            }, */
            {
                path: 'schedule/:id/edit',
                element: <ScheduleEdit />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'workstation',
                element: <WorkstationList />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'workstation/create',
                element: <WorkstationCreate />,
                errorElement: <ErrorPage />,
            },
            /* {
                path: 'workstation/:id',
                element: <WorkstationDetails />,
                errorElement: <ErrorPage />,
            }, */
            {
                path: 'workstation/:id/edit',
                element: <WorkstationEdit />,
                errorElement: <ErrorPage />,
            },
        ],
    },
];
