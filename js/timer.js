const clientList = document.querySelector('.client-list');

clientList.addEventListener('click', timer);

function timer(e) {
// check the card to see if it is already active
    if (e.target.classList.contains('client') && e.target.id != 'active') {

        // If the new card isn't active, see if any other cards are active
        const activeCard = document.querySelector('#active');

        // If another card is active, end the timer on it
        if(activeCard != null){
            if (activeCard != e.target && activeCard != e.target.parentNode) {
                endTimer(activeCard);
            } else if (activeCard == e.target || activeCard == e.target.parentNode) {
                // send the information to the end timer so it can keep count
                endTimer(activeCard);
                } 
            } else {
                // there is no active card so start the timer
                startTimer(e.target);
        } 





        
    } else {
        // stop whatever else was going at the time
        endTimer(e.target)
    }

}

function prettyTimeSpent(timeSpent) {

    let seconds = parseInt((timeSpent / (1000)) % 60);
    let minutes = parseInt((timeSpent / (1000 * 60)) % 60);
    let hours = parseInt((timeSpent / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    let timeString = `${hours}H:${minutes}Min${seconds}s`

    return timeString;

}

let startTime;
let endTime;

// set a start time
function startTimer(selectedCard) {
    startTime = new Date();
    // set the id to active so we can find it later
    if(selectedCard.className == 'client card'){
        selectedCard.id = 'active';
    } else {
        selectedCard.parentNode.id = 'active';
    }
}


function endTimer(selectedCard) {
    const currentCard = document.querySelector('#active');
    endTime = new Date();

    if (currentCard != null) {
        // make sure that we are clicking of the same card we turned on
        if (selectedCard.id == currentCard.id || selectedCard.id == currentCard.parentNode.id) {

            currentCard.id = '';

            // send current card information to setTimes to calculate time past
            setTimesToLocalStorage(currentCard);

            // print time to card
            setTimesOnCard(currentCard);


        } else {
            // send current card information to setTimes to calculate time past
            setTimesToLocalStorage(currentCard);

            // print time to card
            setTimesOnCard(currentCard);
            currentCard.id = '';
            currentCard.parentNode.id = ''
            console.log('Change Task');
        }
    } else {}

}

function setTimesToLocalStorage(clientToRecord) {
    // get clients array from localStorage
    let clients = JSON.parse(localStorage.getItem('clients'));

    let timeSpent = endTime - startTime;

    // loop through and compare currently selected card to index[name] to update record
    clients.forEach(function(client){

        let currentClientCard = Array.from(clientToRecord.childNodes);
        let clientToRecordText = currentClientCard[0].textContent;

        // if card name matches index[name] apply times to json
        if(client.name == clientToRecordText){
            client.recentTime = timeSpent;
            client.totalTime = client.totalTime + client.recentTime
        } else {}



    });

    // send data back local storage
    clients = localStorage.setItem('clients', JSON.stringify(clients));
}

function setTimesOnCard(clientToRecord) {
    // get clients array from localStorage
    let clients = JSON.parse(localStorage.getItem('clients'));

    // loop through and compare currently selected card to index[name] to update record
    clients.forEach(function(client){

        let time;

        let currentClientCard = Array.from(clientToRecord.childNodes);
        let clientToRecordText = currentClientCard[0].textContent;

        let prettyTime = prettyTimeSpent(client.totalTime);

        // set time element on the card for use with prettyTime
        currentClientCard.forEach(function(clientCardElement){
            console.log(clientCardElement);
            if(clientCardElement.className == 'client time-span'){
                time = clientCardElement;
            }
        });

        // if card name matches index[name] apply times to json
        if(client.name == clientToRecordText){
            time.innerHTML = prettyTime;
        } else {}



    });

    // send data back local storage
    clients = localStorage.setItem('clients', JSON.stringify(clients));

}

export { timer, prettyTimeSpent, setTimesOnCard };
