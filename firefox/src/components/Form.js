import { useCallback, useState } from "react";
import { useApp } from "./App";
import SelectChannel from "./SelectChannel";
import SelectPrefix from "./SelectPrefix";
import SelectServer from "./SelectServer";
import useLongPress from "./useLongPress";
export default function Form() {
    const { user, app, setApp } = useApp();

    const sendToDiscord = useCallback(
        text => {
            setUsed(true);
            fetch("https://discord.com/api/v9/channels/" + app.channel.id + "/messages", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: app.token,
                    origin: "https://discord.com",
                    referer: `https://discord.com/channels/${app.server.id}/${app.channel.id}`,
                },
                body: JSON.stringify({
                    content: text,
                    flags: 0,
                    nonce: (Math.random() * (9999999999 - 1) + 1).toFixed(0),
                    tts: false,
                }),
            }).then(() => {
                setTimeout(() => {
                    setUsed(false);
                }, 500);
            });
        },
        [app]
    );

    const [used, setUsed] = useState(false);

    const backspaceLongPress = useLongPress(() => {
        sendToDiscord("+leave");
    }, 500);

    const backspaceLongPress2 = useLongPress(() => {
        sendToDiscord("+skip");
    }, 500);

    if (user === null)
        return (
            <form>
                <img src="https://memorial.cfm.org.br/application/img/loading.gif" width={60} height={60} />
            </form>
        );
    else if (!user) {
        return (
            <form>
                <label>Token :</label>
                <textarea
                    rows={4}
                    onBlur={e => setApp(k => ({ ...k, token: formatToken(e.target.value) }))}
                    onKeyDown={e => {
                        const code = e.which || e.keyCode;
                        let charCode = String.fromCharCode(code).toLowerCase();
                        if ((e.ctrlKey || e.metaKey) && charCode === "v") {
                            setTimeout(() => {
                                e.target.blur();
                            }, 200);
                        }
                    }}
                />

                <a href="https://scribehow.com/shared/Discord_Fast_Music_Workflow__m6rwC5w0RWeKQ0frOQUVwA" target="_blank" rel="noopenner noreferrer">
                    Comment obtenir mon token ?
                </a>
            </form>
        );
    } else if (user)
        return (
            <form
                onSubmit={e => {
                    e.preventDefault();
                }}>
                <SelectPrefix />
                <SelectServer />
                <SelectChannel />
                <div id="actions">
                    <button
                        disabled={!!used}
                        {...backspaceLongPress}
                        children="Leave"
                        //
                    />

                    <button
                        disabled={!!used}
                        {...backspaceLongPress2}
                        children="Skip"
                        //
                    />
                </div>
            </form>
        );
}

const formatToken = token => {
    if (token.includes("'")) return token.split("'")[1];
    else
        return token
            .replace(/(\r\n|\n|\r)/gm, "")
            .replaceAll('"', "")
            .replaceAll("'", "")
            .replaceAll("`", "");
};
