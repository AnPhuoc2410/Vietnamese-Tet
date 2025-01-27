function getData(key) {
    const json = sessionStorage[key];
    return JSON.parse(json);
}

function storeData(key, object) {
    const json = JSON.stringify(object);
    window.sessionStorage[key] = json;
}

export default {
    get: getData,
    store: storeData
};