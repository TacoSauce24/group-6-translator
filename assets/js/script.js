var inputTextEl = document.getElementById('inputText');
var languageSelectEl = document.getElementById('languageSelect');
var translateButtonEL = document.getElementById('translateButton');
var translatedTextEl = document.getElementById('translatedText');
var modalContentEl = document.querySelector('.modal-content');
var modalEl = document.querySelector('.modal');
var modalCloseButtonEl = document.querySelector('.modal-close');


function getApi(event) {
    event.preventDefault();
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

function closeModal() {
    modalEl.classList.remove('is-active');
}

modalCloseButtonEl.addEventListener('click', closeModal);

translateButtonEL.addEventListener('click', getApi);

