let serverData;

//check if cart is empty
function checkEmptyCart() {
    if (localStorage.length === 0 || localStorage.getItem('cart') === '[]') {

        document.querySelector('main').innerHTML = `<section><h1>Votre panier est vide</h1>
                                                <p id="empty-cart">Pour ajouter des Orinours à votre panier, allez leur rendre visite et clickez sur le bouton "Je veux l'adopter"</p>
                                                <a class="btn" href="/index.html#product-list">Retourner à la liste</a></section>`;
        return true;
    };
}

//foreach product in the localStorage, build a card
function appendProductCardCart(database, options, quantity) {
    let productCardCart = document.createElement('article');
    let domSelector = database._id;
    let optionHTML = '';
    for (const [key, value] of Object.entries(options)) {
        optionHTML += `<p><span>${key} : </span>${value}</p>`
        domSelector += value.replace(' ', '');
    };
    productCardCart.setAttribute('id', domSelector);
    productCardCart.innerHTML = `
                                    <img src="${database.imageUrl}" alt="photo de l'orinours ${database.name}">
                                    <div class="cart-card-body">
                                        <h3>${database.name}</h3>
                                        <div class="product-options">${optionHTML}</div>
                                        <p class="product-description">${database.description}</p>
                                        <span class="product-price">${quantity * database.price / 100} €</span>    
                                    </div>
                                    <p class="product-quantity">
                                        <span class="material-icons change-quantity less">remove_circle_outline</span>
                                        <span>${quantity}</span>
                                        <span class="material-icons change-quantity more">add_circle_outline</span>
                                    </p>
                                    <span class="material-icons change-quantity delete">
                                    delete_forever
                                    </span>`;

    document.querySelector('#product-table').appendChild(productCardCart);

    //add a listener to add or remove this product
    productCardCart.querySelectorAll('.change-quantity')
        .forEach(element => {
            element.addEventListener('click', function (event) {
                switch (element.classList[2]) {
                    case 'less':
                        changeQuantity(-1, database._id, options, domSelector);
                        break;
                    case 'more':
                        changeQuantity(1, database._id, options, domSelector);
                        break;
                    case 'delete':
                        changeQuantity(0, database._id, options, domSelector);
                        break;
                }
            })
        });

}

//function to calculate total (call onload and on quantity changes)
function totalPriceCalculate() {
    let total = 0;
    JSON.parse(localStorage.getItem('cart')).forEach(elem => {
        total += serverData.find(element => element._id == elem.id).price * elem.quantity;
    })
    document.querySelector('#total').innerHTML = "Total : " + total / 100 + " €"
}

//sendOrder with formated data
function sendOrder() {
    let contact = {};
    document.querySelectorAll('input').forEach(input => {
        Object.defineProperty(contact, input.id, {
            value: input.value,
            enumerable: true
        });
    });
    let boughtProducts = [];
    JSON.parse(localStorage.getItem('cart')).forEach(element => {
        for (let i = 0; i < element.quantity; i++) {
            boughtProducts.push(element.id)
        }
    })



    let data = { contact: contact, products: boughtProducts };
    fetch(`http://localhost:3000/api/${configData.category}/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function (dataSent) {
            if (dataSent.ok) {
                return dataSent.json();
            }
        })
        //then change url with orderId and total price
        .then(function (dataSent) {
            document.location.href = "./ordered.html#" + dataSent.orderId + "&" + total.innerHTML;
        })
        .catch(function (err) {
            console.error(err);
        })
}




// On Load 
// check empty cart
// get server data
// add cards
// calculate total price
// add event order button
checkEmptyCart();
fetch(`http://localhost:3000/api/${configData.category}/`)
    .then(dataListProducts => dataListProducts.json())
    .then(jsonListProducts => {
        serverData = jsonListProducts;
        if (checkEmptyCart() != true) {
            JSON.parse(localStorage.getItem('cart')).forEach(elem => {

                appendProductCardCart(serverData.find(element => element._id == elem.id), elem.options, elem.quantity);
            });
            totalPriceCalculate();
            if (document.querySelector('main').getAttribute('id') == 'shopping-cart') {

                document.getElementsByTagName('form')[0].addEventListener('submit', function (event) {
                    event.preventDefault();
                    sendOrder();
                })
            }
            ;
        }
        fillHtml('shopping_cartPage');
    });

//on click on - or + or trash change quantity and totals
function changeQuantity(newQuantity, id, options, domSelector) {

    let cart = JSON.parse(localStorage.getItem('cart'))
    let cartQuantity;
    let cartIndex;
    cart.forEach(element => {
        if (element.id === id && JSON.stringify(options) === JSON.stringify(element.options)) {
            cartIndex = cart.indexOf(element);
            cartQuantity = element.quantity;
        }
    })
    if (cartQuantity + newQuantity == 0 || newQuantity == 0) {
        cart = cart.splice(cartIndex + 1, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById(domSelector).remove();
    } else {
        cart[cartIndex].quantity += newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        let card = document.getElementById(domSelector);
        card.querySelector('.product-quantity > span:nth-child(2)').innerHTML = cart[cartIndex].quantity;
        card.querySelector('.product-price').innerHTML = cart[cartIndex].quantity * serverData.find(element => element._id == id).price / 100 + " €";

    }
    checkEmptyCart()
    if (checkEmptyCart() != true) { totalPriceCalculate(); };

}
