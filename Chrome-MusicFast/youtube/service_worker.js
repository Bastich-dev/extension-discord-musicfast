const storage_key = "discordMusicFast";

const getBrowser = () => {
    return navigator.userAgent.toLowerCase().includes("firefox") ? browser : chrome;
};

const getStorage = async () => {
    // For Chrome

    if (chrome?.storage) {
        console.log("use chrome");
        return new Promise((resolve) => {
            chrome.storage.local.get([storage_key], function (result) {
                resolve(result[storage_key]);
            });
        });
    }

    // For Firefox
    else if (navigator.userAgent.toLowerCase().includes("firefox")) {
        console.log("use firefox");
        return browser.storage.local.get([storage_key], (res) => {
            return res;
        });
    }

    // For Dev
    else if (process?.env?.NODE_ENV === "development") {
        console.log("use dev");
        return JSON.parse(localStorage.getItem(storage_key));
    }
};

getBrowser().runtime.onInstalled.addListener(() => {
    getBrowser().contextMenus.create({
        id: "sendlinktodiscord",
        title: `Jouer sur Discord`,
        contexts: ["link"],
        targetUrlPatterns: ["https://*.youtube.com/*"],
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
