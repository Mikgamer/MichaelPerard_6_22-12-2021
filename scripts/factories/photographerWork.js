function photographerWorkFactory(data) {
    
    const { id, photographerId, title, image, video, likes, date, price } = data;
    const picture = `assets/images/${image}`;
    const videoMedia = `assets/images/${video}`;

    function getUserWorkDOM() {
        const article = document.createElement( 'article' );
        article.className = 'thumb-imgfull';
        
        var media = "";

        if( image != undefined ) {
            media = document.createElement( 'img' );
            media.setAttribute("src", picture);
            media.setAttribute("alt", `${title}`);
            media.dataset.date = date;
            media.className = 'thumb-img';
        } else if( video != undefined ) {
            media = document.createElement( 'video' );
            media.className = 'thumb-img';
            media.setAttribute("src", videoMedia);
            media.dataset.date = date;
        }

        const text = document.createElement( 'p' );
        text.textContent = title;

        const divLikes = document.createElement( 'div' );
        divLikes.setAttribute("onclick", 'like(event)');
        divLikes.className = 'likes';

        const numberLikes = document.createElement( 'span' );
        numberLikes.className = 'number-likes';
        numberLikes.textContent = likes;
        
        const imgLikes = document.createElement( 'img' );
        imgLikes.setAttribute("src", 'assets/icons/heart.svg');
        imgLikes.setAttribute("alt", `likes`);

        divLikes.appendChild(numberLikes);
        divLikes.appendChild(imgLikes);

        article.appendChild(media);
        article.appendChild(text);
        article.appendChild(divLikes);

        return article;
    }

    return { getUserWorkDOM }
}