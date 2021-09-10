class ProductCart {
    constructor(jsonProduct, jsonLocalStorage) {
        jsonProduct && Object.assign(this, jsonProduct);
        jsonLocalStorage && Object.assign(this, jsonLocalStorage);
    }
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
                                        <span class="material-icons" onclick="changeQuantity(-1,'${localId}')">remove_circle_outline</span>
                                        <span>${data.quantity}</span>
                                        <span class="material-icons" onclick="changeQuantity(1,'${localId}')">add_circle_outline</span>
                                    </p>
                                    <span class="delete-product" onclick="changeQuantity(0,'${localId}')"></span>
`;
    document.getElementById('orinours').appendChild(productCardCart);


}



fetch("http://localhost:3000/api/teddies/")
    .then(dataListProducts => dataListProducts.json())
    .then(jsonListProducts => {
        console.log(jsonListProducts);
        //jsonListProducts is an Array of products in the DB
        for (const elem of Object.entries(localStorage)) {
            let productAdded = new ProductCart(jsonListProducts.find(element => element._id == JSON.parse(elem[1]).id), JSON.parse(elem[1]));
            appendProductCardCart(productAdded, elem[0]);
        }
    });


function changeQuantity(newQuantity, id) {
    
    let localProduct = JSON.parse(localStorage.getItem(id));
    console.log(localProduct);
    console.log(id);
    if (localProduct.quantity + newQuantity == 0 || newQuantity==0) {
        localStorage.removeItem(id);
        document.getElementById(id).remove();
    } else {
        localProduct.quantity += newQuantity;
        localStorage.setItem(id, JSON.stringify(localProduct));
        let card = document.getElementById(id);
        card.querySelector('.product-quantity > span:nth-child(2)').innerHTML = localProduct.quantity;
        //card.querySelector('.product-price').innerHTML=localProduct.quantity*jsonListProducts.find(element => element._id == localProduct.id).price/100;

    }
}