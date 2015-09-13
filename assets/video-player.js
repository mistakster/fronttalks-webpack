(function () {

	function initPlayer(playerContainer) {
		var video = playerContainer.querySelector('video');
		var observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (record) {
				if (playerContainer.classList.contains('active')) {
					if (video.paused) {
						video.currentTime = 0;
						video.play();
					}
				} else {
					if (!video.paused) {
						video.pause();
						video.currentTime = 0;
					}
				}
			});
		});
		observer.observe(playerContainer, {
			attributes: true,
			attributeFilter: ['class']
		});
	}

	var players = document.querySelectorAll('.video-player');
	for (var i = 0; i < players.length; i++) {
		initPlayer(players[i]);
	}

})();