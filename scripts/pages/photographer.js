async function getPhotographers() {
    // Récupère les données des photographes depuis le fichier JSON
    return fetch('data/photographers.json')
        .then(response => response.json());
}

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

async function displayWorkData(media) {
    const photographerWork = document.querySelector(".photograph-work");
    
    const pictures = media.filter( picture => picture.photographerId == getPhotographerId() )

    pictures.forEach((picture) => {
        const photographerWorkModel = photographerWorkFactory(picture);
        const userWorkDOM = photographerWorkModel.getUserWorkDOM();
        photographerWork.appendChild(userWorkDOM);
    });
}

function getPhotographerId() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params.photographer;
}

async function updateTotalLikes() {
    const pictures = document.querySelector(".photograph-work");
    const likes = pictures.querySelectorAll(".number-likes");
    const spanTotalLikes = document.querySelector(".totalLikes");

    var totalLikes = 0;
    likes.forEach( like => totalLikes += parseInt(like.textContent) )
    const likesNode = document.createTextNode(totalLikes);
    
    spanTotalLikes.insertBefore(likesNode, spanTotalLikes.firstChild);
}

async function init() {
    // Récupère les données des photographes pour ensuite les insérer dans index.html
    const { photographers, media } = await getPhotographers();

    // Trouve le photographe en fonction du paramètre de la page
    const photographer = photographers.find( photographe => photographe.id == getPhotographerId() )

    displayPhotographerData(photographer);
    displayWorkData(media);
    updateTotalLikes();
};
    
init();