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


function display_info(id)
{
    //get ID
    //alert(id);
    //Use ID to look up info from csv..?

    //initiate dropdown box...
}



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


function drawBoxes()
{
  var dateArray = setup_dateArray();
    for (var i = 0; i < dateArray.length; i++) {
      var $box = $("<article></article>", {class: 'day', id: dateArray[i]});
      var $content = $("<a />", {class: 'day-title', href: '#'}).text(dateArray[i]);
      var $img = $("<img />", {class: "day-image", src: scrs[dateArray[i]-1]});

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

$(document).ready(function () {
  drawBoxes();
  drawSnow();
});



//$(".day-title").click(function(){ //direct binding
$(document).on("click", ".day-title", function(){ //delegated binding, using on
  $(this).toggleClass('faded');
  //alert($(this).attr("class"));
  display_info($(this).attr("id"));
});
