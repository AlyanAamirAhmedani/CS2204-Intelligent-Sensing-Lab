// Selecting elements from HTML
const checkBtn = document.getElementById("check-btn");
const resetBtn = document.getElementById("reset-btn");
const msgBox = document.getElementById("message-box");

const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const visitorInput = document.getElementById("visitors");

// Defining the check func.
checkBtn.addEventListener("click", function() {

const dateVal = dateInput.value;
const timeVal = timeInput.value;
const visitorVal = visitorInput.value.trim(); // .trim() to clear whitespaces

msgBox.innerHTML = "";
msgBox.style.color = "black";

if (dateVal === "" || timeVal === "" || visitorVal === "") {
    msgBox.innerHTML = "Data not completed; please re-enter";
    msgBox.style.color = "red";
    return;
}

const visitorNum = parseInt(visitorVal);

if (isNaN(visitorNum) || !Number.isInteger(visitorNum) || visitorNum <= 0 ) {
    msgBox.innerHTML = "Please enter a valid number of people!";
    msgBox.style.color = "red";
    return;
}

const isSuccess = reserve(dateVal, timeVal, visitorNum);

if (isSuccess === true) {
    alert("Your reservation is successful!");
} else {
    alert("Sorry, the reservation is full!");
}
});

//Defining the reset button

resetBtn.addEventListener("click", function() {
    msgBox.innerHTML = "";
})
