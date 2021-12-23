    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        const photographers = [
        {
			"name": "Tracy Galindo",
			"id": 82,
			"city": "Montreal",
			"country": "Canada",
			"tagline": "Photographe freelance",
			"price": 500,
			"portrait": "account.png"
		},
		{
			"name": "Nabeel Bradford",
			"id": 527,
			"city": "Mexico City",
			"country": "Mexico",
			"tagline": "Toujours aller de l'avant",
			"price": 350,
			"portrait": "account.png"
		}
        ]
        // et bien retourner le tableau photographers seulement une fois
        return ({
            photographers: [...photographers, ...photographers, ...photographers]})
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
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    