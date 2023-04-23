window.playToDiscord = playToDiscord;

const iconDiscord = browser.runtime.getURL("discord-white.png");

function playToDiscord(link) {
    const formattedLink = formatLink(link);

    browser.storage.local.get(["app"]).then(({ app }) => {
        content
            .fetch("https://discord.com/api/v9/channels/" + app.channel.id + "/messages", {
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

// function animComplete({ embeds, content }) {
//     const bodyDocument = document.querySelector("ytd-app") || document.querySelector("ytmusic-app");
//     if (bodyDocument && embeds.length > 0) {
//         const thumbnail = embeds.find(e => e.thumbnail.url)?.thumbnail?.url;
//         const author = embeds.find(e => e.author.name)?.author?.name;
//         const title = embeds.find(e => e.title.name)?.title?.name;
//         const newEl = document.createElement("a");

//         newEl.classList.add("animComplete");
//         newEl.href = content.replace("+play ", "");
//         newEl.target = "_blank";
//         newEl.innerHTML = `
//             <img src="${thumbnail || "https://i.imgur.com/DYpLAQf.png"}" width="24" height="24" />
//             <div>
//                 <b>${author || "Musique jouée sur Discord"}</b>
//                 <span>${title || ""}</span>
//             </div>
// `;
//         bodyDocument.appendChild(newEl);
//         newEl.classList.add("animate__backInRight");

//         setTimeout(() => {
//             newEl.classList.remove("animate__backInRight");
//             newEl.classList.add("animate__backOutRight");
//         }, 3000);
//     }
// }
