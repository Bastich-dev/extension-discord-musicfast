import { useEffect, useState } from "react";
import { default_channel_id } from "../constants";
import { useApp } from "./App";

export default function SelectChannel() {
    const { app, setApp } = useApp();
    const [channelList, setChannelList] = useState();

    useEffect(() => {
        if (app.server?.id)
            fetch(`https://discord.com/api/v9/guilds/${app.server.id}/channels`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: app.token,
                    origin: "https://discord.com",
                },
            })
                .then(res => res.json())
                .then(channels => {
                    const channelResp = channels?.filter(e => e.bitrate === undefined && e.last_message_id);
                    if (!app.channel) {
                        if (channelResp.find(e => e.id === default_channel_id))
                            setApp(k => ({ ...k, channel: channelResp.find(e => e.id === default_channel_id) }));
                        else setApp(k => ({ ...k, channel: channelResp[0] }));
                    }

                    setChannelList(channelResp);
                });
    }, [app.server, app.channel]);

    return (
        <>
            <label>Channel textuel :</label>
            {channelList && (
                <select
                    defaultValue={app.channel.id}
                    onChange={u => setApp(k => ({ ...k, channel: channelList.find(e => e.id === u.target.value) }))}>
                    {channelList?.map((server, key) => (
                        <option key={key} value={server.id}>
                            {server.name}
                        </option>
                    ))}
                </select>
            )}
        </>
    );
}
