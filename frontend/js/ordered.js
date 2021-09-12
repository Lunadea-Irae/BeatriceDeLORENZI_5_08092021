let order = location.hash.split("&")
document.getElementById('order-id').innerHTML = order[0];
document.getElementById('total').innerHTML = decodeURI(order[1]);
setTimeout(() => {
    localStorage.clear()
}, 20);