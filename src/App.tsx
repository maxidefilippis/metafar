import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Layout } from './layout';
import { store } from './redux/store';
import { defaultRouter } from './router/routes';

import './App.css';

function App() {
    return (
        <Provider store={store}>
            <Layout>
                <RouterProvider router={defaultRouter} />
            </Layout>
        </Provider>
    );
}

export default App;
