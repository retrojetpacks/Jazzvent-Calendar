var date = 25;//new Date().getDate();
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
      //var $clickMe = $("<div></div>", {class:'clickMe'}).text("Click me!");
      var $clickMe = $("<div></div>", {class:'clickMe'}).text(dateArray[i]);
      $box.append($clickMe.clone());

      //Draw if date has passed
      if (date-1 < dateArray[i]) //Not sure why the -1..?
      {
        var R = (Math.random()+3)*40;
        var G = 0;
        var B = Math.random()*50;
        $content.css('background', 'rgb('+R+','+G+','+B+')')
        $box.append($content.clone());
      }

      $box.append($img.clone());
      $("#wrapper").append($box.clone());
    }
}




function drawSnow()
{
  var dateChaos = date;
  var Nsnow = 50 + 2 * dateChaos;
  var $BG = $(".backdrop")
  var $W = $BG.width()*1.2;
  var $sig = $W / 10;
  //var pageHeight = document.documentElement.scrollHeight;

  for (var i = 0; i < Nsnow; i++) {
    var $snow = $("<div></div>", {class: "snow", id: i});
    $snow.css("width",10+dateChaos/2);
    $snow.css("height",10+dateChaos/2);
    $BG.append($snow);

    var t_offset = 10 - dateChaos/3;
    var x = Math.random(i) * ($W+30*dateChaos) - $W/10 - dateChaos*30;
    var x2 = x + (Math.random(i)-0.5)*$sig + dateChaos*100;
    var t = t_offset + Math.random(i) * 5;
    var t2 = Math.random(i) * t_offset;

    $.keyframe.define([{
      name: 'fall'+i,
      '0%': { 'transform': 'translate('+x+'px,0px)'},
      '100%': { 'transform': 'translate('+x2+'px, 250vh)'}
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

function drawGround(){
  var snowHeight = 90 - date;
  $(".snow-floor").css("-ms-transform","translateY("+snowHeight+"%)");
  $(".snow-floor").css("-webkit-transform","translateY("+snowHeight+"%)");
  $(".snow-floor").css("-moz-transform","translateY("+snowHeight+"%)");
  $(".snow-floor").css("-o-transform","translateY("+snowHeight+"%)");
  $(".snow-floor").css("transform","translateY("+snowHeight+"%)");

  if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)
  {
    alert('Its Safari');
    $(".snow-floor").css("opacity","0");
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
  console.log(entry.artist);

  if (entry.artist == "Ella Fitzgerald") {
      console.log("Ella!");
      //var url25 = "https://youtu.be/94Hhu56EnAQ?list=PLhXMMSio319XXCPZJslETAaI-bj_HMgIF";
      //var $YouTube = $('<iframe id="myIframe" class="videoWrapper" src="' + url25 + '"autoplay=1></iframe>');
      var $YouTube = $('<iframe id="myIframe" class="videoWrapper" src="https://www.youtube.com/embed/94Hhu56EnAQ?list=PLhXMMSio319XXCPZJslETAaI-bj_HMgIF" autoplay=1></iframe>'); 
      $YouTube.appendTo($overlayContent);
      //<iframe width="1280" height="720" src="https://www.youtube.com/embed/94Hhu56EnAQ?list=PLhXMMSio319XXCPZJslETAaI-bj_HMgIF" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  }
  else
  {
      var url = "https://www.youtube.com/embed/" + entry.songLink;
      var $YouTube = $('<iframe id="myIframe" class="videoWrapper" src="' + url + '"autoplay=1></iframe>');
      $YouTube.appendTo($overlayContent);
  }
    

  for (var i=0; i<entry.bio.length; i++)
  {
    var $bio = $('<p class="overlayText">'+entry.bio[i]+'</p>');
    $bio.appendTo($overlayContent);
  }

  var $contributor = $('<p class="overlayText">'+entry.contributor+'</p>');
  $contributor.appendTo($overlayContent);

  if (entry.ps)
  {
    var $ps = $('<p class="overlayText">'+entry.ps+'</p>');
    $ps.appendTo($overlayContent);
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

  drawGround();
});


//Remove day title cards
$(document).on("click", ".day-title", function(){ //delegated binding, using on
  //clickedDay = $(this)

  var day = $(this).attr("id");
  if (date >= day)
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
      $.getJSON("jazzvent-database.json").done(function (data) {
      console.log(data.musicians[clickedDay.attr("id") - 1]); //JH
      displayOverlay(data.musicians[clickedDay.attr("id")-1]);
    });
    if (date> day)
    {
      $(this).addClass('clicked');
    }
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
