import { RouterProvider } from 'react-router-dom';
import { Layout } from './layout';
import { defaultRouter } from './router/routes';

import './App.css';

function App() {
    return (
        <Layout>
            <RouterProvider router={defaultRouter} />
        </Layout>
    );
}

export default App;
