var scrs = ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/san-fransisco-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/london-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/new-york-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/cape-town-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/san-fransisco-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/london-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/new-york-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/cape-town-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/san-fransisco-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/london-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/new-york-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/cape-town-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/san-fransisco-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/london-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/new-york-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/cape-town-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/cape-town-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/san-fransisco-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/london-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/new-york-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/cape-town-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/san-fransisco-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/london-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/new-york-768x432.jpg",
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/cape-town-768x432.jpg"]

// //On click,
//Find ID of clicked object
//Add css to reveal the underneath.


var date = new Date();
var clickedDay;

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
        var $img = $("<img />", {class: "day-image", src: im});
      } catch (e) {
        var $img = $("<img />", {class: "day-image", src: scrs[dateArray[i]-1]});
      }

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
  var Nsnow = 25;
  var $snow = $("<div></div>", {class: "snow"});
  for (var i = 0; i < Nsnow; i++) {
    $(".backdrop").append($snow.clone());
  }
}

function displayOverlay(entry)
{
  //alert(entry.musicians[0].artist);
  var $overlay = $('<div id="overlay"> </div>');
  var $overlayBox = $('<div id="overlayBox"> </div>');
  var $overlayContent = $('<div> </div>');

  var $name = $('<h2 class="overlayTextTitle">'+entry.artist+'</h2>');
  $name.appendTo($overlayContent);

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
  //==== Load JSON data ====//
  var obj = $.getJSON("jazzvent-database.json").done(function (data){
  drawBoxes(data);
  });

  //==== draw snow effects ==//
  drawSnow();
});



//$(".day-title").click(function(){ //direct binding
$(document).on("click", ".day-title", function(){ //delegated binding, using on

  //Box already clicked and revealed
  if ($(this).hasClass('clicked'))
  {
    clickedDay = $(this)

    $.getJSON("jazzvent-database.json").done(function (data){
      displayOverlay(data.musicians[clickedDay.attr("id")-1]);
    });
  }
  else //Box not clicked
  {
    var day = $(this).attr("id");
    if (date.getDate()-10 >= day) //for testing
    {
      $(this).toggleClass('faded');
      if ($(this).hasClass('faded'))
      {
        $(this).toggleClass('clicked');
      }
    }
  }
  //alert($(this).attr("class"));

  event.preventDefault(); //stop scroll to top of page
});


$(document).on("click", "#overlay, #overlayBox", function() {
  $("#overlay").remove();
  $("#overlayBox").remove();
  clickedDay.removeClass('clicked');
})
