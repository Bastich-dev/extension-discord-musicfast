export const default_server_id = "246579998448812042";
export const default_channel_id = "762846657284669440";
export const default_prefix = "+play";

export const storage_key = "discordMusicFast";

export const getBrowser = () => {
    return navigator.userAgent.toLowerCase().includes("firefox") ? chrome : browser;
};

export const getBrowserActions = () => {
    return navigator.userAgent.toLowerCase().includes("firefox") ? chrome.browserAction : chrome.actions;
};

export const getStorage = async () => {
    // For Chrome

    if (chrome?.storage) {
        console.log("use chrome");
        return new Promise((resolve) => {
            chrome.storage.local.get([storage_key], function (result) {
                resolve(result[storage_key]);
            });
        });
    }

    // For Firefox
    else if (navigator.userAgent.toLowerCase().includes("firefox")) {
        console.log("use firefox");
        return browser.storage.local.get([storage_key], (res) => {
            return res;
        });
    }

    // For Dev
    else if (process?.env?.NODE_ENV === "development") {
        console.log("use dev");
        return JSON.parse(localStorage.getItem(storage_key));
    }
};

export const setStorage = async (dataObject) => {
    // For Chrome
    if (chrome?.storage) {
        console.log("use chrome");
        return new Promise((resolve) => {
            chrome.storage.local.set({ [storage_key]: dataObject }, function (result) {
                resolve(result);
            });
        });
    }
    // For Firefox
    else if (navigator.userAgent.toLowerCase().includes("firefox")) {
        console.log("use firefox");
        return browser.storage.local.get([storage_key], (res) => {
            return res;
        });
    }
    // For Dev
    else if (process?.env?.NODE_ENV === "development") {
        console.log("use dev");
        return localStorage.setItem(storage_key, JSON.stringify(dataObject));
    }
};
