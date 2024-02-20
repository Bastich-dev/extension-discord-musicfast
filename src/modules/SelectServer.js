import { useEffect, useState } from "react";
import { getGuilds } from "../api";
import { useApp } from "../layout/_index";
import { default_server_id, getBrowser } from "../utils";

const browserTarget = getBrowser();

export default function SelectServer() {
    const { app, updateApp } = useApp();
    const [serverList, setServerList] = useState();

    useEffect(() => {
        getGuilds(app.token).then((servers) => {
            setServerList(servers);
        });
    }, []);

    useEffect(() => {
        if (app.server === false && !!serverList?.length) {
            const default_server = serverList.find((s) => s.id === default_server_id);
            updateApp({ server: default_server || serverList[0] });
        }
    }, [app.server, serverList]);

    return (
        <>
            <label>Serveur :</label>
            {!!serverList && (
                <select
                    value={app.server?.id}
                    onChange={(evt) => {
                        updateApp({ server: serverList.find((s) => s.id === evt.target.value), channel: false });
                        browserTarget.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                            if (tabs.length && tabs[0].url.includes("youtube.com")) {
                                browserTarget.tabs.sendMessage(tabs[0].id, { action: "reloadPage" }, function () {});
                            }
                        });
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
