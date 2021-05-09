const ttl = 3600000; // 1 hour

export const setLocalStorage = (key, value, noTTL) => {
    const now = new Date();

    const item = {
        value: value,
        expiry: noTTL ? -1 : now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalStorage = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();
    if (item.expiry != -1 && now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
};

export const clearLocalStorageWithTTL = () => {
    let keepItems = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const item = localStorage.getItem(key);
        const parsed = JSON.parse(item);
        if (parsed && parsed.expiry === -1) {
            keepItems.push({ key, item });
        }
    }

    localStorage.clear();
    keepItems.forEach((elem) => localStorage.setItem(elem.key, elem.item));
};
