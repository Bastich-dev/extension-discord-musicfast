import { useEffect, useState } from "react";
import { default_server_id } from "../constants";
import { useApp } from "./App";

export default function SelectServer() {
    const { app, setApp } = useApp();
    const [serverList, setServerList] = useState();

    useEffect(() => {
        fetch("https://discord.com/api/v9/users/@me/guilds", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: app.token,
                origin: "https://discord.com",
            },
        })
            .then(res => res.json())
            .then(servers => {
                if (!app.server) {
                    if (servers.find(e => e.id === default_server_id)) setApp(k => ({ ...k, server: servers.find(e => e.id === default_server_id) }));
                    else setApp(k => ({ ...k, server: servers[0] }));
                }
                setServerList(servers);
            });
    }, []);

    return (
        <>
            <label>Serveur :</label>
            {serverList && (
                <select defaultValue={app.server.id} onChange={e => setApp(k => ({ ...k, server: serverList.find(u => u.id === e.target.value) }))}>
                    {serverList?.map((server, key) => (
                        <option key={key} value={server.id}>
                            {server.name}
                        </option>
                    ))}
                </select>
            )}
        </>
    );
}
