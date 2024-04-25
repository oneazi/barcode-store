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
const popupContainer = document.getElementById('popupContainer');
const titleInput = document.getElementById('titleInput');
const descriptionInput = document.getElementById('descriptionInput');

// Predefined function to handle image click
function handleImageClick(title, description) {
    alert(`Title: ${title}\nDescription: ${description}`);
}

// Close the pop-up
function closePopup() {
    popupContainer.style.display = 'none';
}

// Function to create a new image tile with title and description
function createImageTile(title, description) {
    const imageTile = document.createElement('div');
    imageTile.classList.add('imageTile');
    imageTile.innerHTML = `<p class="title">${title}</p>`;
    imageTile.addEventListener('click', function() {
        // Call the predefined function with title and description as parameters
        handleImageClick(title, description);
    });
    imageContainer.insertBefore(imageTile, uploadTile); // Insert before the upload tile
}

// Open the form to add a new item
function openForm() {
    titleInput.value = ''; // Clear input fields
    descriptionInput.value = '';
    popupContainer.style.display = 'block';
}

// Handle form submission
imageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    if (title) {
        createImageTile(title, description);
        closePopup();
    } else {
        alert('Please enter a title.');
    }
});

// Placeholder tile for uploading
const uploadTile = document.createElement('div');
uploadTile.classList.add('uploadTile');
uploadTile.textContent = '+';
uploadTile.addEventListener('click', openForm);

imageContainer.appendChild(uploadTile); // Append upload tile to the image container
