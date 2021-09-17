let order = location.hash.split("&")
document.querySelector('#order-id').innerHTML = order[0];
document.querySelector('#total').innerHTML = decodeURI(order[1]);
setTimeout(() => {
    localStorage.clear()
}, 20);