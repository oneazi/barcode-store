baseURL = 'http://localhost:5000/'

// function buttonPress() {
//     console.log("pressed button")
// }

// document.getElementById('fileupload').addEventListener('change', previewImage, false);

// function previewImage(evt) { 
// 	var files = evt.target.files; 
// 	var f = files[0]; 
// 	var reader = new FileReader();
// 	reader.onload = (
// 		function(theFile) { 
// 			return function(e) { 
// 				document.getElementById('imagePreview').innerHTML = [
// 					'<img src="', e.target.result,'" title="', theFile.name, '" width=250" />'
// 					].join('');
// 			}; 
// 		}
// 	)(f);
// 	reader.readAsDataURL(f); 
// }

// function sendImage() {

// }

function getBarcode(elementID) {
	console.log(`Clicked the ${elementID} button`)
	parent = document.getElementById(elementID)
	// storeName = 
}

const imageContainer = document.getElementById('imageContainer');
const popupContainer = document.querySelector('.popup-container');
const popupImage = document.querySelector('.popup-image');

// Predefined function to handle image click
function handleImageClick(imageId) {
    const image = document.getElementById(imageId);
    if (image) {
        popupImage.src = image.src;
        popupContainer.style.display = 'block';
    }
}

// Close the pop-up
function closePopup() {
    popupContainer.style.display = 'none';
}

// Function to create a new image tile
function createImageTile(imageUrl, imageId) {
    const imageTile = document.createElement('img');
    imageTile.id = imageId;
    imageTile.src = imageUrl;
    imageTile.classList.add('imageTile');
    imageTile.addEventListener('click', function() {
        // Call the predefined function with imageId as parameter
        handleImageClick(imageId);
    });
    imageContainer.insertBefore(imageTile, uploadTile); // Insert before the upload tile
}

// Placeholder tile for uploading
const uploadTile = document.createElement('div');
uploadTile.classList.add('uploadTile');
uploadTile.textContent = '+';
uploadTile.addEventListener('click', function() {
    // Simulate a click on the file input when the upload tile is clicked
    fileInput.click();
});

imageContainer.appendChild(uploadTile); // Append upload tile to the image container

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none'; // Hide the file input
fileInput.addEventListener('change', function(event) {
    const files = event.target.files;
    if (files) {
        for (const file of files) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imageUrl = event.target.result;
                const imageId = 'image-' + Date.now(); // Generate unique id for each image
                createImageTile(imageUrl, imageId);
                // After uploading, remove the previous upload tile and append a new one
                imageContainer.removeChild(uploadTile);
                imageContainer.appendChild(uploadTile);
            }
            reader.readAsDataURL(file);
        }
    }
});
