export const default_server_id = "246579998448812042";
export const default_channel_id = "762846657284669440";
export const default_prefix = "+play";

export const storage_key = "discordMusicFast";

export const getBrowser = () => {
    return chrome?.storage ? chrome : browser;
};

export const getStorage = async () => {
    // For Chrome
    if (chrome?.storage) {
        return new Promise((resolve) => {
            chrome.storage.sync.get([storage_key], function (result) {
                resolve(result[storage_key]);
            });
        });
    }
    // For Firefox
    else if (true) {
        return new Promise((resolve) => {
            browser.storage.sync.get([storage_key], function (result) {
                resolve(result[storage_key]);
            });
        });
    }
    // For Dev
    else if (process?.env?.NODE_ENV === "development") {
        return JSON.parse(localStorage.getItem(storage_key));
    }
};

export const setStorage = async (dataObject) => {
    // For Chrome
    if (chrome?.storage) {
        return new Promise((resolve) => {
            chrome.storage.sync.set({ [storage_key]: dataObject }, function (result) {
                resolve(result);
            });
        });
    }
    // For Firefox
    else if (true) {
        return new Promise((resolve) => {
            browser.storage.sync.set({ [storage_key]: dataObject }, function (result) {
                resolve(result);
            });
        });
    }
    // For Dev
    else if (process?.env?.NODE_ENV === "development") {
        return localStorage.setItem(storage_key, JSON.stringify(dataObject));
    }
};
