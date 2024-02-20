import { useApp } from "../layout/_index";
import { getBrowser } from "../utils";

const browserTarget = getBrowser();

export default function SelectPrefix() {
    const { app, updateApp } = useApp();

    return (
        <>
            <label>Préfixe :</label>
            <input
                defaultValue={app.prefix}
                onBlur={(e) => {
                    updateApp({ prefix: e.target.value });
                    browserTarget.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                        if (tabs.length && tabs[0].url.includes("youtube.com")) {
                            browserTarget.tabs.sendMessage(tabs[0].id, { action: "reloadPage" }, function () {});
                        }
                    });
                }}
            />
        </>
    );
}
