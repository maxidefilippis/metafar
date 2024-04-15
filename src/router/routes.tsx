import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { DetailPage } from '../pages/detail';
import { NotFoundPage } from '../pages/notFound';

export const defaultRouter = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/detail/:action/:exchange',
        element: <DetailPage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
