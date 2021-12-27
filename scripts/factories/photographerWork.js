function photographerWorkFactory(data) {
    
    const { id, photographerId, title, image, likes, date, price } = data;
    const picture = `assets/images/${image}`;

    function getUserWorkDOM() {
        const article = document.createElement( 'article' );
        article.className = 'thumb-imgfull';
        
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `${title}`);
        img.className = 'thumb-img ';

        const text = document.createElement( 'p' );
        text.textContent = title;

        const divLikes = document.createElement( 'div' );
        divLikes.className = 'likes';

        const numberLikes = document.createElement( 'span' );
        numberLikes.className = 'number-likes';
        numberLikes.textContent = likes;
        const imgLikes = document.createElement( 'img' );
        imgLikes.setAttribute("src", 'assets/icons/heart.svg');
        imgLikes.setAttribute("alt", `likes`);

        divLikes.appendChild(numberLikes);
        divLikes.appendChild(imgLikes);

        article.appendChild(img);
        article.appendChild(text);
        article.appendChild(divLikes);

        return article;
    }

    return { getUserWorkDOM }
}