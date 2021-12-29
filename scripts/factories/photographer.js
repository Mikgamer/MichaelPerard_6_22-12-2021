function photographerFactory(data) {

    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.className = 'thumb-photographer';

        const linkUser = document.createElement( 'a' );
        linkUser.href = `/photographer.html?photographer=${id}`;

        const img = getUserPictureDOM();

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const location = document.createElement( 'p' );
        location.textContent = `${city}, ${country}`;

        const tag = document.createElement( 'p' );
        tag.textContent = tagline;

        const dailyPrice = document.createElement( 'p' );
        dailyPrice.textContent = `${price}€/jour`;

        linkUser.appendChild(img);
        linkUser.appendChild(h2);
        article.appendChild(linkUser);

        article.appendChild(location);
        article.appendChild(tag);
        article.appendChild(dailyPrice);

        return (article);
    }

    function getUserProfileDOM() {
        const div = document.createElement( 'div' );
        div.className = 'photographer-profile';

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const location = document.createElement( 'p' );
        location.textContent = `${city}, ${country}`;

        const tag = document.createElement( 'p' );
        tag.textContent = tagline;

        div.appendChild(h2);
        div.appendChild(location);
        div.appendChild(tag);

        return (div);
    }

    function getUserPictureDOM() {
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Image du photographe ${name}`);
        img.setAttribute("loading", "lazy");
        img.className = 'user';
        
        return (img);
    }
    
    return { getUserCardDOM, getUserProfileDOM, getUserPictureDOM, price }
}