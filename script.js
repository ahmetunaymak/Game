const PHOTO_COUNT = 75;
const images = Array.from({ length: PHOTO_COUNT }, (_, i) => `photos/photo${i + 1}.jpg`);

let currentIndex = 0;

const carousel1 = document.getElementById('carousel1');
const photoElements1 = carousel1.querySelectorAll('.photo1');
const zoomedPhoto1 = document.getElementById('zoomed-photo1');
const overlay1 = document.getElementById('overlay1');
const closeBtn1 = document.getElementById('close-btn1');

function updatePhotos() {
  const prev = (currentIndex - 1 + images.length) % images.length;
  const next = (currentIndex + 1) % images.length;

  photoElements1[0].src = images[prev];
  photoElements1[1].src = images[currentIndex];
  photoElements1[2].src = images[next];

  carousel1.style.transform = `translateX(-100%)`;
}

function scrollNext() {
  carousel1.style.transition = 'transform 0.4s ease';
  carousel1.style.transform = 'translateX(-200%)';
  carousel1.addEventListener('transitionend', () => {
    currentIndex = (currentIndex + 1) % images.length;
    carousel1.style.transition = 'none';
    updatePhotos();
  }, { once: true });
}

function scrollPrev() {
  carousel1.style.transition = 'transform 0.4s ease';
  carousel1.style.transform = 'translateX(0%)';
  carousel1.addEventListener('transitionend', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    carousel1.style.transition = 'none';
    updatePhotos();
  }, { once: true });
}

photoElements1[1].addEventListener('click', () => {
  zoomedPhoto1.src = images[currentIndex];
  overlay1.classList.remove('hidden1');
});

closeBtn1.addEventListener('click', () => {
  overlay1.classList.add('hidden1');
});

document.getElementById('prev-btn1').addEventListener('click', scrollPrev);
document.getElementById('next-btn1').addEventListener('click', scrollNext);

document.getElementById('share-btn1').addEventListener('click', async () => {
  try {
    await navigator.share({
      title: 'Check out this photo!',
      url: images[currentIndex]
    });
  } catch (err) {
    alert('Sharing not supported.');
  }
});

updatePhotos();
