import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './components/Loader/Loader.tsx';
import { routes } from './routes/routes.tsx';
import { ErrorResponseSchema } from './schemas/ErrorResponse.ts';
import { theme } from './styles/theme.ts';

const router = createBrowserRouter(routes);
const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            onError: (error, variables, context) => {
                const typedError = error as ErrorResponseSchema;
                const message = (
                    <div style={{ whiteSpace: 'pre-line' }}>
                        {`Um erro ocorreu. Contate o suporte.\nLog: ${JSON.stringify(typedError)}`}
                    </div>
                );
                toast.error(message);
            },
        },
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
                <ToastContainer position="top-center" />
                <Loader />
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
