function setCookie(name, value) {
    localStorage.setItem(name, value);
}

function getCookie(name) {
    var value = localStorage.getItem(name);
    return value;
}

function deleteCookie(name) {
<<<<<<< Updated upstream
    localStorage.removeItem(name)
}
=======
    document.cookie = name + '=;Max-Age=-99999999;path=/;';
}
>>>>>>> Stashed changes
