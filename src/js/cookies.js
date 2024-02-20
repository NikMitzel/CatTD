function setCookie(name, value) {
    localStorage.setItem(name, value);
}

function getCookie(name) {
    var value = localStorage.getItem(name);
    return value;
}

function deleteCookie(name) {
    localStorage.removeItem(name)
}
