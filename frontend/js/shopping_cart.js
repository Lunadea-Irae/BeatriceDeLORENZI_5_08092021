class ProductCart {
    constructor(jsonProduct, options, count) {
        jsonProduct && Object.assign(this, jsonProduct);
        this.option = options;
        this.count = count;
    }
}

function appendProductCardCart(data, localId) {
    let productCardCart = document.createElement('article');
    productCardCart.setAttribute('id', localId);
    for (let key of data) {
        if (key.includes('image')) {
            productCardCart.innerHTML += `<img src='${key.value}' alt='photo de l'orinours ${data.name}'>`;
        } else if (Array.isArray(key)) {
            let options;
            key.forEach(option => {
                options += `<p><strong>${option.key}</strong> : ${option.value}</p>`;
            });
            productCardCart.innerHTML += `<div class="options">${options}</div>`
        } else {
            productCardCart.innerHTML += `<p class="${key}">${key.value}</p>`;

        }
    }
    document.getElementById('orinours').appendChild(productCardCart);
}

fetch("http://localhost:3000/api/teddies/")
    .then(dataListProducts => dataListProducts.json())
    .then(jsonListProducts => {

        console.log(jsonListProducts);
        //jsonListProducts is an Array of products in the DB
        for (const elem of Object.entries(localStorage)) {
            //JSON.parse(elem[1])
            console.log(JSON.parse(elem[1]));
            console.log(jsonListProducts[JSON.parse(elem[1]).id]);
            console.log(JSON.parse(elem[1]).options);
            console.log(JSON.parse(elem[1]).count);
            console.log(elem[0]);
            /*            let card = new ProductCart(jsonListProducts.JSON.parse(elem[1]).id,JSON.parse(elem[1]).options,JSON.parse(elem[1]).count)
                                    appendProductCardCart(card, elem[0]);*/

        }
    });