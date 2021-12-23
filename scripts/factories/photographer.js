function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.className = 'thumb-photographer';

        const user = document.createElement( 'a' );
        user.href = `photographer-${id}`;
        user.className = 'user';

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Image du photographe ${name}`);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const location = document.createElement( 'p' );
        location.textContent = `${city}, ${country}`;
        location.className = 'location';

        const tag = document.createElement( 'p' );
        tag.textContent = tagline;
        tag.className = 'tag';

        const dailyPrice = document.createElement( 'p' );
        dailyPrice.textContent = `${price}€/jour`;
        dailyPrice.className = 'dailyPrice';

        user.appendChild(img);
        user.appendChild(h2);
        article.appendChild(user);

        article.appendChild(location);
        article.appendChild(tag);
        article.appendChild(dailyPrice);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}