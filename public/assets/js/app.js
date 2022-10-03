const downloadButton = document.querySelector('.download-button');
const textInput = document.querySelector('.text-input');
downloadButton.addEventListener('click', () => {
	const encoded = encodeURIComponent(textInput.value);
	location.href = `/download/${encoded}`;
});
