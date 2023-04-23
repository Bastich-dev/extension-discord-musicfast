browser.runtime.onInstalled.addListener(function () {
    browser.contextMenus.create({
        id: "sendlinktodiscord",
        title: "Jouer sur discord",
        contexts: ["link"],
    });
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "sendlinktodiscord") {
        browser.storage.local.get(["app"]).then(({ app }) => {
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
            })
                .then(res => res.json())
                .then(response => {});
        });
    }
});
