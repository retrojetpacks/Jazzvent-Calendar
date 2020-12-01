var date = new Date();
var clickedDay; //store jquery address

function setup_dateArray()
{
  var boxes = 25;
  var dateArray = [];
  for (var i = 1; i < boxes+1; i++){
    dateArray.push(i);
  }

  function randomArrayShuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  randomArrayShuffle(dateArray);
  return dateArray;
}


function drawBoxes(json)
{

  var dateArray = setup_dateArray();
    for (var i = 0; i < dateArray.length; i++) {
      var $box = $("<article></article>", {class: 'day', id: dateArray[i]});
      var $content = $("<a />", {class: 'day-title', id: dateArray[i], href: '#'}).text(dateArray[i]);

      try {
        var im = "./images/" + json.musicians[dateArray[i]-1].photo
        var $img = $("<img />", {class: "day-image", id: dateArray[i], src: im});
      } catch (e) {
        var $img = $("<img />", {class: "day-image", id: dateArray[i], src: "./images/" + json.musicians[0].photo});
      }
      var $clickMe = $("<div></div>", {class:'clickMe'}).text("Click me!");
      $box.append($clickMe.clone());

      var R = (Math.random()+3)*40;
      var G = 0;
      var B = Math.random()*50;
      $content.css('background', 'rgb('+R+','+G+','+B+')')

      $box.append($content.clone());
      $box.append($img.clone());
      $("#wrapper").append($box.clone());
    }
}




function drawSnow()
{
  var Nsnow = 50;
  var $BG = $(".backdrop")
  var $W = $BG.width()*1.2;
  var $sig = $W / 10;

  for (var i = 0; i < Nsnow; i++) {
    var $snow = $("<div></div>", {class: "snow", id: i});
    $BG.append($snow);

    var x = Math.random(i) * $W - $W/10;
    var x2 = x + (Math.random(i)-0.5)*$sig
    var t = 10 + Math.random(i) * 5;
    var t2 = Math.random(i) * 10;

    $.keyframe.define([{
      name: 'fall'+i,
      '0%': { 'transform': 'translate('+x+'px,0px)'},
      '100%': { 'transform': 'translate('+x2+'px, 150vh)'}
    }])
    $('#'+i+'.snow').playKeyframe({
      name: 'fall'+i,
      duration: t+'s',
      timingFunction: 'linear',
      iterationCount: 'infinite',
      delay: t2+'s'
    })
  }
}



function displayOverlay(entry)
{
  //alert(entry.musicians[0].artist);
  //var $overlay = $('<div id="overlay" class="faded"> </div>');
  var $overlay = $('<div id="overlay"> </div>');
  var $overlayBox = $('<div id="overlayBox"> </div>');
  var $overlayContent = $('<div> </div>');

  var $name = $('<h2 class="overlayTextTitle">'+entry.artist+'</h2>');
  $name.appendTo($overlayContent);

  var url = "https://www.youtube.com/embed/" + entry.songLink;
  var $YouTube = $('<iframe id="myIframe" class="videoWrapper" src="'+url+'"autoplay=1></iframe>');

  //<iframe width="1280" height="720" src="https://www.youtube.com/embed/gR-RYOnNwPQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

  $YouTube.appendTo($overlayContent);

  for (var i=0; i<entry.bio.length; i++)
  {
    var $bio = $('<p class="overlayText">'+entry.bio[i]+'</p>');
    $bio.appendTo($overlayContent);
  }

  $overlay.appendTo(document.body);
  $overlayBox.appendTo($overlay);
  $overlayContent.appendTo($overlayBox);

}


$(document).ready(function () {
  //==== draw snow effects ==//
  drawSnow();

  //==== Load JSON data ====//
  var obj = $.getJSON("jazzvent-database.json").done(function (data){
  drawBoxes(data);
  });


});


//Remove day title cards
$(document).on("click", ".day-title", function(){ //delegated binding, using on
  //clickedDay = $(this)

  var day = $(this).attr("id");
  if (date.getDate() >= day)
  {
    $(this).addClass('recessed');
  }

  event.preventDefault(); //stop scroll to top of page
});

//Logic on image and overlay clicking
$(document).on("click", ".day-image", function(){ //delegated binding, using on
  if (!$(this).hasClass('clicked'))
  {
    clickedDay = $(this)
    $.getJSON("jazzvent-database.json").done(function (data){
      displayOverlay(data.musicians[clickedDay.attr("id")-1]);
    });
    $(this).addClass('clicked');
  }
  else //Overlay just removed
  {
    $(this).removeClass('clicked');
    var $id = $(this).attr("id");
    $("#"+$id+" .day-title").removeClass('recessed');
  }

  event.preventDefault(); //stop scroll to top of page
});


$(document).on("click", "#overlay, #overlayBox", function() {
  $("#overlay").remove();
  //$("#overlayBox").remove();
  //clickedDay.removeClass('clicked');
})
