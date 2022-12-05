// Initialisation Local Storage
let productLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productLocalStorage);


getCart()

function getCart() {
    if (productLocalStorage === null || productLocalStorage == 0) {
    document.querySelector("#cart__items").innerHTML = `<p>Votre panier est vide</p>`;
    } else { 

for (let product in productLocalStorage){
    // Insertion de l'élément "article"
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id', productLocalStorage[product].productId);

        // Insertion de l'élément "div"
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";
    
        // Insertion de l'image
        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = productLocalStorage[product].productImg;
        productImg.alt = productLocalStorage[product].productAltImg;
        
        // Insertion de l'élément "div"
        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";

        // Insertion de l'élément "div"
    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = "cart__item__content__description";
    
    // Insertion du titre h2
    let productTitle = document.createElement("h2");
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = productLocalStorage[product].productName;

    // Insertion de la couleur
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = productLocalStorage[product].productColor;
    productColor.style.fontSize = "20px";

    // Insertion du prix
    let productPrice = document.createElement("p");
    productItemContentTitlePrice.appendChild(productPrice);
    productPrice.innerHTML = productLocalStorage[product].productPrice + " €";

    // Insertion de l'élément "div"
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    // Insertion de l'élément "div"
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
    
    // Insertion de "Qté : "
    let productQte = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQte);
    productQte.innerHTML = "Qté : ";

    // Insertion de la quantité
    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = productLocalStorage[product].productQuantity;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    // Insertion de l'élément "div"
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

    // Insertion de "p" supprimer
    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Supprimer";
} 
}}

function getTotals(){

    // Récupération du total des quantités
    const eltQuantity = document.querySelectorAll(".itemQuantity");
    const myLength = eltQuantity.length;
    let totalQuantity = 0;
    console.log(myLength);

    for (let i = 0; i < myLength; i++) {
        totalQuantity += eltQuantity[i].valueAsNumber;
    }

    let productTotalQuantity = document.querySelector('#totalQuantity');
    productTotalQuantity.innerHTML = totalQuantity;
    console.log(totalQuantity);

    // Récupération du prix total
    let totalPrice = 0;

    for (let i = 0; i < myLength; i++) {
        totalPrice += (eltQuantity[i].valueAsNumber * productLocalStorage[i].productPrice);
    }

    let productTotalPrice = document.querySelector('#totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotals()


// Modification des quantités produit
function modifyQuantity() {
    let changeQuantity = document.querySelectorAll(".itemQuantity");
    let choiceQuantity = Number(changeQuantity[0].value)

    for (let i = 0; i < changeQuantity.length; i++){
        changeQuantity[i].addEventListener("change" , (event) => {
            
            if (choiceQuantity > 0 && choiceQuantity <=100 && choiceQuantity != 0  && Number.isInteger(Number(changeQuantity[0].value))) {
                //Selection de l'element à modifier
            let baseQuantity = productLocalStorage[i].productQuantity;
            let editQuantity = changeQuantity[i].valueAsNumber;

            const productInCart = productLocalStorage.find((elt) => elt.editQuantity !== baseQuantity);
            productInCart.productQuantity = editQuantity;
            productLocalStorage[i].productQuantity = productInCart.productQuantity;

            localStorage.setItem("product", JSON.stringify(productLocalStorage));
        
            // reload de la page
            location.reload();
            } else {
                alert("Merci de séléctionner une quantité valide (entre 1 et 100)")
            }
            
            event.preventDefault();
        })
    }
}
modifyQuantity();



// Suppression d'un produit
function deleteProduct() {
    let deleteBtn = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < deleteBtn.length; i++){
        deleteBtn[i].addEventListener("click" , (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer 
            let idDelete = productLocalStorage[i].productId;
            let colorDelete = productLocalStorage[i].productColor;

            productLocalStorage = productLocalStorage.filter( el => el.productId !== idDelete || el.productColor !== colorDelete );
            
            localStorage.setItem("product", JSON.stringify(productLocalStorage));

            //Alerte et reload de la page
            alert("le produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
deleteProduct();


