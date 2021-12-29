function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.classList.toggle("modal-show");
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
	modal.classList.toggle("modal-show");
}

function getPhotographerId() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params.photographer;
}

function sendForm(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").textContent;
    const lastName = document.getElementById("lastName").textContent;
    const email = document.getElementById("email").textContent;
    const yourMessage = document.getElementById("yourMessage").textContent;
    const data = {firstName, lastName, email, yourMessage};
    // Envoyer 'data' à l'email du photographe avec l'id de getPhotographerId()

    closeModal();
    return false;
}