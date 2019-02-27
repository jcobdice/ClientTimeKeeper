import { prettyTimeSpent, setTimesOnCard } from './timer.js';

// UI
const clientForm = document.querySelector('.client-form');
const clientList = document.querySelector('.client-list');

allEventListeners();

// Get inputs from form
function allEventListeners() {
    // Add Client
    clientForm.addEventListener('submit', addClient);

    // Remove Client
    clientList.addEventListener('click', removeClientCard);
}


function makeClientCard(clientName) {
    // Define parts of the client listing
    const li = document.createElement('li');
    const del = document.createElement('a');
    const timeSpan = document.createElement('span');
    
    // Create clear marker
    del.href = '#'
    del.className = 'delete-client';
    del.innerHTML = '<i class = "fas fa-times"></i>'
    
    // Create client card attributes for new submissions
    li.className = 'client card'
    timeSpan.className = 'client time-span' 
    
    // Add li with text to the client-list
    li.appendChild(document.createTextNode(clientName.name));
    li.appendChild(timeSpan);
    li.appendChild(del);
    
    clientList.appendChild(li);
}

function addClient (e){

    // Create New Client object
    let newClient = {}

    // Set new client name to input value and new client time to 0
    let clientInput = document.querySelector('.new-client');
    newClient.name = clientInput.value;
    newClient.totalTime = 0;
    newClient.recentTime = 0;

    // Clients item will hold array of clients in local storage 
    let clients;

    if (localStorage.getItem('clients') === null) {
        clients = [];
    } else {
        clients = JSON.parse(localStorage.getItem('clients'));       
    }

    // Send new client to array
    clients.push(newClient);
    console.log(clients);

    clients.sort(sortClientList);

    // Send updated array to local storage
    localStorage.setItem('clients', JSON.stringify(clients));

    // Don't refresh
    e.preventDefault();

    destroyClientCards();

    buildClientList();

    // Clear the input
    console.log(clientInput);
    clientInput.value = '';
    console.log(clientInput);
    
}

function removeClientCard(e){
    if(e.target.parentElement.classList.contains('delete-client')) {

        let target = e.target.parentElement.parentElement;
        let targetCard = Array.from(target.childNodes);
        let targetCardText = targetCard[0].textContent;

        let clients = JSON.parse(localStorage.getItem('clients'));

        clients.forEach(function(client, index){
            if(clients.length > 0){
                if(client.name == targetCardText){
                    let confirmation = confirm(`You are about to delete ${client.name}. Are you sure?`);
                    if(confirmation == true){
                        clients.splice(index, 1);
                        e.target.parentElement.parentElement.remove();
                    } else {}
                } else {}
            } else {
                if(confirmation == true){
                    clients.pop();
                    e.target.parentElement.parentElement.remove();
                } else {}
            }
 
        }); 

        clients.sort(sortClientList);

        localStorage.setItem('clients', JSON.stringify(clients));


    }
} 

function destroyClientCards(){
    const cards = document.querySelectorAll('.card');
    cards.forEach(function (card){
        card.remove();
    });
}

function buildClientList() {
    const allClients = JSON.parse(localStorage.getItem('clients'));

    if (allClients != null) {
        allClients.forEach(function(client){
            makeClientCard(client);

            let prettyTime = prettyTimeSpent(client.totalTime);
        
            // get last span of type offered
            let time = document.querySelectorAll('.time-span');
            let lastTime = time[time.length-1];

            lastTime.innerHTML = prettyTime;

            allClients.sort(sortClientList);

        });
    } else {}

}

function sortClientList(a,b){
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}

buildClientList();

export { allEventListeners, buildClientList };

