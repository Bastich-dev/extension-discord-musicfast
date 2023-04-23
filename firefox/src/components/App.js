import { createContext, useCallback, useContext, useEffect, useState } from "react";

const AppContext = createContext(undefined);

export function useApp() {
    return useContext(AppContext);
}

export default function App({ children }) {
    // Dynamic data
    const [user, setUser] = useState(false);
    const [message, setMessage] = useState(null);

    // Persistant data
    const [app, setApp] = useState(null);
    useEffect(() => {
        // For prod
        if (app) browser.storage.local.set({ app });
        else {
            browser.storage.local.get(["app"]).then(({ app }) => {
                setApp(
                    app || {
                        token: null,
                        server: null,
                        channel: null,
                        prefix: "+play",
                    }
                );
            });
        }
        // For dev
        // if (app) localStorage.setItem("app", JSON.stringify(app));
        // else {
        //     const storage = localStorage.getItem("app");
        //     if (storage) setApp(JSON.parse(storage));
        //     else
        //         setApp({
        //             token: null,
        //             server: null,
        //             channel: null,
        //             prefix: "+play",
        //         });
        // }
    }, [app]);

    useEffect(() => {
        if (app?.channel && app?.server)
            browser?.contextMenus?.update("sendlinktodiscord", { title: "Jouer sur : " + app?.server.name + " - " + app?.channel.name });
    }, [app?.server, app?.channel]);

    useEffect(() => {
        if (app?.token) getUser(app.token);
        else {
            setUser(false);
        }
    }, [app?.token]);

    function getUser(access_token) {
        setUser(null);
        setTimeout(() => {
            fetch("https://discord.com/api/v9/users/@me", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: access_token,
                    origin: "https://discord.com",
                },
            })
                .then(res => res.json())
                .then(user => {
                    if (user.code === 0) ErrorLog();
                    else {
                        browser.browserAction.setBadgeBackgroundColor({ color: "#13870b" }, () => {
                            browser.browserAction.setBadgeText({ text: "ok" }, () => {
                                browser.browserAction.setBadgeTextColor({ color: "#000" }, () => {});
                            });
                        });
                        setUser({
                            ...user,
                            avatar: "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + ".webp?size=32",
                        });
                        setMessage({
                            text: "Connexion réussie",
                            color: "yellowgreen",
                        });
                    }
                })
                .catch(ErrorLog);
        }, 400);
    }

    const ErrorLog = useCallback(() => {
        setApp({ app, prefix: app.prefix, token: null });
        setUser(false);
        setMessage({
            text: "Erreur identification",
            color: "red",
        });
        browser.browserAction.setBadgeBackgroundColor({ color: "#ff0000" }, () => {
            browser.browserAction.setBadgeText({ text: "-" }, () => {
                browser.browserAction.setBadgeTextColor({ color: "#000" }, () => {});
            });
        });
    }, [app]);

    const login = useCallback(() => {
        getUser(app.token);
    }, [app?.token]);

    const logout = () => {
        setUser(null);
        setApp({ token: null, server: null, channel: null, prefix: app.prefix });
        setMessage({
            text: "Déconnexion réussie",
            color: "yellowgreen",
        });
        browser.browserAction.setBadgeBackgroundColor({ color: "#ff0000" }, () => {
            browser.browserAction.setBadgeText({ text: "-" }, () => {
                browser.browserAction.setBadgeTextColor({ color: "#000" }, () => {});
            });
        });
    };

    return (
        <AppContext.Provider
            value={{
                app,
                setApp,
                //
                user,
                setUser,
                message,
                setMessage,
                //
                getUser,
                login,
                logout,
            }}>
            {children}
        </AppContext.Provider>
    );
}

// (webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]),m).find(m=>m?.exports?.default?.getToken!==void 0).exports.default.getToken()
