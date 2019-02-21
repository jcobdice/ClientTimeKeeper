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
    
    // Create clear marker
    del.href = '#'
    del.className = 'delete-client';
    del.innerHTML = '<i class = "fas fa-times"></i>'
    

    // Create client card attributes for new submissions
    li.className = 'client card'
    
    // Add li with text to the client-list
    li.appendChild(document.createTextNode(clientName.name));
    li.appendChild(del);
    
    clientList.appendChild(li);
}

function addClient (e){

    // Create New Client object
    const newClient = {}

    // Set new client name to input value and new client time to 0
    newClient.name = document.querySelector('.new-client').value;
    newClient.time = 0;

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

    // Send updated array to local storage
    localStorage.setItem('clients', JSON.stringify(clients));

    // Don't refresh
    e.preventDefault();

    makeClientCard(newClient);

    // Clear the input
    newClient = '';

    // Don't refresh
    e.preventDefault();

}

function removeClientCard(e){
    if(e.target.parentElement.classList.contains('delete-client')) {
        e.target.parentElement.parentElement.remove();
    }
} 

function buildClientList() {
    const allClients = JSON.parse(localStorage.getItem('clients'));

    allClients.forEach(function(client){
        makeClientCard(client);
    });
}

buildClientList();

export { allEventListeners, buildClientList };