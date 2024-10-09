let images = [];
let currentImageIndex = 0;

// Fetch the image data from the JSON file
fetch('image-data.json')
    .then(response => response.json())
    .then(data => {
        images = data;
        if (images.length > 0) {
            showImage(0);
            setInterval(shuffleImage, 5000); // Change image every 5 seconds
        }
    })
    .catch(error => console.error('Error loading image data:', error));

function showImage(index) {
    const imgElement = document.getElementById('familyImage');
    imgElement.src = images[index].url;
    imgElement.alt = images[index].description;
}

function shuffleImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
}
