let productId = location.hash.replace("#", "");

//Create Product object
class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
        this.price = jsonProduct.price / 100;
    }
}

class ProductLocalStorage {
    constructor(id, options, count) {
        this.id = id;
        this.options = options;
        this.count = count;
    }
}


function createField(key, value) {
    let newField;
    if (Array.isArray(value)) {
        let options = '';
        value.forEach(option =>
            options += `<option value="${option}">${option}</option>`);
        newField = `<label for="${key}">${key}</label><select id="${key}"> ${options} </select>`;
    } else if (key == 'imageUrl') {
        newField = `<img src="${value}" alt="Image of this product">`;
    } else {
        newField = `<p id="${key}">${value}</p>`;
    }
    document.querySelector('form').innerHTML += newField;
}



fetch(`http://localhost:3000/api/teddies/${productId}`)
    .then(dataProduct => dataProduct.json())
    .then(jsonProduct => {
        let product = new Product(jsonProduct);
        document.title = product.name + " - Orinours"
        for (const [key, value] of Object.entries(product)) {
            createField(key, value);
        };
        document.getElementById('add-product-to-cart').addEventListener('click', function () {
            const selectedOptions = {};
            for (const select of document.querySelector('form').querySelectorAll('select')) {
                let id = select.getAttribute('id');
                selectedOptions[id] = select.value;
            }
            let localName=product._id + Object.values(selectedOptions).join('');
            if (localStorage.getItem(localName) == null) {
                localStorage.setItem(localName, JSON.stringify(new ProductLocalStorage(product._id, selectedOptions, 1)));
            } else {
                localStorage.setItem(localName, JSON.stringify(new ProductLocalStorage(product._id, selectedOptions, JSON.parse(localStorage.getItem(localName)).count + 1)))
            }
        });
        location.replace(`#${product.name}`);
    });



