const userInputId = "user_input_text";
const submitButtonId = "user_input_submit_button";
const quotesListId = "output_list";
const ApiUrl = "https://dummyjson.com/quotes";

let errorOutputIfExists = null;
let jsonResponse = null;
let quotesArr = null;
let userInputText = null;
// We'll assign quotes' values here if the user input after filteration isn't empty.
let seconderyQuotesArray = null;

const _submitButton = document.getElementById(submitButtonId);
const _userInput = document.getElementById(userInputId);
const _quotesList = document.getElementById(quotesListId);


// Create a promise function using async and wait keyword.
async function getJsonFromApi(providedApi){

    try{
        
        const response = await fetch(providedApi);

        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        // Await the json response to be fetce
        jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse.quotes;

    }catch (error){

        console.log("Big problem has happened !!!", error.message);
        errorOutputIfExists = error.message;
        return null;

    }

}

async function initializeQuotes() {
    quotesArr = await getJsonFromApi(ApiUrl);
}

function isNullOrEmpty(str){
    return str === null || str === '';
}


initializeQuotes();


function displayQuotes(quotes, userInput){
    if(isNullOrEmpty(userInput)){
        _quotesList.innerHTML = quotes.map((quote) => `
            <li class="quote_item">
                ${quote.quote}
            </li>
        `).join('');
    }else{
        seconderyQuotesArray = quotes.filter(quote => 
            quote.quote.toLowerCase().includes(userInput.toLowerCase())
        );

        _quotesList.innerHTML = seconderyQuotesArray.map((quote) => `
            <li class="quote_item">
                ${quote.quote}
            </li>
        `).join('');

    }
}


function displayQuotesError(){
    _quotesList.innerHTML = `<li class="quote_item">
    ${errorOutputIfExists}, check your internet connection, and make sure the API is correct !
    </li>`
}


_submitButton.addEventListener('click', async () => {
    if(quotesArr != null){
        userInputText = _userInput.value;
        displayQuotes(quotesArr, userInputText);
    }else{
        displayQuotesError();
    }
});



