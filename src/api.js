export const getGuilds = async (token) => {
    const response = await fetch("https://discord.com/api/v9/users/@me/guilds", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: token,
            origin: "https://discord.com",
        },
    });
    if (response.status === 200) return response.json();
};

export const getChannels = async (token, server_id) => {
    const response = await fetch("https://discord.com/api/v9/guilds/" + server_id + "/channels", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: token,
            origin: "https://discord.com",
        },
    });
    if (response.status === 200) return response.json();
};

export const getUser = async (token) => {
    const response = await fetch("https://discord.com/api/v9/users/@me", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: token,
            origin: "https://discord.com",
        },
    });

    if (response.status === 200) return response.json();
};

export const sendMessageToDiscord = async (app, text) => {
    const token = app.token;
    const server_id = app.server.id;
    const channel_id = app.channel.id;

    const response = await fetch("https://discord.com/api/v9/channels/" + channel_id + "/messages", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            authorization: token,
            origin: "https://discord.com",
            referer: `https://discord.com/channels/${server_id}/${channel_id}`,
        },
        body: JSON.stringify({
            content: text,
            flags: 0,
            nonce: (Math.random() * (9999999999 - 1) + 1).toFixed(0),
            tts: false,
        }),
    });

    if (response.status === 200) return response.json();
    else throw Error("sendMessageToDiscord failed");
};
