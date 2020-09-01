// video
const video = document.querySelector(".player");

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

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

function getAnswer(event) {
  const transcript = Array.from(event.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("")
    .toLowerCase();
  console.log(transcript);
  console.log(event.results[0].isFinal);
  let p = document.createElement("p");
  const answer = document.querySelector(".answer");
  answer.innerHTML = "";

  if (event.results[0].isFinal) {
    if (transcript.toLowerCase().includes("who")) {
      p.textContent = "You are the answer to all life's greatest questions.";
    }
    if (transcript.toLowerCase().includes("what")) {
      p.textContent =
        "That is a mysterious thing, whose answer lies in the stars";
    }
    if (transcript.includes("where")) {
      p.textContent = "Your answer lies at the end of a long journey";
    }
    if (transcript.includes("why")) {
      p.textContent = "Life works in the most mysterious ways.";
    }
    if (transcript.includes("when")) {
      p.textContent = "The moment will arrive when the moment is ready.";
    }
    answer.appendChild(p);
  }
}

recognition.addEventListener("result", getAnswer);
recognition.addEventListener("end", recognition.start);

recognition.start();

getVideo();

// audio
