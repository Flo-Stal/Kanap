function confirmation(){
    const orderNumber = document.getElementById("orderId");
    orderNumber.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}
confirmation();