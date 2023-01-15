/**
Name: Karim Sammouri
Instructor: Dr. Kurt Johnson
Class: CSE381B
Assignment: Lab 10
Date: Nov 2, 2021
*/
var loadavg="https://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php/vi/api/loadavg";
var network="https://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php/vi/api/network";
var ps="https://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php/vi/api/ps";
var previousTxbytes;
var previousRxbytes;
var psCounter=0;
var loadCounter=0;
var networkCounter=0;
var errorCounter=0;
getPs();
getLoad();
getNetwork();

function getPs() {
  a=$.ajax({
    url: ps,
    method: "GET"
  }).done(function(data) {
    psCounter++;
    len = data.ps.length;
    $("#processRun").html(psCounter);
    $("#processes").html("");
    for (i=0;i<len;i++) {
      $("#processes").append("<tr><td>"+data.ps[i].user+"</td><td>"+data.ps[i].pid+"</td><td>"+data.ps[i].runTime+"</td><td>"+data.ps[i].cmd+"</td></tr>");
    }
    setTimeout(getPs, 1000);
  }).fail(function(error) {
    errorCounter++;
    $("#logRun").html(errorCounter);
    console.log("error",error.statusText);
    $("#log").prepend("ps error "+new Date()+"<br>");
    setTimeout(getPs, 1000);
  });
}

function getLoad() {
  a=$.ajax({
    url: loadavg,
    method: "GET"
  }).done(function(data) {
    loadCounter++;
    $("#loadRun").html(loadCounter);
    $("#onemin").html(data.loadavg.OneMinAvg);
    $("#fivemin").html(data.loadavg.FiveMinAvg);
    $("#fifteenmin").html(data.loadavg.FifteenMinAvg);
    $("#numRunning").html(data.loadavg.NumRunning);
    $("#ttlProc").html(data.loadavg.TtlProcesses);
    setTimeout(getLoad, 1000);
  }).fail(function(error) {
    errorCounter++;
    $("#logRun").html(errorCounter);
    console.log("error",error.statusText);
    $("#log").prepend("loadavg error "+new Date()+"<br>");
    setTimeout(getLoad, 1000);
  });
}

function getNetwork() {
  a=$.ajax({
    url: network,
    method: "GET"
  }).done(function(data) {
    networkCounter++;
    $("#networkRun").html(networkCounter);
    $("#txbytes").html(data.network.txbytes);
    $("#txavg").html(data.network.txbytes - previousTxbytes);
    $("#rxbytes").html(data.network.rxbytes);
    $("#rxavg").html(data.network.rxbytes- previousRxbytes);
    setTimeout(getNetwork, 1000);
    previousTxbytes = data.network.txbytes;
    previousRxbytes = data.network.rxbytes;
  }).fail(function(error) {
    errorCounter++;
    $("#logRun").html(errorCounter);
    console.log("error",error.statusText);
    $("#log").prepend("network error "+new Date()+"<br>");
    setTimeout(getNetwork, 1000);
  });
}
