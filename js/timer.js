const clientList = document.querySelector('.client-list');

clientList.addEventListener('click', timer);

function timer(e) {

    if (e.target.classList == 'client card' && e.target.id != 'active') {
        console.log(new Date());
        endTimer(e.target);
        e.target.id = 'active';
        console.log(e.target.innerText);
    } else {
        endTimer(e.target)
    }
    
}

function endTimer(selectedCard) {
    const currentCard = document.querySelector('#active');
    if (currentCard != null) {
        if (selectedCard.id == currentCard.id) {
            selectedCard.id = '';
            console.log(new Date());  
        } else {
            currentCard.id = '';
            console.log('Change Task');
            console.log(new Date());
        } 
    } else {}

}

export { timer }