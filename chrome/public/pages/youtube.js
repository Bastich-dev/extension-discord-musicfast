const src = chrome.runtime.getURL("utils.js");
import(src);

const wrapper = document.querySelector("ytd-popup-container");

const observer = new MutationObserver((mutations, observer) => {
    const popup = wrapper.querySelector("yt-third-party-network-section-renderer");
    chrome.storage.sync.get(["app"], ({ app }) => {
        if (popup && popup.childElementCount === 3 && app) {
            const newEl = document.createElement("div");
            newEl.className = "youtube";
            newEl.innerHTML = `
    <img src="https://upload.wikimedia.org/wikipedia/fr/4/4f/Discord_Logo_sans_texte.svg" width="24" height="24" />
    <span>Jouer sur : ${app?.server?.name} - ${app?.channel?.name}</span>
    `;
            newEl.onclick = () => {
                const link = document.querySelector("#share-url").value;
                window.playToDiscord(link);
                wrapper.querySelector("#close-button").click();
            };
            popup.insertBefore(newEl, popup.querySelector("#copy-link"));
        }
    });
});
observer.observe(wrapper, {
    subtree: true,
    childList: true,
});
