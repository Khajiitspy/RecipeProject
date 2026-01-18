import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store";
import {BrowserRouter} from "react-router";
import {GoogleOAuthProvider} from "@react-oauth/google";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
            <GoogleOAuthProvider clientId="170215211814-16l7q0mqjo44ft4f0dqg4d1jg14fhkcg.apps.googleusercontent.com">
                <App/>
            </GoogleOAuthProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
