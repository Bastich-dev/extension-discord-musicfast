import { useEffect, useState } from "react";
import { default_channel_id } from "..";
import { getChannels } from "../_api";
import { useApp } from "./App";

export default function SelectChannel() {
    const { app, setApp } = useApp();
    const [channelList, setChannelList] = useState();

    useEffect(() => {
        if (app.server)
            getChannels(app.server.id).then(channels => {
                setChannelList(channels?.filter(e => e.bitrate === undefined && e.last_message_id));
            });
    }, [app.server]);

    useEffect(() => {
        if (app.channel === false && !!channelList?.length) {
            const default_channel = channelList.find(s => s.id === default_channel_id);
            setApp(e => ({ ...e, channel: default_channel || channelList[0] }));
        }
    }, [app.channel, channelList]);
    console.log(app);
    return (
        <>
            <label>Channel textuel :</label>
            {!!channelList && (
                <select
                    value={app.channel?.id}
                    onChange={evt => {
                        setApp(e => ({ ...e, channel: channelList.find(s => s.id === evt.target.value) }));
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
