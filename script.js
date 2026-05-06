
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace it with 'Unkown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // Check quote length to determine the styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set Quote and Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quote from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const respone = await fetch(apiUrl);
        apiQuotes = await respone.json();
        newQuote();
    } catch (error) {
        // Catch error and set quote to local quotes
        console.log(error);
        apiQuotes = localQuotes;
        newQuote();
    }
}

// Tweet Quote, but as Twitter sucks, Bluesky Quote
function tweetQuote() {
    // const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    const twitterURL = `https://bsky.app/intent/compose?text=${quoteText.textContent} - ${authorText.textContent}`;
    
    window.open(twitterURL, '_blank');
}

// Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);



// On Load
getQuotes();