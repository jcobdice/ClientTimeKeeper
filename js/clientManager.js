// Get input from form on submit
document.querySelector('.client-form').addEventListener('submit', addNewClient);

function makeClientCard(clientName) {
    // Define parts of the client listing
    const clientCard = document.querySelector('.client-list');
    const li = document.createElement('li');
    
    // Create client card attributes for new submissions
    li.className = 'client card'
    
    // Add li with text to the client-list
    li.appendChild(document.createTextNode(clientName));
    clientCard.appendChild(li);
}

function addNewClient (e){

    // Read input value
    const newClient = document.querySelector('.new-client').value;

    // Clients item will hold array of clients in local storage 
    let clients;

    if (localStorage.getItem('clients') === null) {
        clients = [];
    } else {
        clients = JSON.parse(localStorage.getItem('clients'));       
    }

    // Send new client to array
    clients.push(newClient);

    // Send updated array to local storage
    localStorage.setItem('clients', JSON.stringify(clients));

    // Don't refresh
    //e.preventDefault();

    makeClientCard(newClient);

    // Clear the input
    newClient.value = '';

    // Don't refresh
    e.preventDefault();

    clientList();

}

function clientList() {
    const allClients = JSON.parse(localStorage.getItem('clients'));

    allClients.forEach(function(client){
        makeClientCard(client);
    });
}

export { makeClientCard, addNewClient, clientList };