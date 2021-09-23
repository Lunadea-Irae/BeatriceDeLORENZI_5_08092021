//Once the order passed, display orderId and total
document.querySelector('#order-id').innerHTML = new URL(document.location).searchParams.get('orderId');
document.querySelector('#total').innerHTML = new URL(document.location).searchParams.get('total');
setTimeout(() => {
    fillHtml('orderedPage');
    document.querySelectorAll("select").forEach(select => select.setAttribute('disabled',true));
    localStorage.clear()
}, 200);