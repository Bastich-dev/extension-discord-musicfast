import { useEffect } from "react";
import { getBrowser } from "../utils";
import { useApp } from "./_index";

const browserTarget = getBrowser();

export default function Login() {
    const { updateApp } = useApp();

    useEffect(() => {
        const interval = setInterval(() => {
            try {
                browserTarget.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    if (tabs.length && tabs[0].url.includes("discord.com")) {
                        browserTarget.tabs.sendMessage(tabs[0].id, { action: "openExtensionPopup" }, function (token) {
                            if (token) {
                                clearInterval(interval);
                                updateApp({ token });
                            }
                        });
                    } else {
                        clearInterval(interval);
                        alert("Only for discord.com.");
                    }
                });
            } catch {
                console.log("Re-trying to connect...");
            }
        }, 1500);
    }, []);

    return (
        <>
            <p>Connectes-toi à discord dans ton navigateur et ré-ouvres cette fenêtre pour te connecter.</p>
            <div id="loading">
                <img src="https://memorial.cfm.org.br/application/img/loading.gif" width={80} height={80} />
            </div>
        </>
    );
}
