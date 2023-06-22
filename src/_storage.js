export const default_server_id = "246579998448812042";
export const default_channel_id = "762846657284669440";

export const getStorage = async keys => {
    //
    // For Dev
    if (process.env.NODE_ENV === "development") {
        return keys.reduce((acc, cur) => {
            acc[cur] = JSON.parse(localStorage.getItem(cur));
            return acc;
        }, {});
    }
    //
    // For Chrome
    else if (chrome?.storage) {
        return new Promise(resolve => {
            chrome.storage.sync.get(keys, function (result) {
                resolve(result);
            });
        });
    }
    //

    // For Firefox
    else if (navigator.userAgent.toLowerCase().includes("firefox")) {
        return browser.storage.sync.get(keys, res => {
            return res;
        });
    }
};

export const setStorage = async dataObject => {
    if (process.env.NODE_ENV === "development") {
        return Object.keys(dataObject).forEach(key => {
            localStorage.setItem(key, JSON.stringify(dataObject[key]));
        });
    }
    //
    // For Chrome
    else if (chrome?.storage) {
        return new Promise(resolve => {
            chrome.storage.sync.set(dataObject, function (result) {
                resolve(result);
            });
        });
    }
    //

    // For Firefox
    else if (navigator.userAgent.toLowerCase().includes("firefox")) {
        return browser.storage.sync.set(keys, res => {
            return res;
        });
    }
    //
    // For Dev
};

export const setIconActive = () => {
    //
    // For Chrome
    if (chrome?.storage) {
        chrome.browserAction.setBadgeBackgroundColor({ color: "#13870b" }, () => {
            chrome.browserAction.setBadgeText({ text: "ok" }, () => {
                chrome.browserAction.setBadgeTextColor({ color: "#000" }, () => {});
            });
        });
    }
    //

    // For Firefox
    else if (navigator.userAgent.toLowerCase().includes("firefox")) {
        browser.browserAction.setBadgeBackgroundColor({ color: "#13870b" }, () => {
            browser.browserAction.setBadgeText({ text: "ok" }, () => {
                browser.browserAction.setBadgeTextColor({ color: "#000" }, () => {});
            });
        });
    }
    //
    // For Dev
    else {
        //
    }
};
