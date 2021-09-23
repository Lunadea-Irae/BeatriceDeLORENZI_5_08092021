//Once the order passed, display orderId and total
let order = location.hash.split("&")
document.querySelector('#order-id').innerHTML = order[0];
document.querySelector('#total').innerHTML = decodeURI(order[1]);
setTimeout(() => {
    fillHtml('orderedPage');
    document.querySelectorAll("select").forEach(select => select.setAttribute('disabled',true));
    localStorage.clear()
}, 200);