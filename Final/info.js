/*
  Name: Karim Sammouri
  Instructor: Dr. Kurt Johnson
  Class: CSE 383B
  Assignment: Final Project
  Date: Nov 30, 2021
*/

var directionsURL = "http://www.mapquestapi.com/directions/v2/route";
var geocodingURL = "http://www.mapquestapi.com/geocoding/v1/address";
var elevationURL = "http://open.mapquestapi.com/elevation/v1/chart";
var databaseURL = "http://sammouka.aws.csi.miamioh.edu/final.php";
var url;
var apiKey = "loWGIUaCFLACRYfK7uiXgAHUGtCFdGZc";
var addressFrom;
var addressTo;
var maneuvers;
var length;
var narrative;
var distance;
var time;
var thumbnail;
var result;
var longitude1;
var latitude1;
var longitude2;
var latitude2;
var obj = {};
var strJSON;
var date;
var time;
var maxLines;

function navigate() {
  $("#result").empty();

  addressFrom=$("#fromAddress").val();
  addressTo=$("#toAddress").val();
  url = directionsURL + "?key=" + apiKey + "&from=" + addressFrom + "&to=" + addressTo;

  a=$.ajax({
    url: url,
    method: "GET"
  }).done(function(data) {
    try {
      maneuvers = data.route.legs[0].maneuvers;}
    catch {
        $("#result").append("At least one of the addresses is invalid. Please try again.");
        throw new Error("Program terminated due to invalid address");
    }
    length = maneuvers.length;
    for (i = 0; i < length; i++) {
      narrative = maneuvers[i].narrative;
      distance = maneuvers[i].distance;
      time = maneuvers[i].time;
      if (i != length - 1)
        thumbnail = maneuvers[i].mapUrl;
      result = narrative + " The distance is " + distance + " miles. You will arrive in " + time +
        " seconds.<br><img src='" + thumbnail + "'><br><br>";
      $("#result").append(result);
    }

    url = geocodingURL + "?key=" + apiKey + "&location=" + addressFrom;

    b=$.ajax({
      url: url,
      method: "GET"
    }).done(function(data) {
      latitude1 = data.results[0].locations[0].displayLatLng.lat;
      longitude1 = data.results[0].locations[0].displayLatLng.lng;

      url = geocodingURL + "?key=" + apiKey + "&location=" + addressTo;

      c=$.ajax({
        url: url,
        method: "GET"
      }).done(function(data) {
        latitude2 = data.results[0].locations[0].displayLatLng.lat;
        longitude2 = data.results[0].locations[0].displayLatLng.lng;

        url = elevationURL + "?key=" + apiKey + "&width=400&height=300&latLngCollection=" +
        latitude1 + "," + longitude1 + "," + latitude2 + "," + longitude2;
        $("#result").append("<img src='" + url + "'><br><br>");

        obj.maneuvers = maneuvers;
        obj.addressFrom = addressFrom;
        obj.addressTo = addressTo;
        obj.elevationURL = url;
        strJSON = JSON.stringify(obj);

        e=$.ajax({
            url: databaseURL,
            method: "POST",
            data: {method: "setLookup", location: "45056", sensor: "web", value: strJSON}
          }).done(function(data) {
          }).fail(function(error) {
            console.log("error", error.statusText);
          });
      }).fail(function(error) {
        console.log("error", error.statusText);
      });
    }).fail(function(error) {
      console.log("error", error.statusText);
    });
  }).fail(function(error) {
    console.log("error", error.statusText);
  });
}

function loadData() {
  $("#historyResult").empty();

  date = $("#date").val();
  maxLines = $("#maxLines").val();

  a=$.ajax({
    url: databaseURL,
    method: "POST",
    data: {method: "getLookup", date: date}
  }).done(function(data) {
    $("#historyResult").append(data);
    $("#historyResult").append("<table>");
    $("#historyResult").append("<tr>");
    $("#historyResult").append("<th>Date&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>");
    $("#historyResult").append("<th>Time&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>");
    $("#historyResult").append("<th>From&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>");
    $("#historyResult").append("<th>To&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>");
    $("#historyResult").append("<th>Maneuvers&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>");
    $("#historyResult").append("<th>Details&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</th>");
    $("#historyResult").append("</tr>");
    for (i = 0; (data.result.length < maxLines) ? (i < data.result.length) : (i < maxLines); i++) {
      time = data.result[i].date.substring(data.result[i].date.indexOf(" ") + 1);
      obj = JSON.parse(data.result[i].value);
      addressFrom = obj.addressFrom;
      addressTo = obj.addressTo;
      length = obj.maneuvers.length;
      $("#historyResult").append("<tr>");
      $("#historyResult").append("<th>" + date + "</th>");
      $("#historyResult").append("<th>" + time + "</th>");
      $("#historyResult").append("<th>" + addressFrom + "</th>");
      $("#historyResult").append("<th>" + addressTo + "</th>");
      $("#historyResult").append("<th>" + length + "</th>");
      $("#historyResult").append("<th><button type='button' class='btn btn-primary' onclick='navigateLocal(" + i + ");'>Details</button></th>");
      $("#historyResult").append("</tr>");
    }
    $("#historyResult").append("</table>");
  }).fail(function(error) {
    console.log("error", error.statusText);
  });
}

function navigateLocal(index) {
  a=$.ajax({
    url: databaseURL,
    method: "POST",
    data: {method: "getLookup", date: date}
  }).done(function(data) {
    $("#historyResult").empty();
    obj = JSON.parse(data.result[index].value);
    length = obj.maneuvers.length;
    for (i = 0; i < length; i++) {
      narrative = obj.maneuvers[i].narrative;
      distance = obj.maneuvers[i].distance;
      time = obj.maneuvers[i].time;
      if (i != length - 1)
        thumbnail = obj.maneuvers[i].mapUrl;
      result = narrative + " The distance is " + distance + " miles. You will arrive in " + time +
        " seconds.<br><img src='" + thumbnail + "'><br><br>";
      $("#historyResult").append(result);
      }
      url = obj.elevationURL;
      $("#historyResult").append("<img src='" + url + "'><br><br>");
  }).fail(function(error) {
    console.log("error", error.statusText);
  });
}

