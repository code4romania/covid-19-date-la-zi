document.addEventListener('DOMContentLoaded', function () {
	var box = document.getElementsByClassName('box')[0],
		button = document.getElementsByClassName('button')[0];

	button.addEventListener('click', function (e) {
		if (box.classList.contains('box-hidden')) {
			// show
			box.classList.add('box-transition');
			box.clientWidth; // force layout to ensure the now display: block and opacity: 0 values are taken into account when the CSS transition starts.
			box.classList.remove('box-hidden');
		} else {
			// hide
			box.classList.add('box-transition');
			box.classList.add('box-hidden');
		}
	}, false);

	box.addEventListener('transitionend', function () {
		box.classList.remove('box-transition');
	}, false);
});