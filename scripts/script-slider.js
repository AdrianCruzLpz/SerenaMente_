let currentIndex = 0;

document.querySelector('.prev-button').addEventListener('click', () => {
    navigate(-1);
});

document.querySelector('.next-button').addEventListener('click', () => {
    navigate(1);
});

function navigate(direction) {
    const galleryContainer = document.querySelector('.gallery-container');
    const totalImages = document.querySelectorAll('.gallery-item').length;

    currentIndex = (currentIndex + direction + totalImages) % totalImages;
    const offset = -currentIndex * 100;

    galleryContainer.style.transform = `translateX(${offset}%)`;
}

//AUTOPLAY
let autoplayInterval = null;

function startAutoplay(interval) {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
        navigate(1);
    }, interval);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

startAutoplay(3000);

document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', stopAutoplay);
});

const menu = document.querySelector("#menu");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    menu.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    menu.classList.remove("visible");
})

function loadYouTubeVideo() {
    var youtubePlaceholder = document.getElementById('youtube-placeholder');
    youtubePlaceholder.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/EmIdLiK-iOg?si=dPhsOg7FIkxOVHeF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
}