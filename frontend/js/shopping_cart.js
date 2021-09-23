let serverData;

//check if cart is empty
function checkEmptyCart() {
    if (localStorage.length === 0 || localStorage.getItem('cart') === '[]') {

        document.querySelector('main').innerHTML = `<section><h1>Votre panier est vide</h1>
                                                <p id="empty-cart">Pour ajouter des Orinours à votre panier, allez leur rendre visite et clickez sur le bouton "Je veux l'adopter"</p>
                                                <a class="btn" href="../index.html#product-list">Retourner à la liste</a></section>`;
        return true;
    };
}

//function to calculate total (call onload and on quantity changes)
function totalPriceCalculate() {
    let total = 0;
    JSON.parse(localStorage.getItem('cart')).forEach(elem => {
        total += serverData.find(element => element._id == elem.id).price * elem.quantity;
    })
    document.querySelector('#total').innerHTML = "Total : " + total / 100 + " €"
}

//on change quantity : change quantity and totals in cart and localStorage
function changeQuantity(productId, productChoosenOptions, newQuantity) {

    const regex = new RegExp(`"id":"${productId}","options":${JSON.stringify(productChoosenOptions)},"quantity":[0-9]+`);
    let newCart = localStorage.getItem('cart').replace(regex, `"id":"${productId}","options":${JSON.stringify(productChoosenOptions)},"quantity":${newQuantity}`);
    localStorage.setItem('cart', newCart);
    totalPriceCalculate();
}

//on delete, delete product in html and localstorage
function deleteProduct(productId, productChoosenOptions, domSelector) {
    let newCart = JSON.parse(localStorage.getItem('cart'));
    let indexInCart;
    newCart.forEach(productInCart => {
        if (productInCart.id === productId && JSON.stringify(productInCart.options) === JSON.stringify(productChoosenOptions)) {
            indexInCart = newCart.indexOf(productInCart);
        }
    });
    newCart.splice(indexInCart, 1);
    localStorage.setItem('cart', JSON.stringify(newCart));
    document.getElementById(domSelector).remove();
    if (checkEmptyCart() != true) { totalPriceCalculate(); }
}

//foreach product in the localStorage, build a card
function appendProductCardCart(apiSData, options, quantity) {
    let productCardCart = document.createElement('article');
    let domSelector = apiSData._id;
    let optionHTML = '';
    for (const [key, value] of Object.entries(options)) {
        optionHTML += `<p><span>${key} : </span>${value}</p>`
        domSelector += value.replace(' ', '');
    };
    productCardCart.setAttribute('id', domSelector);
    productCardCart.innerHTML = `
                                    <img src="${apiSData.imageUrl}" alt="photo de l'orinours ${apiSData.name}">
                                    <div class="cart-card-body">
                                        <h3>${apiSData.name}</h3>
                                        <div class="product-options">${optionHTML}</div>
                                        <p class="product-description">${apiSData.description}</p>
                                        <span class="product-price">${quantity * apiSData.price / 100} €</span>    
                                    </div>
                                    <select name="quantity" class="product-quantity form-control" aria-label= “quantité”>
                                        <option value=1>1</option>
                                        <option value=2>2</option>
                                        <option value=3>3</option>
                                        <option value=4>4</option>
                                        <option value=5>5</option>
                                        <option value=6>6</option>
                                        <option value=7>7</option>
                                        <option value=8>8</option>
                                        <option value=9>9</option>
                                        <option value=10>10</option>
                                    </select>
                                    <button class="material-icons delete">
                                    delete_forever
                                    </button>`;
    productCardCart.querySelector('.product-quantity').value = quantity;
    document.querySelector('#product-table').appendChild(productCardCart);

    //on change quantity
    productCardCart.querySelector('.product-quantity').addEventListener('change', () => {
        changeQuantity(apiSData._id, options, productCardCart.querySelector('.product-quantity').value);
        productCardCart.querySelector('.product-price').innerHTML = productCardCart.querySelector('.product-quantity').value * apiSData.price / 100 + " €";
    });
    //on delete
    productCardCart.querySelector('.delete').addEventListener('click', () => {
        deleteProduct(apiSData._id, options, domSelector);
    });
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