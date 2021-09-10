//Create Product object
class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
    }
    getFormatedPrice(product) {
        let formatedPrice = this.price / 100;
        return formatedPrice;
    }
}

// Create and display a card for each product
function createCardProduct(product) {
    let newCard = document.createElement(`a`);
    newCard.setAttribute('href', `./pages/product.html#${product._id}`)
    newCard.innerHTML = `
<article><img class='card-img-top' src='${product.imageUrl}'>
<div class='card-body text-center px-0 pb-0'>
<h3 class='card-title'>${product.name}</h3>
<p class='card-text'>${product.getFormatedPrice()} €</p>
<button class='btn card-footer'>Rencontrer ${product.name}</button>
</div></article>
`;
    document.querySelector('main').appendChild(newCard);
}

fetch("http://localhost:3000/api/teddies/")
    .then(dataListProducts => dataListProducts.json())
    .then(jsonListProducts => {
        localStorage.clear();
        for (let jsonProduct of jsonListProducts) {
            let product = new Product(jsonProduct);
            createCardProduct(product);
        }
    });