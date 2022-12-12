//Local Storage
let productLocalStorage = JSON.parse(localStorage.getItem("product"));



getCart()

function getCart() {
    if (productLocalStorage === null || productLocalStorage == 0) {
    document.querySelector("#cart__items").innerHTML = `<p>Votre panier est vide</p>`;
    } else { 

// Insertion des éléments 
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

    for (let i = 0; i < myLength; i++) {
        totalQuantity += eltQuantity[i].valueAsNumber;
    }

    let productTotalQuantity = document.querySelector('#totalQuantity');
    productTotalQuantity.innerHTML = totalQuantity;

    // Récupération du prix total
    let totalPrice = 0;

    for (let i = 0; i < myLength; i++) {
        totalPrice += (eltQuantity[i].valueAsNumber * productLocalStorage[i].productPrice);
    }

    let productTotalPrice = document.querySelector('#totalPrice');
    productTotalPrice.innerHTML = totalPrice;
}
getTotals()



// Modification des quantités produit
function modifyQuantity() {
    
    for (let i = 0; i < document.querySelectorAll(".itemQuantity").length; i++){

        let changeQuantity = document.querySelectorAll(".itemQuantity");
        let choiceQuantity = parseInt(changeQuantity[i].value)

        changeQuantity[i].addEventListener("change" , () => {
        if (choiceQuantity > 0 && choiceQuantity <=100 && choiceQuantity != 0  && Number.isInteger(Number(changeQuantity[i].value))) {
            
                //Selection de l'element à modifier
            let editQuantity = changeQuantity[i].valueAsNumber;
            let baseQuantity = productLocalStorage[i].productQuantity;
            
            const productInCart = productLocalStorage.map(
                (elt) => elt.editQuantity !== baseQuantity);
            productInCart.productQuantity = editQuantity;
            productLocalStorage[i].productQuantity = productInCart.productQuantity;

            localStorage.setItem("product", JSON.stringify(productLocalStorage));
        
            // reload de la page
            location.reload();
            } else {
                alert("Merci de séléctionner une quantité valide (entre 1 et 100)")
            }
        })
    }
}
modifyQuantity();


// Suppression d'un produit
function deleteProduct() {
    let deleteBtn = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < deleteBtn.length; i++){
        deleteBtn[i].addEventListener("click" , () => {
            

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

//Formulaire avec regex
function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1,}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,3}$");
    let nameRegExp = new RegExp("^[a-zA-Z ,.'-]{1,}$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+$");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Ecoute de la modification du nom
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Ecoute de la modification de l'adresse
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Ecoute de la modification de la ville
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Ecoute de la modification de l'email
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (nameRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Merci de renseigner correctement le champ.';
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (nameRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Merci de renseigner correctement le champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Merci de renseigner correctement le champ.';
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (nameRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Merci de renseigner correctement le champ.';
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Merci de renseigner correctement le champ.';
        }
    };
    }
getForm();

//Envoi des informations client
function postForm(){
    const btn_order = document.querySelector("#order");

    //Ecouter le panier
    btn_order.addEventListener("click", (e)=>{
        e.preventDefault()
    
        //Récupération des coordonnées du formulaire client
        let inputName = document.querySelector('#firstName');
        let inputLastName = document.querySelector('#lastName');
        let inputAdress = document.querySelector('#address');
        let inputCity = document.querySelector('#city');
        let inputMail = document.querySelector('#email');
        

        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let i = 0; i<productLocalStorage.length;i++) {
            idProducts.push(productLocalStorage[i].productId);
        }

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        } 

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };
        
        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);

            document.location.href = "confirmation.html";
        })
        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
        })
}
postForm();
