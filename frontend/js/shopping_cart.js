let serverData;

class ProductCart {
    constructor(jsonProduct, jsonLocalStorage) {
        jsonProduct && Object.assign(this, jsonProduct);
        jsonLocalStorage && Object.assign(this, jsonLocalStorage);
    }
}

function checkEmptyCart() {
    if (localStorage.length == 0) {
        document.querySelector('main').innerHTML = `<section><h1>Votre panier est vide</h1>
                                                <p>Pour ajouter des Orinours à votre panier, allez leur rendre visite et clickez sur le bouton "Je veux l'adopter"</p>
                                                <a class="btn" href="../index.html">Retourner à la liste</a></section>`;
    };
}

function appendProductCardCart(data, localId) {
    let productCardCart = document.createElement('article');
    productCardCart.setAttribute('id', localId);
    let optionHTML = '';
    for (const [key, value] of Object.entries(data.options)) {
        optionHTML += `<p><span>${key} : </span>${value}</p>`;
    };
    productCardCart.innerHTML = `
                                    <img src="${data.imageUrl}" alt="photo de l'orinours ${data.name}">
                                    <div class="cart-card-body">
                                        <h4>${data.name}</h4>
                                        <div class="product-options">${optionHTML}</div>
                                        <p class="product-description">${data.description}</p>
                                        <span class="product-price">${data.quantity * data.price / 100} €</span>    
                                    </div>
                                    <p class="product-quantity">
                                        <span class="material-icons less" onclick="changeQuantity(-1,'${localId}')">remove_circle_outline</span>
                                        <span>${data.quantity}</span>
                                        <span class="material-icons more" onclick="changeQuantity(1,'${localId}')">add_circle_outline</span>
                                    </p>
                                    <span class="delete-product material-icons" onclick="changeQuantity(0,'${localId}')">
                                    delete_forever
                                    </span>
`;
    document.getElementById('product-table').appendChild(productCardCart);


}

//function to calculate total (call onload and on quantity changes)
function totalPriceCalculate() {
    let total = 0;
    for (let product of Object.entries(localStorage)) {
        total += serverData.find(element => element._id == JSON.parse(product[1]).id).price * JSON.parse(product[1]).quantity;
    }
    document.getElementById('total').innerHTML = "Total : " + total / 100 + " €"
}

function sendOrder() {
    let contact = {};
    document.querySelectorAll('input').forEach(input => {
        Object.defineProperty(contact, input.id, {
            value: input.value,
            enumerable: true
        });
    });
    let boughtProducts = [];
    for (const elem of Object.entries(localStorage)) {
        for (let i = 0; i < JSON.parse(elem[1]).quantity; i++) {
            boughtProducts.push(JSON.parse(elem[1]).id);
        }
    }

    let data = { contact: contact, products: boughtProducts };
    fetch(`http://localhost:3000/api/${this.category[0]}/order`, {
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
        //then get the array of the products
        .then(function (dataSent) {
            document.location.href="./ordered.html#" + dataSent.orderId+"&"+total.innerHTML;
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
fetch(`http://localhost:3000/api/${this.category[0]}/`)
    .then(dataListProducts => dataListProducts.json())
    .then(jsonListProducts => {
        serverData = jsonListProducts;
        for (const elem of Object.entries(localStorage)) {
            let productAdded = new ProductCart(serverData.find(element => element._id == JSON.parse(elem[1]).id), JSON.parse(elem[1]));
            appendProductCardCart(productAdded, elem[0]);
        }
        totalPriceCalculate();

        document.getElementsByTagName('form')[0].addEventListener('submit', function (event) {
            event.preventDefault();
            sendOrder();
        })
    });


//on click on - or + or trash change quantity and totals
function changeQuantity(newQuantity, id) {

    let localProduct = JSON.parse(localStorage.getItem(id));
    if (localProduct.quantity + newQuantity == 0 || newQuantity == 0) {
        localStorage.removeItem(id);
        document.getElementById(id).remove();
    } else {
        localProduct.quantity += newQuantity;
        localStorage.setItem(id, JSON.stringify(localProduct));
        let card = document.getElementById(id);
        card.querySelector('.product-quantity > span:nth-child(2)').innerHTML = localProduct.quantity;
        card.querySelector('.product-price').innerHTML = localProduct.quantity * serverData.find(element => element._id == localProduct.id).price / 100 + " €";
    }
    totalPriceCalculate();
    checkEmptyCart();
}