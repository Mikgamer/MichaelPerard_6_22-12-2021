async function getPhotographers() {
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
async function displayWorkData(medias) {
    const photographerWork = document.querySelector(".photograph-work");
    
    const works = medias.filter( media => media.photographerId == getPhotographerId() )

    works.forEach((media) => {
        const photographerWorkModel = photographerWorkFactory(media);
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
    const totalLikesNumber = document.querySelector(".totalLikesNumber");

    let totalLikes = 0;
    likes.forEach( like => totalLikes += parseInt(like.textContent) )

    totalLikesNumber.textContent = totalLikes;
}

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

function selectDropdownOption(event) {
    const target = event.currentTarget;

    const option = target.dataset.value;
    const dropdown = target.parentNode.parentNode;
    let optionsHidden = dropdown.getElementsByClassName("dropdown-hide")

    for (let i = 0; i < optionsHidden.length; i++) {
        optionsHidden[i].classList.remove("dropdown-hide");
    }
    target.classList.add("dropdown-hide");

    dropdown.dataset.value = option;
    dropdown.querySelector('span').textContent = dropdown.querySelector(`[data-value=${option}]`).textContent;
    dropdown.classList.toggle('dropdown-open');

    orderWork();
}

function orderWork() {
    const photographWork = document.querySelector(".photograph-work");
    let contentNodes = document.querySelectorAll('.thumb-imgfull');
    const order = document.querySelector(".dropdown").dataset.value;
    // Converti la nodelist en array, le call appelle la nodelist en tant que 'this' dans la méthode et array.prototype défini le type de 'this'
    let content = Array.prototype.slice.call(contentNodes);
    
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

function lightbox(event) {
    const target = event.currentTarget;
    const work = target.parentNode;
    const lightbox = document.querySelector(".lightbox");
    const worksNodes = document.querySelectorAll(".photograph-work>article");
    // Converti la nodelist en array, le call appelle la nodelist en tant que 'this' dans la méthode et array.prototype défini le type de 'this'
    let works = Array.prototype.slice.call(worksNodes);
    const indexWork = works.indexOf(work);

    lightbox.dataset.key = indexWork;

    loadLightbox();
    
    lightbox.classList.toggle('lightbox-show');
}

function loadLightbox() {
    const lightbox = document.querySelector(".lightbox");
    const lightboxText = lightbox.querySelector("p");
    const worksNodes = document.querySelectorAll(".photograph-work>article");
    // Converti la nodelist en array, le call appelle la nodelist en tant que 'this' dans la méthode et array.prototype défini le type de 'this'
    let works = Array.prototype.slice.call(worksNodes);
    const currentWorkKey = lightbox.dataset.key;
    const currentText = works[currentWorkKey].querySelector("p").textContent;
    const currentWork = works[currentWorkKey].querySelector(".thumb-img").cloneNode(true);

    if (currentWorkKey < 1) {
        lightbox.querySelector(".previous").setAttribute("disabled","")
    } else if (currentWorkKey > works.length - 2) {
        lightbox.querySelector(".next").setAttribute("disabled","")
    } else {
        lightbox.querySelector(".previous").removeAttribute("disabled")
        lightbox.querySelector(".next").removeAttribute("disabled")
    }

    if (lightbox.querySelector(".thumb-img") != undefined) {
        lightbox.querySelector(".thumb-img").outerHTML = "";
    }

    lightbox.insertBefore(currentWork, lightboxText);
    lightbox.querySelector(".thumb-img").removeAttribute("onclick");
    lightboxText.textContent = currentText;
}

function lightboxControl(event) {
    const target = event.currentTarget;
    const lightbox = document.querySelector(".lightbox");
    const worksNodes = document.querySelectorAll(".photograph-work>article");
    // Converti la nodelist en array, le call appelle la nodelist en tant que 'this' dans la méthode et array.prototype défini le type de 'this'
    let works = Array.prototype.slice.call(worksNodes);
    let lightboxKey = parseInt(lightbox.dataset.key);
    let needLoad = false;

    switch (target.className) {
        case "next":
            if (lightboxKey < works.length - 1) {
                lightboxKey += 1;
                needLoad = true;
            }
            break;
        case "previous":
            if (lightboxKey > 0) {
                lightboxKey -= 1;
                needLoad = true;
            }
            break;
        case "close":
            lightbox.classList.toggle('lightbox-show');
            break;
    
        default:
            break;
    }

    lightbox.dataset.key = lightboxKey;
    needLoad ? loadLightbox() : undefined;
}

async function init() {
    // Récupère les données des photographes avant de charger le reste des fonctions
    const { photographers, media } = await getPhotographers();

    // Trouve le photographe en fonction du paramètre de la page
    const photographer = photographers.find( photographe => photographe.id == getPhotographerId() )

    displayPhotographerData(photographer);
    displayWorkData(media);

    orderWork();
    updateTotalLikes();
};
    
init();