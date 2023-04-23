window.addEventListener("load", async () => {
    const src = chrome.runtime.getURL("utils.js");
    await import(src);

    const wrapper = document.querySelector("ytmusic-popup-container");

    const observer = new MutationObserver((mutations, observer) => {
        const popup = wrapper.querySelector("#items");
        chrome.storage.sync.get(["app"], function ({ app }) {
            if (popup && !popup.querySelector(".youtubeMusic") && app) {
                const newEl = document.createElement("div");
                newEl.className = "youtubeMusic";
                newEl.innerHTML = `
<img src="https://upload.wikimedia.org/wikipedia/fr/4/4f/Discord_Logo_sans_texte.svg" width="24" height="24" />
<span>Jouer sur : ${app?.server?.name} - ${app?.channel?.name}</span>
`;
                newEl.onclick = () => {
                    const link = popup.querySelector(".iron-selected #navigation-endpoint").href;
                    window.playToDiscord(link);
                    document.querySelector("ytmusic-app-layout").click();
                };

                const link = popup.querySelector(".iron-selected #navigation-endpoint")?.href;

                const launchRadio = Array.from(popup.querySelectorAll(".text")).find(e => e.innerText === "Lancer la radio");
                if (link && popup.childElementCount > 4 && launchRadio) popup.insertBefore(newEl, popup.firstChild);
            }
        });

        /// Share youtube dialog
        const popup2 = wrapper.querySelector("yt-third-party-network-section-renderer");
        chrome.storage.sync.get(["app"], async function ({ app }) {
            if (popup2 && popup2.childElementCount === 3 && app) {
                const newEl = document.createElement("div");
                newEl.className = "youtubeMusic";
                newEl.innerHTML = `
                <img src="https://upload.wikimedia.org/wikipedia/fr/4/4f/Discord_Logo_sans_texte.svg" width="24" height="24" />
                <span>Jouer sur : ${app?.server?.name} - ${app?.channel?.name}</span>
                `;
                newEl.style.marginTop = "16px";
                newEl.onclick = () => {
                    const link = document.querySelector("#share-url").value;
                    window.playToDiscord(link);
                    wrapper.querySelector("#close-button").click();
                };
                popup2.insertBefore(newEl, popup2.querySelector("#copy-link"));
            }
        });
    });

    observer.observe(wrapper, {
        subtree: true,
        childList: true,
    });
});
