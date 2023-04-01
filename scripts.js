const genreList = document.querySelector('.categories-list');
const songList = document.querySelectorAll('.product-list');
const songdisc = document.querySelectorAll('.card ');
const modal = document.querySelector('.modal_conteiner');
const modalDiv = document.querySelector('.modal');
const closeButton = document.querySelector('.close');
const form = document.getElementById('form');
const formName = document.getElementById('name');
const formPhone = document.getElementById('number');
const formEmail = document.getElementById('email');
const requiredFields = form.querySelectorAll('.required');
const ordersUl = document.querySelector('.orders');
const buttonOrder = document.querySelector('.button-order');

for (let item of document.querySelectorAll('.buy ')) {
    item.addEventListener('click', () => {
        closeMenu(songList);
        closeMenu(songdisc);
        createClone(item);
        modal.classList.remove('display-none');
    });

} 

function closeMenu (array) {
    for (let i = 0; i < array.length; i++) {
        if (!array[i].classList.contains('display-none')) {
            array[i].classList.add('display-none');
        } 
    }
}

function createClone (itemElement) {
    let clone = itemElement.parentElement.cloneNode(true);
    clone.querySelector('.buy').remove();
    modalDiv.prepend(clone);
}

function addOrderToUl (text, i) {
    const li = `
        <li data-index="${i}">${text}<span></span></li>
    `;
    ordersUl.innerHTML = ordersUl.innerHTML + li;
}

function deleteOrder(parent) {
    const allOrders = JSON.parse(window.localStorage.getItem('orders'));
    allOrders.splice(parent.getAttribute('data-index'), 1);
    window.localStorage.setItem('orders', JSON.stringify(allOrders));

    parent.remove();
}

function printError(el, errorMessage) {
    form.elements[el].nextElementSibling.textContent = errorMessage;
}

if (window.localStorage.getItem('orders')) {
    const allOrders = JSON.parse(window.localStorage.getItem('orders'));

    for (let i = 0; i < allOrders.length; i++) {
        addOrderToUl (allOrders[i].name, i)
    }

} else {
    window.localStorage.setItem('orders', JSON.stringify([]));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let formValid = true;
    let allOrder = JSON.parse(window.localStorage.getItem('orders'));

    requiredFields.forEach((field) => {
        if(field.value === '') {
            printError(field.id, 'The field is empty');
            formValid = false;
        };

        if (field.getAttribute('type') === 'email' && !field.value.includes('@')) {
            printError(field.id, 'The field is empty');
            formValid = false;
        } else if (field.getAttribute('name') === 'email' && !field.value.includes('@')) {
            printError(field.id, 'Incorrect value');
            formValid = false;
        }
    });

    if (formValid) {
        modal.classList.add('display-none');
    }

    addOrderToUl(modalDiv.querySelector('h4').textContent, modalDiv.querySelector('p').textContent);

    const order = {
        name: modalDiv.querySelector('h4').textContent,
        price: modalDiv.querySelector('p').textContent
    };
    
    allOrder.push(order);
    window.localStorage.setItem('orders', JSON.stringify(allOrder));
    modalDiv.firstChild.remove();
});

formName.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        printError('name', '');
    } 
});

formPhone.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        printError('number', '');
    } 
});

formEmail.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        printError('email', '');
    } 
});

ordersUl.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN') {
        const parent = e.target.parentElement;
        deleteOrder(parent);
    }
});

buttonOrder.addEventListener('click', () => {
    ordersUl.classList.toggle('display-none');
})

genreList.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.value.includes('item-link')) {
        closeMenu(songList);
        event.target.nextElementSibling.classList.remove('display-none');
    } else if (target.classList.value.includes('item-discription')) {
        closeMenu(songdisc);
        event.target.nextElementSibling.classList.remove('display-none');
    }
});

closeButton.addEventListener('click', () => {
    modal.classList.add('display-none');
})

