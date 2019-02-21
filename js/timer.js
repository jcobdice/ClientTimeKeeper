const clientList = document.querySelector('.client-list');

clientList.addEventListener('click', timer);

function timer(e) {

    if (e.target.classList == 'client card' && e.target.id != 'active') {
        startTimer();
        endTimer(e.target);
        e.target.id = 'active';
        console.log(e.target.innerText);
    } else {
        endTimer(e.target)
    }
    
}

function prettyTimeSpent(timeSpent) {
    let minutes = parseInt((timeSpent / (1000 * 60)) % 60)
    let hours = parseInt((timeSpent / (1000 * 60 * 60)) % 24)
  
    hours = (hours < 1) ? "0" + hours : hours;
    minutes = (minutes < 5) ? "0" + minutes : minutes;
  
  }

let startTime;
let endTime;

function startTimer() {
    startTime = new Date();
}

function endTimer(selectedCard) {
    const currentCard = document.querySelector('#active');
    let endTime = new Date();

    let timeSpent = endTime - startTime; 

    if (currentCard != null) {
        if (selectedCard.id == currentCard.id) {
            selectedCard.id = '';

            setTimes(currentCard)

            prettyTimeSpent(timeSpent);

        } else {
            setTimes(currentCard);
            currentCard.id = '';
            console.log('Change Task');
        } 
    } else {}

    function setTimes(clientToRecord) {
        let clients = JSON.parse(localStorage.getItem('clients'));

        clients.forEach(function(client){
            if(client.name == clientToRecord.innerText){
                client.recentTime = timeSpent;
                client.totalTime = client.totalTime + client.recentTime
                console.log(client); 
            } else {}
        }); 

        clients = localStorage.setItem('clients', JSON.stringify(clients));
    }

}

export { timer }