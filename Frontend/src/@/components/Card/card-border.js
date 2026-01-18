document.addEventListener("DOMContentLoaded", () => {
    let card = document.querySelector('.card-border');

    if (card) {
        card.onmousemove = (e) => {
            let x = e.pageX - card.offsetLeft;
            let y = e.pageY - card.offsetTop;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        };
    } else {
        console.warn("Element `.card-border` not found!");
    }
});
