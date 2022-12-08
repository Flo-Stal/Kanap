insertProducts();

// Récupération des articles de l'API
async function getArticles() {
const articlesApi = await fetch("http://localhost:3000/api/products/");
if (articlesApi.ok === true) {
    return articlesApi.json();
}
}


// Répartition des données de l'API dans le DOM
async function insertProducts() {
const result = await getArticles()
    .then((APIreturn) => {
    const articles = APIreturn;
    console.log(APIreturn);
    for (let article in articles) {
        // Insertion de l'élément "a"
        let productLink = document.createElement("a");
        document.querySelector(".items").appendChild(productLink);
        console.log(productLink);
        productLink.href = `product.html?id=${APIreturn[article]._id}`;
        

        // Insertion de l'élément "article"
        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        // Insertion de l'élément "img"
        let productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = APIreturn[article].imageUrl;
        productImg.alt = APIreturn[article].altTxt;

        // Insertion de l'élément "h3"
        let productName = document.createElement("h3");
        productArticle.appendChild(productName);
        productName.classList.add("productName");
        productName.innerHTML = APIreturn[article].name;

        // Insertion de l'élément "p"
        let productDescription = document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList.add("productDescription");
        productDescription.innerHTML = APIreturn[article].description;
    }
    })
    .catch(function (error) {
    return error;
    });
}


