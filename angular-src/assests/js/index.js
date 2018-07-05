//GLOBALS
idx = 0;
tracklist = $("body").find("#musik-player_tracklist li");
player_elmnt = $("#musik-player_elmnt");


function fmtMSS(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

function initAudioPlayer() {
  if (player_elmnt[0].readyState > 2) {
    var formatted_dur = "" + fmtMSS(player_elmnt[0].duration) + "";
    var dur = formatted_dur.slice(0, 4);
    $("#musik-player_seek-duration").html(dur);
    $("#musik-player_loading").fadeOut();
  } else {
    $("#musik-player_loading").fadeIn();
    setTimeout(function(){
      initAudioPlayer();
    },800);
  }
}

function setMusikData(track){
  $("#musik-player_dial_button").removeClass("active");
  $("#musik-player_seek-current").css("width","0");
  player_elmnt[0].src = tracklist[track].getAttribute('data-file');
  $('#musik-player_title').html(tracklist[track].innerHTML);
  initAudioPlayer();
}

//set the first track
player_elmnt[0].src = tracklist[0].getAttribute('data-file');

//turn the player on
initAudioPlayer();

//play button
$("#musik-player_dial_button").on("click", function() {
  if( $(this).hasClass("active") ) {
    $(this).removeClass("active");
    player_elmnt[0].pause();

  } else {
    $(this).addClass("active");
    player_elmnt[0].play();
    player_elmnt[0].addEventListener("timeupdate", function() {
      var formatted_curTime = "" + fmtMSS(player_elmnt[0].currentTime) + "";
      var curTime = formatted_curTime.slice(0, 4);
      $("#musik-player_seek-start").html(curTime);

      var seekTime = parseInt(player_elmnt[0].currentTime, 10);
      var seekPerc = parseInt(seekTime) / parseInt(player_elmnt[0].duration, 10) * 100 / 2;
      $("#musik-player_seek-current").css("width","" + seekPerc + "%");

      if (player_elmnt[0].currentTime == player_elmnt[0].duration) {
        idx++;
        setMusikData(idx);
      }
    });
  }
});

//next button
$("#musik-player_next").on("click", function() {
  idx++;
  if(idx > parseInt(tracklist.length)-1){idx = 0;}
  setMusikData(idx);
});

//prev button
$("#musik-player_prev").on("click", function() {
  idx--;
  if(idx < 0){idx = parseInt(tracklist.length)-1;}
  setMusikData(idx);
});

//track click
$("#musik-player_tracklist li").on("click", function() {
  setMusikData($(this).index());
  $('#musik-player_tracklist').removeClass("active");
});

//show tracklist
$('#musik-player_toggle').on('click', function(e){
  e.preventDefault();
  $('#musik-player_tracklist').addClass("active");
});

//hide tracklist
$("#musik-player").click(function(event) {
    if(event.target.id == "musik-player_toggle"){return false;}
    if(!$(event.target).closest('#musik-player_tracklist').length) {
        if($('#musik-player_tracklist').hasClass("active")) {
            $('#musik-player_tracklist').removeClass("active");
        }
    }
});