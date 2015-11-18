// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

var player;
var selected;
var audio;

var songs = {
	cheery: "./assets/Electro_Cabello.mp3",
	dramatic: "./assets/Despair_and_Triumph.mp3",
	saddening: "./assets/Impromptu_in_Blue.mp3",
	focused: "./assets/Legend_of_One.mp3",
	angry:"./assets/Gearhead.mp3",
	romantic:"./assets/Where_She_Walks.mp3"
}
$(document).ready(function(){
	audio = $('#music-tag')[0];
	$(".audio-button").click(function(e){
		player.playVideo();
		if (selected) {
			if (selected.data('song') == $(this).data('song')){
				audio.pause();
				player.pauseVideo();
				selected.removeClass("audio-selected");
				selected = undefined;
				return;
			}
			selected.removeClass("audio-selected")
		}
		$(this).addClass("audio-selected");
		selected = $(this);
		audio.src = songs[$(this).data('song')]
		audio.play();
	});

	$('#video-link-input').keyup(function(e){
			t = $(this);
			if (e.which === 13) {
				var videoUrl = t.val();
				t.val("");
				var videoId
				console.log(videoUrl)
				if(videoUrl.indexOf("watch") !== -1){
					//long url
					//https://www.youtube.com/watch?v=154himd-3ZE
					videoId = /.*v=(.*)$/.exec(videoUrl)[1]//videoUrl.split("watch")[1].split("?")[1].substring(2);
					console.log(videoId)
				}else if(videoUrl.indexOf(".be") !== 1){
					//https://www.youtube.com/watch?v=154himd-3ZE
					videoId = /.*be\/(.*)$/.exec(videoUrl)[1]
					console.log(videoId)
				}

				player.loadVideoById(videoId);
				// var regExp = /(?:.*youtu\.be\/(.*)\?.*)/g
	
			};
	})
});



function onYouTubeIframeAPIReady(){
	player = new YT.Player('video-player', {
		height: '390',
		width: '640',
		videoId: 'oyEuk8j8imI',
		playerVars:{
			playlist:'oyEuk8j8imI',
			loop:1,
			showinfo:0,
			controls:0
		},
		events: {
			'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerReady(event){
	event.target.mute();
	console.log(event.target)
}

function onPlayerStateChange(event){
	event.target.mute();
}