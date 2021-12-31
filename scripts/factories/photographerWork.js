function photographerWorkFactory(data) {
    
    const { id, photographerId, title, image, video, likes, date, price } = data;
    const picture = `assets/images/${image}`;
    const videoMedia = `assets/images/${video}`;

    function getMediaDOM() {
        var media = "";

        if( image != undefined ) {
            media = document.createElement( 'img' );
            media.src = picture;
            media.alt = title;
            media.setAttribute("loading", "lazy");
            media.setAttribute("onclick", "lightbox(event)");
            media.setAttribute("onkeydown", "event.key==='Enter'?lightbox(event):undefined");
            media.setAttribute("tabindex", 0);
            media.dataset.date = date;
            media.className = 'thumb-img';
        } else if( video != undefined ) {
            media = document.createElement( 'video' );
            media.className = 'thumb-img';
            media.src = videoMedia;
            media.setAttribute("onclick", "lightbox(event)");
            media.setAttribute("onkeydown", "event.key==='Enter'?lightbox(event):undefined");
            media.setAttribute("tabindex", 0);
            media.dataset.date = date;
        }

        return media
    }

    function getUserWorkDOM() {
        const article = document.createElement( 'article' );
        article.className = 'thumb-imgfull';
        
        var media = getMediaDOM();

        const text = document.createElement( 'h2' );
        text.textContent = title;

        const divLikes = document.createElement( 'div' );
        divLikes.setAttribute("onclick", 'like(event)');
        divLikes.className = 'likes';
        divLikes.ariaLabel = 'likes';

        const numberLikes = document.createElement( 'span' );
        numberLikes.className = 'number-likes';
        numberLikes.textContent = likes;
        
        const imgLikes = document.createElement( 'img' );
        imgLikes.src = 'assets/icons/heart.svg';
        imgLikes.alt = 'likes';

        divLikes.appendChild(numberLikes);
        divLikes.appendChild(imgLikes);

        article.appendChild(media);
        article.appendChild(text);
        article.appendChild(divLikes);

        return article;
    }

    return { getUserWorkDOM }
}