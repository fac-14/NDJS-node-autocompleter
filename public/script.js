
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

function callback(obj) {
  // create array with limited length
  var array = createLimitedArray(obj);
  // convert array to html
  var html = constructDataList(array);
    // append html to input field

  console.log(array);
}

function createLimitedArray(obj){
  // create an empty array
  var limitedArray = Object.keys(obj);
  // array with limited length
  if (limitedArray.length > 5) {
    limitedArray = limitedArray.slice(0,5);
  } else if (limitedArray.length === 0) {
    // if object is empty
    limitedArray.push('No matches found');
  }
  return limitedArray;
}


function constructDataList(arr) {
  // data list items appended to the
}
