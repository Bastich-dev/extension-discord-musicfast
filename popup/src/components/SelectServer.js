import { useEffect, useState } from "react";
import { default_server_id } from "..";
import { getGuilds } from "../_api";
import { useApp } from "./App";

export default function SelectServer() {
    const { app, setApp } = useApp();
    const [serverList, setServerList] = useState();

    useEffect(() => {
        getGuilds().then(servers => {
            setServerList(servers);
        });
    }, []);

    useEffect(() => {
        if (app.server === false && !!serverList?.length) {
            const default_server = serverList.find(s => s.id === default_server_id);
            setApp(e => ({ ...e, server: default_server || serverList[0] }));
        }
    }, [app.server, serverList]);

    return (
        <>
            <label>Serveur :</label>
            {!!serverList && (
                <select
                    value={app.server?.id}
                    onChange={evt => {
                        setApp(e => ({ ...e, server: serverList.find(s => s.id === evt.target.value) }));
                    }}>
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
