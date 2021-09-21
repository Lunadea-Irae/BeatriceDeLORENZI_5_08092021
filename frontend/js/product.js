//Set product id within URL
let productId = location.search.replace('?', '');

//Create each field of the product data.
function createField(key, value, productName) {
    let newField = '';
    if (Array.isArray(value)) {
        let options = '';
        value.forEach(option =>
            options += `<option value="${option}">${option}</option>`);
        document.querySelector('#options').innerHTML += `<span><label class="form-label" for="${key}">${key} : </label><select class="form-control" id="${key}"> ${options} </select></span>`;
    } else if (key == 'imageUrl') {
        newField = `<img src="${value}" alt="Photo de ${productName}">`;
    } else if (key == 'name') {
        newField = `<h1 id="${key}">${value}</h1>`;
    } else if (key === 'price') {
        newField = `<h2 id="${key}">${value}</h2>`;
    } else if (key === '_id') {
        newField = `<input type="text" hidden value="${value}">`;
    } else {
        newField = `<p id="${key}">${value}</p>`;
    }
    document.querySelector('form').innerHTML += newField;
}


//get the product server datas
fetch(`http://localhost:3000/api/${configData.category}/${productId}`)
    .then(dataProduct => dataProduct.json())
    .then(jsonProduct => {
        let product = new Product(jsonProduct);
        document.title = product.name
        for (const [key, value] of Object.entries(product)) {
            createField(key, value, product.name);
        };
        fillHtml('productPage');

        //add an interaction for get in the cart.
        document.querySelector('#add-product-to-cart').addEventListener('click', function () {
            const selectedOptions = {};
            for (const select of document.querySelector('form').querySelectorAll('select')) {
                let id = select.getAttribute('id');
                selectedOptions[id] = select.value;
            }
            selectedOptions[Symbol.iterator] = true;

            if (localStorage.length == 0) {
                localStorage.setItem('cart', '[]');
            }
            let cart = JSON.parse(localStorage.getItem('cart'));
            let isPresent;
            cart.forEach(element => {
                if (element.id === productId && JSON.stringify(element.options) === JSON.stringify(selectedOptions)) {

                    isPresent = cart.indexOf(element);

                }
            });
            if (isPresent != undefined) {
                cart[isPresent].quantity += 1;
            } else {
                cart.push({ 'id': productId, 'options': selectedOptions, quantity: 1 });

            };
            localStorage.setItem('cart', JSON.stringify(cart));

            document.querySelector('#product-added-validation').style.display = "flex";
        }
        )
    });



