window.playToDiscord = playToDiscord;

const iconDiscord = chrome.runtime.getURL("discord-white.png");

function playToDiscord(link) {
    const formattedLink = formatLink(link);

    chrome.storage.sync.get(["app"], ({ app }) => {
        fetch("https://discord.com/api/v9/channels/" + app.channel.id + "/messages", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: app.token,
                origin: "https://discord.com",
                referer: `https://discord.com/channels/${app.server.id}/${app.channel.id}`,
            },
            body: JSON.stringify({
                content: app.prefix + " " + formattedLink,
                flags: 0,
                nonce: (Math.random() * (9999999999 - 1) + 1).toFixed(0),
                tts: false,
            }),
        })
            .then(res => res.json())
            .then(response => {
                // if (response.nonce) animComplete(response);
            });
    });
}

function formatLink(link) {
    let toChangeLink = link;
    if (toChangeLink.includes("watch?playlist=")) toChangeLink = toChangeLink.replace("watch?playlist=", "playlist?list=");
    if (toChangeLink.includes("playlist") && !toChangeLink.includes("feature=share")) toChangeLink += "&feature=share";
    else if (toChangeLink.includes("&list=")) toChangeLink = link.split("&list=")[0];
    return toChangeLink;
}
