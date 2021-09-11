let orderId = location.hash;
document.getElementById('order-id').innerHTML = orderId; 
setTimeout(() => { localStorage.clear() }, 200);