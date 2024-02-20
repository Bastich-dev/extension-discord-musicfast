(async () => {
    const srcUtils = chrome.runtime.getURL("utils.js");
    const { sendFromYoutube, addModificationHandler } = await import(srcUtils);

    window.addEventListener("load", async () => {
        addModificationHandler({
            wrapper: "ytmusic-popup-container",
            popup: "tp-yt-paper-listbox",
            newEl: `<div class="youtubeMusic">
                <img src="https://upload.wikimedia.org/wikipedia/fr/4/4f/Discord_Logo_sans_texte.svg" width="24" height="24" />
                <span>Jouer sur Discord</span>
            </div>`,
            condition: (popupEl) => {
                return popupEl && !popupEl.querySelector(".youtubeMusic");
            },
            onClick: (popupEl) => {
                const link = popupEl.querySelector("#navigation-endpoint").href;
                sendFromYoutube(link);
                document.querySelector("ytmusic-app-layout").click();
            },
            insert: (popupEl, domElement) => {
                const link = popupEl.querySelector("#navigation-endpoint")?.href;
                const launchRadio = Array.from(popupEl.querySelectorAll(".text")).find((e) => e.innerText === "Lancer la radio");
                if (link && popupEl.childElementCount > 4 && launchRadio) popupEl.insertBefore(domElement, popupEl.firstChild);
            },
        });
    });
})();
