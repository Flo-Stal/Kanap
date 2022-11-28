const str = window.location.href;
const url = new URL(str);
const idProduct = url.searchParams.get("id");


getArticle();

// Récupération des articles de l'API
function getArticle() {
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
    console.log(article);
    console.log(productName);


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
    
}




