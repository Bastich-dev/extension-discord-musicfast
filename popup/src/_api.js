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

export const getChannels = async (server_id) => {
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
            // origin: "http://localhost:3000",
            origin: "https://discord.com",
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
    else return response.status;
};

export const trylogin = async ({ login, password, redirecturl }) => {
    const params = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,\n" + "width=700,height=800,left=50%,top=50%";
    console.log("dqzdqzd");
    const clientId = "1128754827233611848";
    const scopes = "identify";
    const redirect = redirecturl;

    const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirect
    )}&response_type=code&scope=${scopes}`;
    const popup = window.open(url, "Discord Auth", params);

    const interval = setInterval(() => {
        popup.postMessage("", "*"); // Replace * with your origin
    }, 500);

    window.addEventListener(
        "message",
        (event) => {
            if (event.data.code) {
                clearInterval(interval);
                popup.close();

                this.getToken(event.data.code);
            }
        },
        false
    );
};

export const sendMessageToDiscord = async (text) => {
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