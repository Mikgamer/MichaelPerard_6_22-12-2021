function tabindexSet(value){
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const tabs = [ ...main.querySelectorAll("[tabindex]") , ...header.querySelectorAll("[tabindex]") ];

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].setAttribute("tabindex",`${value}`);
    }
}