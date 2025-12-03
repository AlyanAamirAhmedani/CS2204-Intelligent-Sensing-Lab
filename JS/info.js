// All comments are mine for explanation purposes ~ Alyan Aamir AHMEDANI

/* PART 1: Rotating Text */
const promoMessages =[ // Array of promotional messages
    "Optical Sensing Division has 8 openings for PhD researchers!",
    "Bio-Sensing Group offers 5 internship positions!",
    "Smart Sensing Lab is looking for data analysts!"
];

const textElement = document.getElementById("promo-text");

function changeText() {
    const randomNumber = Math.floor(Math.random() * promoMessages.length);

    textElement.innerHTML = promoMessages[randomNumber]; // The promoMessages part with [] is used to select a random message from the array
}

setInterval(changeText, 3000); //To change messaege every 3 secs

changeText(); // Initial call to display a message immediately on page load

/* PART 2: Video Switcher */
const videoPlayer = document.getElementById("promo-video");

const video1 = "https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video1.mp4";
const video2 = "https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video2.mp4";

let isPlayingVideo1 = true; // To keep track of which video is playing: Starting with video1

videoPlayer.onended = function() {
    if (isPlayingVideo1 === true) { 
        videoPlayer.src = video2; //Allows us to switch to video2
        isPlayingVideo1 = false; // Updating flag
    } else {
        videoPlayer.src = video1; // if video2 just ended, switch back to video1
        isPlayingVideo1 = true; // Updating flag
    }

    videoPlayer.play();
};