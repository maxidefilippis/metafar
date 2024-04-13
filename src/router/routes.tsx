import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/home';

export const defaultRouter = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
]);
