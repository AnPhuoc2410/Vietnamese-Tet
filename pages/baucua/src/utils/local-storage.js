function getData(key) {
    let array = [];
    const json = localStorage[key];
    if(json) {
        array = JSON.parse(json);
    }
    return array;
}

function storeData(key, object) {
    const array = getData(key);
    if(!array.length) {
        array.push(object);
    } else {
        for(let i = 0; i < array.length; i++) {
            if(array[i].id === object.id) {
                array[i] = object;
                break;
            } else if(i === array.length - 1) {
                array.push(object);
            }
        }
    }
    const json = JSON.stringify(array);
    window.localStorage[key] = json;
}

export default {
    get: getData,
    store: storeData
};