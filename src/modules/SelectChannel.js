import { useEffect, useState } from "react";
import { getChannels } from "../api";
import { useApp } from "../layout/_index";
import { default_channel_id, getBrowser } from "../utils";

const browserTarget = getBrowser();

export default function SelectChannel() {
    const { app, updateApp } = useApp();
    const [channelList, setChannelList] = useState();

    const server_id = app?.server?.id;
    const channel_id = app?.channel?.id;

    useEffect(() => {
        if (server_id) {
            setChannelList([]);
            getChannels(app.token, server_id).then((channels) => {
                const result = channels?.filter((e) => e.bitrate === undefined && e.last_message_id);
                setChannelList(result);
                if (!channel_id) {
                    const default_channel = result.find((s) => s.id === default_channel_id);
                    updateApp({ channel: default_channel || result[0] });
                }
            });
        }
    }, [server_id, channel_id]);

    return (
        <>
            <label>Channel textuel :</label>
            {!!channelList && (
                <select
                    value={app.channel?.id}
                    onChange={(evt) => {
                        updateApp({ channel: channelList.find((s) => s.id === evt.target.value) });
                        browserTarget.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                            if (tabs.length && tabs[0].url.includes("youtube.com")) {
                                browserTarget.tabs.sendMessage(tabs[0].id, { action: "reloadPage" }, function () {});
                            }
                        });
                    }}>
                    {channelList?.map((channel, key) => (
                        <option key={key} value={channel.id}>
                            {channel.name}
                        </option>
                    ))}
                </select>
            )}
        </>
    );
}
