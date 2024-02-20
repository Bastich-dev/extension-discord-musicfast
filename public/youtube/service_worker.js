import { getBrowser, getStorage } from "../utils.js";

getBrowser().runtime.onInstalled.addListener(() => {
    getStorage().then((app) => {
        getBrowser().contextMenus.create(
            {
                id: "sendlinktodiscord",
                title: `Jouer sur Discord`,
                contexts: ["link"],
                targetUrlPatterns: ["https://*.youtube.com/*"],
            },
            () => {
                // TODO: Do not forget to read the "browser.runtime.lastError" property to
                // avoid warnings about an uncaught error when the menu item was created
                // before ("ID already exists: my-menu").
            }
        );
    });
});

getBrowser().contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId == "sendlinktodiscord") {
        getStorage().then((app) => {
            fetch("https://discord.com/api/v9/channels/" + app.channel.id + "/messages", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: app.token,
                    origin: "https://discord.com",
                    referer: `https://discord.com/channels/${app.server.id}/${app.channel.id}`,
                },
                body: JSON.stringify({
                    content: app.prefix + " " + info.linkUrl,
                    flags: 0,
                    nonce: (Math.random() * (9999999999 - 1) + 1).toFixed(0),
                    tts: false,
                }),
            });
        });
    }
});
