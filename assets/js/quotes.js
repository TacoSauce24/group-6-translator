const quoteContainer = document.getElementById("quote-container");
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const endModal = document.getElementById('back-click')
const headers = {
    "X-RapidAPI-Key": "3307ce781emsh34ee5d3922618b3p108289jsn5b8f1ff3c6b4"
  };

  fetch("https://famous-quotes4.p.rapidapi.com/random?category=funny&count=1", {
    headers: headers
  })
    .then(response => response.json())
    .then(data => {
      const quote = data[0].text;
      const author = data[0].author;
      
      quoteElement.textContent = quote;
      authorElement.textContent = `- ${author}`;
      
      quoteContainer.style.display = "block"; 
    })
    .catch(error => {
      console.error(error);
    });


    function closeQuote() {
      quoteContainer.style.display = 'none';
      quoteElement.style.display = 'none'
      quoteElement.style.display = 'none'
  }

  endModal.addEventListener('click', closeQuote);