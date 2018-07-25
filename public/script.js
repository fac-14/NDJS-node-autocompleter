var searchInput = document.getElementById("search");

searchInput.addEventListener('keyup', function (e){
    if(searchInput.value){
    console.log(searchInput.value);
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
