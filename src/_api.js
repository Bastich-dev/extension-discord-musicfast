import { getStorage } from "./_storage";

const url_api = "https://music-fast-discord-extension.vercel.app";

export const getGuilds = async () => {
    const { token } = await getStorage(["token"]);
    const response = await fetch("https://discord.com/api/v9/users/@me/guilds", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: token,
            origin: "https://discord.com",
        },
    });

    if (response.status === 200) return response.json();
    else throw Error("getGuilds failed");
};

export const getChannels = async server_id => {
    const { token } = await getStorage(["token"]);
    const response = await fetch("https://discord.com/api/v9/guilds/" + server_id + "/channels", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: token,
            origin: "https://discord.com",
        },
    });

    if (response.status === 200) return response.json();
    else throw Error("getChannels failed");
};

export const getUser = async () => {
    const { token } = await getStorage(["token"]);
    const response = await fetch("https://discord.com/api/v9/users/@me", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: token,
            origin: "https://discord.com",
        },
    });

    if (response.status === 200) return response.json();
    else throw Error("getUser failed");
};

export const login = async ({ login, password }) => {
    const response = await fetch("https://discord.com/api/v9/auth/login", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            origin: "http://localhost:3000",
        },
        body: JSON.stringify({
            gift_code_sku_id: null,
            login,
            login_source: null,
            password,
            undelete: false,
        }),
    });

    if (response.status === 200) return response.json();
    else throw Error("login failed");
};

export const trylogin = async ({ login, password }) => {
    const response = await fetch(url_api + "/api/login", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            login,
            password,
        }),
    });

    if (response.status === 200) return response.json();
    else throw Error("login failed");
};

export const sendMessageToDiscord = async text => {
    const { token, app } = await getStorage(["token", "app"]);
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
