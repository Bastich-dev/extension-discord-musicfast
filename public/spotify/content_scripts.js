window.addEventListener("load", async () => {
    const src = chrome.runtime.getURL("utils.js");
    await import(src);
    const wrapper = document.querySelector("body");

    const observer = new MutationObserver((mutations, observer) => {
        const popup = wrapper.querySelector("div[data-tippy-root]");

        chrome.storage.sync.get(["app"], async function ({ app }) {
            if (popup && app) {
                const newEl = document.createElement("div");
                newEl.className = "youtube";
                newEl.innerHTML = `
        <img src="https://upload.wikimedia.org/wikipedia/fr/4/4f/Discord_Logo_sans_texte.svg" width="24" height="24" />
        <span>Jouer sur : ${app.server.name} - ${app.channel.name}</span>
        `;
                newEl.onclick = () => {
                    // const link = document.querySelector("#share-url").value;
                    // window.playToDiscord(link);
                    // wrapper.querySelector("#close-button").click();
                };
                popup.insertBefore(newEl, popup.querySelector("ul[role='menu']"));
            }
        });
    });

    observer.observe(wrapper, {
        subtree: true,
        childList: true,
    });
});
