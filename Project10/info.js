/**
  Name: Karim Sammouri
  Instructor: Dr. Kurt Johnson
  Class: CSE 383B
  Assignment: Homework 10
  Date: Nov 3, 2021
*/
var urlBase="https://api.clearllc.com/api/v2/math/";
var urlKey="api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818";
var number1;
var number2;

function add() {
  number1=$("#number1").val();
  number2=$("#number2").val();
  a=$.ajax({
    url: urlBase+"add?"+urlKey+"&n1="+number1+"&n2="+number2,
    method: "GET"
  }).done(function(data) {
    $("#result").val(data.result);
  }).fail(function(error) {
    $("#result").val("Error");
    console.log("error", error.statusText);
  });
}

function subtract() {
  number1=$("#number1").val();
  number2=$("#number2").val();
  a=$.ajax({
    url: urlBase+"subtract?"+urlKey+"&n1="+number1+"&n2="+number2,
    method: "GET"
  }).done(function(data) {
    $("#result").val(data.result);
  }).fail(function(error) {
    $("#result").val("Error");
    console.log("error", error.statusText);
  });
}

function divide() {
  number1=$("#number1").val();
  number2=$("#number2").val();
  a=$.ajax({
    url: urlBase+"divide?"+urlKey+"&n1="+number1+"&n2="+number2,
    method: "GET"
  }).done(function(data) {
    $("#result").val(data.result);
  }).fail(function(error) {
    $("#result").val("Error");
    console.log("error", error.statusText);
  });
}

function multiply() {
  number1=$("#number1").val();
  number2=$("#number2").val();
  a=$.ajax({
    url: urlBase+"multiply?"+urlKey+"&n1="+number1+"&n2="+number2,
    method: "GET"
  }).done(function(data) {
    $("#result").val(data.result);
  }).fail(function(error) {
    $("#result").val("Error");
    console.log("error", error.statusText);
  });
}



