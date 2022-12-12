//Lien entre page d’accueil et page produit
const str = window.location.href;
const url = new URL(str);
const idProduct = url.searchParams.get("id");
let article = "";
const color = document. querySelector("#colors"); 
const quantity = document.querySelector("#quantity");


getProduct();

// Récupération des articles de l'API
function getProduct() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (APIreturn) {
        article = await APIreturn;
        if (article){
            insertionElt(article);
        }
    })
    .catch(function (error) {
        return error;
    })
}

function insertionElt(article){
    // Insertion de l'image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Insertion du titre
    let productName = document.querySelector(".item #title");
    productName.innerHTML = article.name;
    productName.style.color = "white" // voir avec Steve

    // Insertion du titre de la page
    document.title = article.name

    // Insertion du prix
    let productPrice = document.querySelector("#price");
    productPrice.innerHTML = article.price;



    // Insertion de la description
    let productDescription = document.querySelector("#description");
    productDescription.innerHTML = article.description;


    // Insertion des options de couleurs
    for (let colors of article.colors){
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(article);
}

//Ajouter des produits dans le panier
function addToCart(article) {
    const btn_addToCart = document.querySelector("#addToCart");

    //Vérifier les conditions du click
    btn_addToCart.addEventListener("click", (e)=>{
        if (quantity.value > 0 && quantity.value <=100 && quantity.value != 0 && color.value != 0 && Number.isInteger(Number(quantity.value))){

    //Recupération du choix de la couleur
    let colorChoice = color.value;
                
    //Recupération du choix de la quantité
    let quantityChoice = quantity.value;

    //Récupération des infos 
    let options = {
        productId: idProduct,
        productColor: colorChoice,
        productQuantity: quantityChoice,
        productName: article.name,
        productPrice: article.price,
        productDescription: article.description,
        productImg: article.imageUrl,
        productAltImg: article.altTxt
    };


    //Local storage
    let productLocalStorage = JSON.parse(localStorage.getItem("product"));

    //fenêtre pop-up
    const popup =() =>{
        if(window.confirm(`Votre séléction de ${quantityChoice} ${article.name}, de couleur "${colorChoice}", est ajoutée au panier
        Pour consulter votre panier, cliquez sur OK`)){
            window.location.href ="cart.html";
        }
    }

    //Sauvegarde des choix dans le local storage
    //Si le panier n'est pas vide
    if (productLocalStorage) {
        const productInCart = productLocalStorage.find(
            (elt) => elt.productId === idProduct && elt.productColor === colorChoice);

            //Si c'est le même produit
            if (productInCart) {
                let addition =
                parseInt(options.productQuantity) + parseInt(productInCart.productQuantity);
                productInCart.productQuantity = addition;
                localStorage.setItem("product", JSON.stringify(productLocalStorage));
                console.table(productLocalStorage);
                popup();
                
            //Si ce n'est pas le même produit
            } else {
                productLocalStorage.push(options);
                localStorage.setItem("product", JSON.stringify(productLocalStorage));
                console.table(productLocalStorage);
                popup();
            }

        //Si le panier est vide
        } else {
            productLocalStorage =[];
            productLocalStorage.push(options);
            localStorage.setItem("product", JSON.stringify(productLocalStorage));
            console.table(productLocalStorage);
            popup();
        }} else {
            alert("Merci de séléctionner une couleur ainsi qu'une quantité valide (entre 1 et 100)")
        }
        });
    }



