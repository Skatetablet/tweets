//Variables
const form = document.querySelector("#formulario");
const listTweets = document.querySelector("#lista-tweets");
let tweets = [];

//Event Listener
eventListeners();

function eventListeners() {
    //User adds a new tweet
    form.addEventListener("submit", addTweet);

    //Document is ready
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];
        
        createHTML();
    });
}

//Functions
function addTweet(e) {
    e.preventDefault();

    //User writes
    const tweet = document.querySelector("#tweet").value;


    //Validate 
    if (tweet === "") {
       showError("A message cannot be empty");
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }
    //Add to tweets array
    tweets = [...tweets, tweetObj];
    
    
    //Create HTML
    createHTML();

    //Restart form
    form.reset();
}

function showError(error) {
    const errorMessage = document.createElement("p");

    errorMessage.textContent = error;
    errorMessage.classList.add("error");
    
    //Add to site
    const container = document.querySelector("#contenido");
    container.appendChild(errorMessage);

    //Deletes alert after 3s
    setTimeout(() => {
        errorMessage.remove();
    }, 3000)
}

//Shows tweet list
function createHTML() {
    cleanHTML();
    if(tweets.length > 0) {
        tweets.forEach(tweet => {

            const btnDelete = document.createElement("a");
            btnDelete.classList.add("borrar-tweet");
            btnDelete.textContent = "X";
            //Delete function
            btnDelete.onclick = () => {
                deleteTweet(tweet.id);
            }

            const li = document.createElement("li");
            li.textContent = tweet.tweet;
            li.appendChild(btnDelete)
            listTweets.appendChild(li);
        })
    }

    syncStorage();
}
//Adds tweets to localStorage
function syncStorage() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

//Deletes tweet
function deleteTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    console.log(tweets);
    createHTML();
}

//Clean HTML
function cleanHTML() {
    while (listTweets.firstChild) {
        listTweets.removeChild(listTweets.firstChild);
    }
}