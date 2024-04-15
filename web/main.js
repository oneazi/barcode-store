function buttonPress() {
    console.log("pressed button")
}

document.getElementById('fileupload').addEventListener('change', previewImage, false);

function previewImage(evt) { 
	var files = evt.target.files; 
	var f = files[0]; 
	var reader = new FileReader();
	reader.onload = (
		function(theFile) { 
			return function(e) { 
				document.getElementById('imagePreview').innerHTML = [
					'<img src="', e.target.result,'" title="', theFile.name, '" width=250" />'
					].join('');
			}; 
		}
	)(f);
	reader.readAsDataURL(f); 
}

function sendImage() {

}