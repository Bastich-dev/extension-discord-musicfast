import { useState } from "react";
import { sendMessageToDiscord } from "../api";
import { useApp } from "../layout/_index";
import useLongPress from "./useLongPress";

export default function Actions() {
    const { app, updateApp } = useApp();

    const [used, setUsed] = useState(false);

    const sendToDiscord = (text) => {
        setUsed(true);
        sendMessageToDiscord(app, text).then((res) => {
            updateApp({
                message: "Commande envoyée",
            });
            setTimeout(() => {
                setUsed(false);
            }, 500);
            setTimeout(() => {
                updateApp({
                    messge: false,
                });
            }, 1500);
        });
    };

    const backspaceLongPress = useLongPress(() => {
        sendToDiscord("+leave");
    }, 500);

    const backspaceLongPress2 = useLongPress(() => {
        sendToDiscord("+skip");
    }, 500);

    return (
        <div id="actions">
            <button disabled={!!used} {...backspaceLongPress} children="Leave" />
            <button disabled={!!used} {...backspaceLongPress2} children="Skip" />
        </div>
    );
}
