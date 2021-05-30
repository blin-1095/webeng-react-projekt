import React, { Component } from "react";

var location = undefined;

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  let crd = pos.coords;
  console.log(crd)
  location = {
    latitude: crd.latitude,
    longitude: crd.longitude
  }
}

function errors(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

async function getLocation() {

        if (navigator.geolocation) {
        navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
            if (result.state === "granted") {
                //If granted then you can directly call your function here
                navigator.geolocation.getCurrentPosition(success);
            } else if (result.state === "prompt") {
                navigator.geolocation.getCurrentPosition(success, errors, options);
            } else if (result.state === "denied") {
                //If denied then you have to show instructions to enable location
            }
            result.onchange = function () {
                console.log(result.state);
                getLocation();
            };
            });
        } else {
        alert("Sorry Not available!");
        }
        return location;
  }

  export default getLocation;