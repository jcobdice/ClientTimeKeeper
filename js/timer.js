const clientList = document.querySelector('.client-list');

clientList.addEventListener('click', timer);

function timer(e) {
// check the card to see if it is already active
    if (e.target.classList == 'client card' && e.target.id != 'active') {
        // if it isn't start the timer
        startTimer();

        // send the information to the end timer so it can keep count
        endTimer(e.target);
        // set the id to active so we can find it later
        e.target.id = 'active';
    } else {
        // stop whatever else was going at the time 
        endTimer(e.target)
    }
    
}

function prettyTimeSpent(timeSpent) {

    let minutes = parseInt((timeSpent / (1000 * 60)) % 60)
    let hours = parseInt((timeSpent / (1000 * 60 * 60)) % 24)
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    let timeString = `${hours} hours and ${minutes} minutes`

    return timeString;

  }

let startTime;

// set a start time
function startTimer() {
    startTime = new Date();
}


function endTimer(selectedCard) {
    const currentCard = document.querySelector('#active');
    let endTime = new Date();

    let timeSpent = endTime - startTime; 

    if (currentCard != null) {
        // make sure that we are clicking of the same card we turned on
        if (selectedCard.id == currentCard.id) {
            selectedCard.id = '';

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
            console.log('Change Task');
        } 
    } else {}

    function setTimesToLocalStorage(clientToRecord) {
        // get clients array from localStorage
        let clients = JSON.parse(localStorage.getItem('clients'));

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
                if(clientCardElement.className == 'time-span'){
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

}

export { timer }