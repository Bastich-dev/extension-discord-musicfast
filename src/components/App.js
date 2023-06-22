import { createContext, useContext, useEffect, useState } from "react";
import { default_prefix } from "..";
import { getUser } from "../_api";
import { getStorage, setStorage } from "../_storage";
import Footer from "./Footer";
import Form from "./Form";
import Header from "./Header";
import Login from "./Login";

const AppContext = createContext(undefined);

export function useApp() {
    return useContext(AppContext);
}

export default function App({ children }) {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [app, setApp] = useState(null);

    // Sync preferences app
    useEffect(() => {
        if (!!app) setStorage({ app });
        else {
            getStorage(["app"]).then(({ app }) => {
                setApp(
                    app || {
                        server: false,
                        channel: false,
                        prefix: default_prefix,
                    }
                );
            });
        }
    }, [app]);

    // Automatic Auth
    useEffect(() => {
        getUser()
            .then(res => {
                setUser(res);
            })
            .catch(() => {
                setUser(false);
                setMessage({
                    text: "Utilise tes identifiants discord",
                    color: "white",
                });
            });
    }, []);

    return (
        <AppContext.Provider
            value={{
                app,
                setApp,
                user,
                setUser,
                message,
                setMessage,
            }}>
            <Header />
            <main>
                {!!user && !!app && <Form />}
                {user === false && <Login />}
                {user === null && (
                    <div id="loading">
                        <img src="https://memorial.cfm.org.br/application/img/loading.gif" width={80} height={80} />
                    </div>
                )}
            </main>
            <Footer />
        </AppContext.Provider>
    );
}

// (webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]),m).find(m=>m?.exports?.default?.getToken!==void 0).exports.default.getToken()
