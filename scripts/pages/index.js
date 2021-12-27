async function getPhotographers() {
    // Récupère les données des photographes depuis le fichier JSON
    return fetch('data/photographers.json')
        .then(response => response.json());
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les données des photographes pour ensuite les insérer dans index.html
    const { photographers } = await getPhotographers();
    displayData(photographers);
};
    
init();
    