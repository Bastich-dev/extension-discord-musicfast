import React, { createContext, useCallback, useContext, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { getUser } from "../api";
import Modules from "../modules/_index";
import { default_prefix, getBrowser, setStorage, storage_key } from "../utils";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";

const defaultApp = {
    user: false,
    token: false,
    server: false,
    channel: false,
    prefix: default_prefix,
    message: false,
};

const browserTarget = getBrowser();

const AppContext = createContext(undefined);

export function useApp() {
    return useContext(AppContext);
}

export default function App() {
    const [app, setApp] = useLocalStorage(storage_key, defaultApp);

    const updateApp = useCallback(
        (newApp) => {
            setApp({ ...app, ...newApp });
            setStorage({ ...app, ...newApp });
        },
        [app]
    );

    // Automatic Auth
    useEffect(() => {
        if (app?.token) {
            getUser(app.token).then((user) => {
                browserTarget.action.setBadgeBackgroundColor({ color: "#13870b" }, () => {
                    browserTarget.action.setBadgeText({ text: " o" }, () => {});
                });
                updateApp({
                    user,
                    message: false,
                });
            });
        } else {
            browserTarget.action.setBadgeBackgroundColor({ color: "#cc0000" }, () => {
                browserTarget.action.setBadgeText({ text: " x" }, () => {});
            });
            updateApp({
                user: false,
                token: false,
                message: "Connecte toi sur Discord avec ton navigateur",
            });
        }
    }, [app?.token]);

    const resetApp = useCallback(() => {
        setApp(defaultApp);
    }, []);

    return (
        <AppContext.Provider
            value={{
                app,
                updateApp,
                resetApp,
            }}>
            <Header />
            <main>{!!app?.token ? <Modules /> : <Login />}</main>
            <Footer />
        </AppContext.Provider>
    );
}
