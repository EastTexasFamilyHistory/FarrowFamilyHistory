// Fetch images from JSON file
async function fetchImages() {
    const response = await fetch('image-data.json');
    const data = await response.json();
    return data.images;
}

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Global variables
let images = [];
let currentImageIndex = 0;

// Initialize image shuffler
async function initImageShuffler() {
    images = await fetchImages();
    shuffleArray(images);
    displayNextImage();
    setInterval(displayNextImage, 5000); // Change image every 5 seconds
}

// Display next image
function displayNextImage() {
    const img = document.getElementById('familyImage');
    img.src = images[currentImageIndex].url;
    img.alt = images[currentImageIndex].caption;
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

// Open modal with full-size image
function openModal(img) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.createElement('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalImg.style.maxWidth = '100%';
    modalImg.style.maxHeight = '80vh';
    
    const caption = document.getElementById('caption');
    caption.innerHTML = img.alt;
    
    modal.style.display = 'block';
    
    // Clear previous content and add new image
    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = '';
    modalContent.appendChild(modalImg);
}

// Close modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initImageShuffler();
    
    const familyImage = document.getElementById('familyImage');
    familyImage.addEventListener('click', () => openModal(familyImage));
    
    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.addEventListener('click', closeModal);
});

// Download current image
function downloadImage() {
    const img = document.querySelector('#imageModal img');
    const link = document.createElement('a');
    link.href = img.src;
    link.download = 'farrow_family_photo.jpg';
    link.click();
}