const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

 function showLoadingSpinner(){
     loader.hidden = false;
  quoteContainer.hidden = true;
}


 function removeLoadingSpinner(){
     quoteContainer.hidden = false;
     loader.hidden = true;
 }



//Show New Quote
function newQuote(){
    showLoadingSpinner();
   //pick a random quote from apiQuotes array
   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

   //Check if Author field is blank and replace it with "unknown"
   if (!quote.author){
       authorText.textContent = 'Unknown';
   }else{
        authorText.textContent = quote.author;
   }

   //Check Quote length to determin styling 120 is the characters
if(quote.text.length > 120){
    quoteText.classList.add('long-quote');
}else{
    quoteText.classList.remove('long-quote');
}

//Set Quote, Hide Loader
   quoteText.textContent = quote.text;
    removeLoadingSpinner();
}



//  Get quotes from API
async function getQuotes(){
    showLoadingSpinner();
    const apiUrl= 'https://type.fit/api/quotes';
    try{
        const response = await fetch (apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch (error){
        // Catch Error Here
    }
}


//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');  //open a new twitter window to open in new tab
}


function FacebookQuote(){
    const FacebookUrl = `http://www.facebook.com/sharer/sharer.php?s=100&p[url]=" + encodeURI(fburl) + "&p[images][0]=" + encodeURI(fbimgurl) + "&p[title]=" + encodeURI(fbtitle) + "&p[summary]=" + encodeURI(fbsummary)=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(FacebookUrl, '_blank');  //open a new twitter window to open in new tab
}


//Event Listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
facebookBtn.addEventListener('click', FacebookQuote);


//On Load 
getQuotes();
