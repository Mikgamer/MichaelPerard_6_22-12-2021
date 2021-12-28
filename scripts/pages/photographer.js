async function getPhotographers() {
    // Récupère les données des photographes depuis le fichier JSON
    return fetch('data/photographers.json')
        .then(response => response.json());
}

// Affiche les informations de son profil
async function displayPhotographerData(photographer) {
    const photographersHeader = document.querySelector(".photograph-header");
    const contactButton = document.querySelector(".contact_button");
    const pricePerDay = document.querySelector(".pricePerDay");


    const photographerModel = photographerFactory(photographer);
    const userProfile = photographerModel.getUserProfileDOM();
    const userPicture = photographerModel.getUserPictureDOM();
    const userPrice = document.createTextNode(photographerModel.price);

    photographersHeader.insertBefore(userProfile,photographersHeader.firstChild);
    photographersHeader.appendChild(userPicture);

    pricePerDay.insertBefore(userPrice, pricePerDay.firstChild);
}

// Affiche les images et vidéos du photographe
async function displayWorkData(media) {
    const photographerWork = document.querySelector(".photograph-work");
    
    const pictures = media.filter( picture => picture.photographerId == getPhotographerId() )

    pictures.forEach((picture) => {
        const photographerWorkModel = photographerWorkFactory(picture);
        const userWorkDOM = photographerWorkModel.getUserWorkDOM();
        photographerWork.appendChild(userWorkDOM);
    });
}

// Récupère l'id du photographe depuis la querry url pour afficher son contenu
function getPhotographerId() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params.photographer;
}

// Recharge le nombre total de likes
async function updateTotalLikes() {
    const pictures = document.querySelector(".photograph-work");
    const likes = pictures.querySelectorAll(".number-likes");
    const totalLikesNumber = document.querySelector(".totalLikesNumber");

    var totalLikes = 0;
    likes.forEach( like => totalLikes += parseInt(like.textContent) )

    totalLikesNumber.textContent = totalLikes;
}

// Fonction ajout like
function like(event) {
    const target = event.currentTarget;

    if ( !target.hasAttribute('liked') ) {
        console.log("ok");
        target.setAttribute('liked','');
        target.querySelector(".number-likes").textContent = parseInt(target.textContent)+1;
        updateTotalLikes();
    }
}

function dropdown(event) {
    const dropdown = event.currentTarget.parentNode;
    dropdown.classList.toggle('dropdown-open');
}

function dropdownOption(event) {
    const target = event.currentTarget;

    const option = target.dataset.value;
    const dropdown = target.parentNode.parentNode;
    var optionsHidden = dropdown.getElementsByClassName("dropdown-hide")

    for (let i = 0; i < optionsHidden.length; i++) {
        optionsHidden[i].classList.remove("dropdown-hide");
    }
    target.classList.add("dropdown-hide");

    dropdown.dataset.value = option;
    dropdown.querySelector('span').textContent = dropdown.querySelector(`[data-value=${option}]`).textContent;
    dropdown.classList.toggle('dropdown-open');

    orderWork();
}

// Ordone les images et vidéos du photographe
function orderWork() {
    const photographWork = document.querySelector(".photograph-work");
    var contentNodes = document.querySelectorAll('.thumb-imgfull');
    const order = document.querySelector(".dropdown").dataset.value;
    // Converti la nodelist en array, le call appelle la nodelist en tant que 'this' dans la méthode et array.prototype défini le type de 'this'
    var content = Array.prototype.slice.call(contentNodes);
    
    switch (order) {
        case "popularity":
            // De + à -
            content.sort(
                function(item, nextItem){
                    let firstNumber = parseInt(item.querySelector(".number-likes").textContent);
                    let secondNumber = parseInt(nextItem.querySelector(".number-likes").textContent);
                    return secondNumber - firstNumber;
                }
            )
            break;
        case "date":
            // De + à -
            content.sort(
                function(item, nextItem){
                    let firstString = item.querySelector("[data-date]").dataset.date;
                    let secondString = nextItem.querySelector("[data-date]").dataset.date;
                    return secondString.localeCompare(firstString);
                }
            )
            break;
        case "title":
            // De A à B
            content.sort(
                function(item, nextItem){
                    let firstString = item.querySelector(".thumb-imgfull>:nth-child(2)").textContent.toLowerCase();
                    let secondString = nextItem.querySelector(".thumb-imgfull>:nth-child(2)").textContent.toLowerCase();
                    return firstString.localeCompare(secondString);
                }
            )
            break;
        default:
            break;
    }

    photographWork.innerHTML = "";
    content.forEach(item => photographWork.appendChild(item));
}

async function init() {
    // Récupère les données des photographes pour ensuite les insérer dans index.html
    const { photographers, media } = await getPhotographers();

    // Trouve le photographe en fonction du paramètre de la page
    const photographer = photographers.find( photographe => photographe.id == getPhotographerId() )

    displayPhotographerData(photographer);
    displayWorkData(media);

    orderWork();
    updateTotalLikes();
};
    
init();