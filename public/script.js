var datalist = document.getElementById("autocomplete");
var searchInput = document.getElementById("search");
var inputForm = document.getElementById("input-form");
var inputField = document.getElementById("search");
var quoteDisplay = document.getElementById("quote-display");
var speechDiv = document.getElementById("speech");
var globalObj = {};

searchInput.addEventListener('keyup', function (e){
    // keyup creates string which then gets encoded by urlCreator function and concatinated to url
    if(searchInput.value){
    genericXHR(urlCreator(window.location.href, searchInput.value), callback);
    }
});

// Listen for submit, then render relevant info (as second callback)
inputForm.addEventListener("submit", submitEventHandler);

// Proxy for submitting on click - renders quotes if input field matches one of the options!
inputField.addEventListener("input", function(e) {
    if( globalObj[e.target.value] !== undefined ) {
        var infoToRender = globalObj[e.target.value]
        renderQuotes(infoToRender)
        inputField.blur();
    } ;
});


function submitEventHandler(e){
    e.preventDefault();
    var key = e.target[0].value
    var infoToRender = globalObj[key]
    renderQuotes(infoToRender)
}

// Render function
function renderQuotes(arr){
    quoteDisplay.innerText = "";
    arr.forEach(function(quote){
        var para = document.createElement("p")
        para.textContent = quote;
        quoteDisplay.appendChild(para);
    })
}

// API call
function genericXHR (url, cb) {
    var xhr = new XMLHttpRequest(url, cb);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            var parsedObj = JSON.parse(xhr.responseText);
            globalObj = parsedObj;
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
    var searchUri = encodeURIComponent(str);
    return url + "search/" + searchUri;
}

function callback(obj) {
  // empty list
  datalist.textContent = "";
  // create array with limited length
  var array = createLimitedArray(obj);
  // convert array to html
  constructDataList(array);
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
  // construct a html option tag
  var options = "";

  arr.forEach(function(item) {
    var option = document.createElement('option');
    // set the value of the <option>
    option.value = item;
    
    
    // data list items appended to the datalist element
    datalist.appendChild(option);
  })
}

// Speech synthesis!

if(SpeechSynthesisUtterance && SpeechSynthesisUtterance){
    console.log("Speech synthesis is possible in this browser!")

    // Create and display "speech" button here. Give it an ID
    var speechBtn = document.createElement("button");
    speechBtn.id = "speechbtn";
    speechBtn.innerText = "Make me speak!";
    speech.appendChild(speechBtn);

    // Add event listener to speech button
    document.getElementById("speechbtn").addEventListener("click", randomSpeech);

    // Callback function to be put on speech button event listener:
    // Choose random item from array of quotes and read it out
    function randomSpeech(){
        // Array of things to say
        var possibleSpeechArr = Object.values(globalObj);


        if(possibleSpeechArr.length > 0){
            console.log(possibleSpeechArr);
            console.log(possibleSpeechArr[0][0])
            var msg = new SpeechSynthesisUtterance(possibleSpeechArr[0]);
            console.log("there is stuff to say")
        } else {
            var msg = new SpeechSynthesisUtterance("I have nothing to say. For once...")
            console.log("Nothing to say")
        }

        window.speechSynthesis.speak(msg);
    }

// This only runs if speech synth API not available
} else {
    console.log("No speech synthesis available in this browser. Sorry!")
}

// End of speech synthesis section