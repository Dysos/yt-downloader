const dlButton = document.querySelector('.download__button');
const textInput = document.querySelector('.text__input');
dlButton.addEventListener('click', () => {
	const encoded = encodeURIComponent(textInput.value);

	location.href = `/download/${encoded}`;
});
