(async () => {
    const { getBrowser, sendFromYoutube, addModificationHandler } = await import("../utils.js");

    window.addEventListener("load", async () => {
        getBrowser().runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.action === "reloadPage") {
                window.location.reload();
            }
        });

        addModificationHandler({
            wrapper: "ytd-app",
            popup: "yt-third-party-network-section-renderer",
            newEl: `
            <div class="youtube">
                <img src="https://upload.wikimedia.org/wikipedia/fr/4/4f/Discord_Logo_sans_texte.svg" width="24" height="24" />
                <span>Jouer sur Discord</span>
            </div>`,
            onClick: (popupEl) => {
                const link = document.querySelector("#share-url").value;
                sendFromYoutube(link);
                document.querySelector("#content").click();
            },
            condition: (popupEl) => {
                return popupEl.childElementCount === 3;
            },
            insert: (popupEl, domElement) => {
                popupEl.insertBefore(domElement, popupEl.querySelector("#copy-link"));
            },
        });

        addModificationHandler({
            wrapper: "body",
            popup: ".ytp-contextmenu .ytp-panel-menu",
            newEl: `
            <div class="ytp-menuitem" aria-haspopup="false" role="menuitem" tabindex="0">
                <div class="ytp-menuitem-icon">
                    <img src="https://upload.wikimedia.org/wikipedia/fr/4/4f/Discord_Logo_sans_texte.svg" width="24" height="24" />
                </div>
                <div class="ytp-menuitem-label">Jouer sur Discord</div>
                <div class="ytp-menuitem-content"></div>
            </div>
            `,
            onClick: (popupEl) => {
                const link = document.querySelector("link[rel=shortlinkUrl]").getAttribute("href");
                sendFromYoutube(link);
                document.querySelector("body").click();
            },
            condition: (popupEl) => {
                return popupEl.childElementCount === 7;
            },
            insert: (popupEl, domElement) => {
                popupEl.insertBefore(domElement, popupEl.firstChild);
            },
        });
    });
})();
