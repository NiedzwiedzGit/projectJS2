console.clear();

var body = document.body,
	lightbox = document.querySelector('.lightbox'),
	lightboxContent = lightbox.querySelector('.lightbox-content'),
	lightboxImages = [],
	lightboxPrevious = lightbox.querySelector('.lightbox-previous'),
	lightboxNext = lightbox.querySelector('.lightbox-next'),

	photoLink = document.querySelectorAll('.content a');

function getTransitionPrefix() {
	var element = document.createElement('div'),
		transitions = {
			'transition': 'transitionend',
			'webkitTransition': 'webkitTransitionEnd',
			'msTransition': 'msTransitionEnd',
			'mozTransition': 'MoztransitionEnd'
		};

	for (var transition in transitions) {
		if (element.style[transition] !== undefined) {
			return transitions[transition];
		}
	}
}

function showLightbox(source) {
	body.classList.add('js-lightbox-loading');
	body.classList.remove('js-lightbox-active');
	body.classList.remove('js-lightbox-first');
	body.classList.remove('js-lightbox-last');
	
	lightboxContent.innerHTML = '<img src="' + source + '" />';
	imagesLoaded(lightboxContent, function () {
		body.classList.remove('js-lightbox-loading');
		body.classList.add('js-lightbox-active');
	});
}
function previousLightbox() {
	var currentIndex = lightboxImages.indexOf(lightboxContent.querySelector('img').src);
	
	currentIndex--;
	
	if (currentIndex >= 0) {
		showLightbox(lightboxImages[currentIndex]);
	} else {
		body.classList.add('js-lightbox-first');
		lightboxContent.addEventListener(getTransitionPrefix(), function() {
			body.classList.remove('js-lightbox-first');
		});
	}
}
function nextLightbox() {
	var currentIndex = lightboxImages.indexOf(lightboxContent.querySelector('img').src);
	
	currentIndex++;
	
	if (currentIndex < lightboxImages.length) {
		showLightbox(lightboxImages[currentIndex]);
	} else {
		body.classList.add('js-lightbox-last');
		lightboxContent.addEventListener(getTransitionPrefix(), function() {
			body.classList.remove('js-lightbox-last');
		});
	}
}
function hideLightbox() {
	body.classList.remove('js-lightbox-loading');
	body.classList.remove('js-lightbox-active');
	lightboxContent.innerHTML = '';
}

lightbox.addEventListener('click', function (event) {
	if ((event.target === this || event.target === this.querySelector('.loader') || event.target === this.querySelector('.close')) && (body.classList.contains('js-lightbox-loading') || body.classList.contains('js-lightbox-active'))) {
		hideLightbox();
	}
});
document.addEventListener('keyup', function (event) {
	if ((event.keyCode === 27 || event.keyCode === 33 || event.keyCode === 34) && (body.classList.contains('js-lightbox-loading') || body.classList.contains('js-lightbox-active'))) {
		hideLightbox();
	}
});
document.addEventListener('mousewheel', function (event) {
	if (body.classList.contains('js-lightbox-loading') || body.classList.contains('js-lightbox-active')) {
		hideLightbox();
	}
});


var startX = 0,
	startY = 0,
	endX = 0,
	endY = 0;

document.addEventListener('touchstart', function (event) {
	if (event.target === lightboxContent || event.target === lightboxContent.querySelector('img')) {
		startX = event.pageX || event.touches[0].pageX;
		startY = event.pageY || event.touches[0].pageY;
	}
});
body.addEventListener('touchmove', function (event) {
	if (event.target === lightboxContent || event.target === lightboxContent.querySelector('img')) {
		endX = event.pageX || event.touches[0].pageX;
		endY = event.pageY || event.touches[0].pageY;
	}
});
document.addEventListener('touchend', function (event) {
	if (event.target === lightboxContent || event.target === lightboxContent.querySelector('img')) {
		var distanceX = startX - endX;
		var distanceY = startY - endY;
		
		// event.changedTouches[0].pageX
		
		if (Math.abs(distanceX) > Math.abs(distanceY)) {
			if (distanceX > 0) {
				nextLightbox();
			} else {
				previousLightbox();
			}
		} else {
			hideLightbox();
		}
	}
	
	console.log(event);
});

lightboxPrevious.addEventListener('click', function (event) {
	previousLightbox();
});
document.addEventListener('keyup', function (event) {
	if (event.keyCode === 37 && (body.classList.contains('js-lightbox-loading') || body.classList.contains('js-lightbox-active'))) {
		previousLightbox();
	}
});
lightboxNext.addEventListener('click', function (event) {
	nextLightbox();
});
document.addEventListener('keyup', function (event) {
	if (event.keyCode === 39 && (body.classList.contains('js-lightbox-loading') || body.classList.contains('js-lightbox-active'))) {
		nextLightbox();
	}
});

for (var pl = 0, pll = photoLink.length; pl < pll; pl++) {
	lightboxImages.push(photoLink[pl].getAttribute('data-src-full'));
	
	photoLink[pl].addEventListener('click', function (event) {
		event.preventDefault();
		showLightbox(this.getAttribute('data-src-full'));
	});
}