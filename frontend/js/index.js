//Create Product object
class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
        this.price = this.price / 100
    }
}

// Create and display a card for each product
function createCardProduct(product) {
    let newCard = document.createElement(`a`);
    newCard.setAttribute('href', `./pages/product.html?${product._id}`)
    newCard.innerHTML = `
<article><img class='card-img-top' src='${product.imageUrl}'>
<div class='card-body text-center px-0 pb-0'>
<h3 class='card-title'>${product.name}</h3>
<p class='card-text'>${product.price} €</p>
<div class='card-footer'>En savoir plus</div>
</div></article>
`;
    document.querySelector('main').appendChild(newCard);
}



/*  fetch('../config.json').then(configJson => configJson.json()).then(dataConfigJson => console.log(dataConfigJson));*/
let data=require('../config.json');
console.log(data);

fetch(`http://localhost:3000/api/${category[0]}/`)
    .then(dataListProducts => dataListProducts.json())
    .then(jsonListProducts => {
        if (document.querySelector('#index') != null) {
            for (let jsonProduct of jsonListProducts) {
                let product = new Product(jsonProduct);
                createCardProduct(product);
            }

            ////////////////////
            localStorage.clear();
        }
    });