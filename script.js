// Photography Data
const photos = [];
const totalPhotos = 50;

for (let i = 1; i <= totalPhotos; i++) {
    photos.push({
        title: `Photo ${i}`,
        photographer: "Srishti",
        url: `images/photo${i}.jpg`,
        desc: `Description for photo ${i}`
    });
}

const carousel = document.querySelector('.carousel');
const angleIncrement = 360 / photos.length;
let currentAngle = 0;

photos.forEach((photo, i) => {
    const photoElement = document.createElement('div');
    photoElement.className = 'photo';

    const angle = i * angleIncrement;
    const radius = Math.max(500, window.innerWidth / 2);
    photoElement.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    photoElement.innerHTML = `<img src="${photo.url}" alt="${photo.title}">`;

    photoElement.addEventListener('click', () => {
        document.getElementById('zoomed-img').src = photo.url;
        document.querySelector('.modal').style.display = 'block';
    });

    carousel.appendChild(photoElement);
});

// Auto-rotate
let rotateInterval = setInterval(() => {
    currentAngle += 0.2;
    carousel.style.transform = `rotateY(${currentAngle}deg)`;
}, 50);

// Next & Previous buttons
document.getElementById('next-btn').addEventListener('click', () => {
    currentAngle -= angleIncrement;
    carousel.style.transform = `rotateY(${currentAngle}deg)`;
});

document.getElementById('prev-btn').addEventListener('click', () => {
    currentAngle += angleIncrement;
    carousel.style.transform = `rotateY(${currentAngle}deg)`;
});

// Info button
document.getElementById('info-btn').addEventListener('click', () => {
    const index = Math.round((-currentAngle / angleIncrement)) % photos.length;
    const photo = photos[(index + photos.length) % photos.length];
    alert(`Title: ${photo.title}\nPhotographer: ${photo.photographer}\nDescription: ${photo.desc}`);
});

// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
});

// Responsive adjustments
window.addEventListener('resize', () => {
    const radius = Math.max(500, window.innerWidth / 2);
    const pieces = document.querySelectorAll('.photo');
    pieces.forEach((piece, i) => {
        const angle = i * angleIncrement;
        piece.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });
});
