let productId = location.search.replace('?', '');


function createField(key, value) {
    let newField = '';
    if (Array.isArray(value)) {
        let options = '';
        value.forEach(option =>
            options += `<option value="${option}">${option}</option>`);
        document.querySelector('#options').innerHTML += `<span><label class="form-label" for="${key}">${key} : </label><select class="form-control" id="${key}"> ${options} </select></span>`;
    } else if (key == 'imageUrl') {
        newField = `<img src="${value}" alt="Image of this product">`;
    } else if (key == 'name') {
        newField = `<h1 id="${key}">${value}</h1>`;
    }
    else {
        newField = `<p id="${key}">${value}</p>`;
    }
    document.querySelector('form').innerHTML += newField;
}



fetch(`http://localhost:3000/api/${category[0]}/${productId}`)
    .then(dataProduct => dataProduct.json())
    .then(jsonProduct => {
        let product = new Product(jsonProduct);
        document.title = product.name + " - Orinours"
        for (const [key, value] of Object.entries(product)) {
            createField(key, value);
        };
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
                cart[isPresent].quantity+=1;
            } else {
                cart.push({ 'id': productId, 'options': selectedOptions, quantity: 1 });
                
            };
            localStorage.setItem('cart',JSON.stringify(cart));

            document.querySelector('#product-added-validation').style.display = "flex";
        }
        )
    });



