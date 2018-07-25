
var searchInput = document.getElementById("search");

searchInput.addEventListener('keyup', function (e){
    // keyup creates string which then gets encoded by urlCreator function and concatinated to url
    if(searchInput.value){
    genericXHR(urlCreator(window.location.href, searchInput.value), callback);
    }
});

function genericXHR (url, cb) {
    var xhr = new XMLHttpRequest(url, cb);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            var parsedObj = JSON.parse(xhr.responseText);
            return cb(parsedObj);
        } else if (xhr.readyState === 4 && xhr.status != 200) {
            console.log("sorry XHR unavailable");
        }
    }
    xhr.open("GET", url, true);
    xhr.send();
}

function urlCreator (url, str){
    // takes url and adds a string value that corresponds to the user search input (str)
    var searchUri = encodeURI(str);
    return url + "search/" + searchUri;
}

function callback() {
console.log("testing XHR URL BLURP");
}

