const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const filters = document.querySelectorAll(".filters input[type=radio]");
let appliedFilter = "noFilter";

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      //   console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((error) => {
      console.error("Oh no!", error);
    });
}
let isSplitOn = false;
let isRedOn = false;
let isGreenscreenOn = false;

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    ctx.filter = "none";
    let pixels = ctx.getImageData(0, 0, width, height);
    if (appliedFilter == "noFilter") {
      return;
    } else if (appliedFilter === "redFilter") {
      pixels = redEffect(pixels);
    } else if (appliedFilter === "splitFilter") {
      pixels = rgbSplit(pixels);
    } else if (appliedFilter === "greyFilter") {
      // pixels = greyEffect(pixels);
      ctx.filter = "grayscale(100%";
    } else if (appliedFilter === "greenscreenFilter") {
      pixels = greenScreen(pixels);
    } else if (appliedFilter === "blurFilter") {
      ctx.filter = "blur(4px)";
    } else if (appliedFilter === "invertFilter") {
      ctx.filter = "invert(100%)";
    } else if (appliedFilter === "sepiaFilter") {
      ctx.filter = "sepia(100%)";
    }
    ctx.globalAlpha = 0.8; /*creates a ghost effect */

    // ;
    // put them back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // play sound
  snap.currentTime = 0;
  snap.play();

  // take data out of canvas
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute(
    "download",
    "photo"
  ); /*downloads image to pc with name of "photo" */
  link.innerHTML = `<img src="${data}" alt="snapshot"/>`;
  // link.textContent = "Download image"; /* text displayed with link to photo */
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.85; // Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    /* moves the pixels of a certain color to new position */
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

// function greyEffect(pixels) {
//   for (let i = 0; i < pixels.data.length; i += 4) {
//     const average =
//       (pixels.data[i + 0] + pixels.data[i + 1] + pixels.data[i + 2]) / 3;
//     pixels.data[i + 0] = average; // RED
//     pixels.data[i + 1] = average; // GREEN
//     pixels.data[i + 2] = average; // Blue
//   }
//   return pixels;
// }

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll(".rgb input").forEach((input) => {
    levels[input.name] = input.value;
  });

  for (let i = 0; i < pixels.data.length; i = i + 4) {
    let red = pixels.data[i + 0];
    let green = pixels.data[i + 1];
    let blue = pixels.data[i + 2];
    let alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // take it out!
      pixels.data[i + 3] = 0; /* makes alpha pixel totally transparent */
    }
  }

  return pixels;
}
function filterHandler(event) {
  appliedFilter = event.currentTarget.id;
}

getVideo();

video.addEventListener(
  "canplay",
  paintToCanvas
); /* this listen to video and when it can play it paints the video to the canvas */

filters.forEach((filter) => filter.addEventListener("change", filterHandler));
