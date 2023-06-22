import { useState } from "react";
import { sendMessageToDiscord } from "../_api";
import { useApp } from "./App";
import SelectChannel from "./SelectChannel";
import SelectPrefix from "./SelectPrefix";
import SelectServer from "./SelectServer";
import useLongPress from "./useLongPress";
export default function Form() {
    const { setMessage } = useApp();

    const [used, setUsed] = useState(false);

    const sendToDiscord = text => {
        setUsed(true);
        sendMessageToDiscord(text).then(res => {
            setMessage({
                text: "Commande envoyée",
                color: "yellowgreen",
            });
            setTimeout(() => {
                setUsed(false);
            }, 500);
            setTimeout(() => {
                setMessage(false);
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
