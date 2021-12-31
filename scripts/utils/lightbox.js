function getWorks() {
    const worksNodes = document.querySelectorAll(".photograph-work>article");
    // Converti la nodelist en array, le call appelle la nodelist en tant que 'this' dans la méthode et array.prototype défini le type de 'this'
    return Array.prototype.slice.call(worksNodes);
}

function lightbox(event) {
    const target = event.currentTarget;
    const work = target.parentNode;
    const lightbox = document.querySelector(".lightbox");
    const works = getWorks();
    const indexWork = works.indexOf(work);

    lightbox.dataset.key = indexWork;

    tabindexSet(-1);
    loadLightbox();
    
    lightbox.classList.toggle('lightbox-show');
    lightbox.querySelector(".close").focus();
}

function loadLightbox() {
    const lightbox = document.querySelector(".lightbox");
    const lightboxText = lightbox.querySelector("p");
    const works = getWorks();
    const currentWorkKey = lightbox.dataset.key;
    const currentText = works[currentWorkKey].querySelector("H2").textContent;
    const currentWork = works[currentWorkKey].querySelector(".thumb-img").cloneNode(true);
    currentWork.setAttribute("tabindex","4");

    if (currentWork.tagName.toLowerCase() === "video") {
        currentWork.setAttribute("controls","");
    }

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
    const works = getWorks();
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
            tabindexSet(0);
            document.querySelectorAll(".thumb-img")[lightboxKey].focus();
            break;
    
        default:
            break;
    }

    lightbox.dataset.key = lightboxKey;
    needLoad ? loadLightbox() : undefined;
}
