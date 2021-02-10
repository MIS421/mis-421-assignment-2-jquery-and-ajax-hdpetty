var len;
var results = '';

function apiSearch() {  //This function handles the main search function of the site.
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "ff7adacd96054ac681bd796b3f49d238");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }

      $('#searchResults').html(results);
        $('#searchResults').dialog();
        $('#searchResults').css('visibility', 'visible');
        $('#searchResults').css('font-size', '12px');
    })
    .fail(function () {
      alert("error");
    });
}

$(document).ready(function () { //This function adds a small adjustment to the appearance of the search dialog box.

    $('#searchResults').dialog({
        autoOpen: false,
        resizable: false,
        modal: true,
        width: '500px'
    });

    $('#searchButton').click(function () {
        $('#searchResults').dialog('open');
    });

});

var backgroundFlip = true;
function changeBackground() { //This function changes the background image back and forth when the search engine name is clicked. 
    if(backgroundFlip == true){
        $('#body').css('background-image', 'url(images/surprise.jpg)');
        backgroundFlip = false;
    }
    else {
        $('#body').css('background-image', 'url(images/background.jpg)');
        backgroundFlip = true;
    }

}

function showTime() { //This function retrieves the current time
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);     // add a zero in front of numbers<10 to keep hh:mm formatting
    document.getElementById('time').innerHTML = h + ":" + m;
    t = setTimeout(function () {
        startTime()
    }, 500);
    $('#time').css('visibility', 'visible');
}

function checkTime(i) { //This small function adjusts the appearance of the time to keep hh:mm formatting.
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

$(document).ready(function () { //This function shows the current time dialog box.

    $('#time').dialog({
        autoOpen: false,
        resizable: false,
        modal: true,
        width: '500px'
    });

    $('#timeButton').click(function () {
        $('#time').dialog('open');
    });

});