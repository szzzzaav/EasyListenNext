"use client";

let WIDTH = 0;
if (window.innerHeight >= 800) {
  WIDTH = 500;
} else if (window.innerHeight >= 550) {
  WIDTH = 450;
} else if (window.innerWidth >= 440) {
  WIDTH = 400;
} else {
  WIDTH = 250;
}

export default WIDTH;
