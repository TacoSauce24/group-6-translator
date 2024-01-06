var inputTextEl = document.getElementById('inputText');
var languageSelectEl = document.getElementById('languageSelect');
var translateButtonEL = document.getElementById('translateButton');
var translatedTextEl = document.getElementById('translatedText');
var modalContentEl = document.querySelector('.modal-content');
var modalEl = document.querySelector('.modal');
var modalCloseButtonEl = document.querySelector('.modal-close');
var historyButtonSectionEl = document.querySelector('.hist-btn-div');


function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://text-translator2.p.rapidapi.com/translate';
    var options = {
        method: 'POST',
        headers: {
        	'content-type': 'application/x-www-form-urlencoded',
        	'X-RapidAPI-Key': 'd9853ed2b9mshdeeeffe50c28b43p16c3eajsnf6b4d4a7d487',
        	'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: 'auto',
            target_language: languageSelectEl.value,
            text: inputTextEl.value
        })
    }
    if(!inputTextEl.value) {
        modalEl.classList.add('is-active');
        modalContentEl.textContent = "Please input text you want to translate.";
    }
    else if(!languageSelectEl.value) {
        modalEl.classList.add('is-active');
        modalContentEl.textContent = "Please select a language to translate into.";
    } else {
        fetch(requestUrl, options)
        .then(function (response) {
            if(response.ok) {
                return response.json();
            } else {
                modalEl.classList.add('is-active');
                modalContentEl.textContent = "Error fetching translation.";
            }
        })
        .then(function (data) {
            console.log(data);
            if(!data) {
                modalEl.classList.add('is-active');
                modalContentEl.textContent = "Translation not found";
            } else {
                translatedTextEl.textContent = data.data.translatedText;
            }
        }) .catch(function(error){
            console.log(error);
            modalEl.classList.add('is-active');
            modalContentEl.textContent = error.message;
        }) 
    }  
}

function readItemsFromStorage() {
    var items = localStorage.getItem('items');
    if (items) {
      items = JSON.parse(items);
    } else {
      items = [];
    }
    return items;
  }

  //this function makes the items that are set to local storage strings so that they can be read by local storage
function saveItemsToStorage(items) {
    console.log(items);
    localStorage.setItem('items', JSON.stringify(items));
}

  //this function handles saving each task to the local storage as an array of objects
function handleSaveItem() {
    var value = inputTextEl.value.trim();
    var items = readItemsFromStorage();
    if(!languageSelectEl.value) {
        modalEl.classList.add('is-active');
        modalContentEl.textContent = "Please select a language to translate into.";
    } else if(!inputTextEl.value) {
        modalEl.classList.add('is-active');
        modalContentEl.textContent = "Please input text you want to translate.";
        translatedTextEl.textContent = '';
        languageSelectEl.value = '';
    } else {
        items.push(value);
        saveItemsToStorage(items);
        getItemsFromStorage();
    }
}

function handleTranslateClick() {
    getApi();
    handleSaveItem();
    getItemsFromStorage();
}

  //this funtion is used to get the items from and then paste them to the page when the app is reopened
function getItemsFromStorage() {
    historyButtonSectionEl.replaceChildren();
    var items = readItemsFromStorage();
    for (var i =0; i < items.length; i++) {
        if(items.length > 10) {
            items.shift();
            saveItemsToStorage(items);
        } else {
            var historyButtonEl = document.createElement('button');
            historyButtonEl.textContent = items[i];
            historyButtonSectionEl.appendChild(historyButtonEl);
            historyButtonEl.addEventListener('click', function() {
            inputTextEl.value = this.textContent;
            translatedTextEl.textContent = '';
        });
        }
    }
}

function closeModal() {
    modalEl.classList.remove('is-active');
}

modalCloseButtonEl.addEventListener('click', closeModal);

translateButtonEL.addEventListener('click', handleTranslateClick);

getItemsFromStorage();