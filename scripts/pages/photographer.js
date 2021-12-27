async function getPhotographers() {
    // Récupère les données des photographes depuis le fichier JSON
    return fetch('data/photographers.json')
        .then(response => response.json());
}

async function displayProfileData(photographers) {
    const photographersHeader = document.querySelector(".photograph-header");
    const contactButton = document.querySelector(".contact_button");

    // Trouve le photographe en fonction du paramètre de la page
    const photographer = photographers.find( photographe => photographe.id == getPhotographerId() )

    const photographerModel = photographerFactory(photographer);
    const getUserProfile = photographerModel.getUserProfileDOM();
    const getUserPicture = photographerModel.getUserPictureDOM();

    photographersHeader.insertBefore(getUserProfile,contactButton);
    photographersHeader.appendChild(getUserPicture);
};

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

async function init() {
    // Récupère les données des photographes pour ensuite les insérer dans index.html
    const { photographers, media } = await getPhotographers();
    
    displayProfileData(photographers);
    displayWorkData(media);
};
    
init();