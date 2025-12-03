// =================================================================
// GLOBALS: Tracking Variables for Ranking
// =================================================================

// ES6 Requirement: Sets are used to enforce uniqueness.
// They automatically prevent the user from choosing the same Rank or the same Group twice.
const chosenRanks = new Set();
const chosenGroups = new Set();
const maxRank = 10; // Max number of choices allowed [cite: 581]

// Get final elements once
const tableBody = document.getElementById("rank-table-body");
const rankButtons = document.querySelectorAll(".rank-btn");
// The choicesCounter now tracks the number of filled slots
const choicesCounter = document.getElementById("choices-counter"); 

const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const submissionMsg = document.getElementById("submission-message");

// Array to hold the current application data, indexed by rank (0 to 9)
// Each element will store an object: {division: '...', group: '...'} or null
const applicationData = new Array(maxRank).fill(null);


// =================================================================
// PART 0: INITIALIZATION (NEW)
// =================================================================

/**
 * Initializes the table with 10 fixed rows, displaying only the rank number.
 * This function must be called once when the page loads.
 */
function initializeTable() {
    tableBody.innerHTML = ''; // Clear existing content
    for (let i = 1; i <= maxRank; i++) {
        // Creates a fixed row for rank i (1 to 10)
        const newRow = tableBody.insertRow();
        newRow.id = `rank-row-${i}`; // Assign a unique ID for easy lookup
        
        // Division and Group cells are empty initially
        newRow.innerHTML = `
            <td id="div-cell-${i}"></td> 
            <td id="group-cell-${i}"></td>
            <td>${i}</td>
        `;
    }
    // Set initial total count to 0
    choicesCounter.textContent = `Total Number of Groups Applied: 0`;
}

// Call initialization on load to set up the fixed table structure
document.addEventListener('DOMContentLoaded', initializeTable);


// =================================================================
// PART 1: THE TAB SYSTEM LOGIC (Keep unchanged for brevity)
// =================================================================

const tabHeads = document.querySelectorAll(".tab-head");
const tabContents = document.querySelectorAll(".tab-content");

tabHeads.forEach(function(clickedHead, index) {
    clickedHead.addEventListener("click", function() {
        tabContents.forEach(content => {
            content.style.display = "none";
        });
        tabHeads.forEach(head => {
            head.style.backgroundColor = "";
        });

        tabContents[index].style.display = "block";
        clickedHead.style.backgroundColor = "white"; 
    });
});


// =================================================================
// PART 2: THE RANKING SYSTEM LOGIC (RESTRUCTURED)
// =================================================================

/**
 * Validates the rank input and group status against rules (pseudocode alignment)
 * @param {number} rank - The chosen rank (1-10)
 * @param {string} groupName - The name of the group
 * @returns {boolean} True if all checks pass, false otherwise.
 */
function validateChoice(rank, groupName) {
    
    // 1. Check if rank is an integer input and within 1 and 10 [cite: 574, 580, 581, 592, 594]
    // NOTE: isNaN(rank) check handles empty/non-numeric input after parseInt
    if (isNaN(rank) || rank < 1 || rank > maxRank) {
        // If the rank input is not a number OR it's outside the [1, 10] range
        if (isNaN(rank)) {
             // For empty/non-integer input [cite: 567, 593]
            alert("Please enter the rank of chosen group");
        } else {
             // For invalid range [cite: 568, 582, 594]
            alert(`Please enter the rank of chosen group between 1 and ${maxRank}`);
        }
        return false;
    }

    // 2. Check for duplicate group [cite: 558, 595]
    if (chosenGroups.has(groupName)) {
        alert("You have already chosen this group."); // [cite: 558, 561]
        return false;
    }
    
    // 3. Check for duplicate rank [cite: 553, 596]
    if (chosenRanks.has(rank)) {
        alert("You have already chosen this rank"); // [cite: 556]
        return false;
    }
    
    return true; // All checks passed
}

/**
 * Handles the logic when a "rank of choice" button is clicked.
 */
function handleRankChoice() {
    const btn = this; // 'this' refers to the clicked button
    const currentRankInput = btn.parentElement.querySelector('input[type="number"]');
    
    // Attempt to convert the input value to an integer
    const rank = parseInt(currentRankInput.value.trim()); 
    
    const groupName = btn.dataset.group;
    const divisionName = btn.dataset.division;

    // --- B. VALIDATION ---
    if (!validateChoice(rank, groupName)) {
        return; // Stop if validation fails
    }

    // --- C. SUCCESS: Update State & Table ---

    // 1. Track the choice (using Sets) [cite: 597]
    chosenGroups.add(groupName);
    chosenRanks.add(rank);

    // 2. Update the application data array (rank - 1 for 0-based index)
    applicationData[rank - 1] = {
        division: divisionName,
        group: groupName,
        rank: rank // Redundant but useful for logging
    };
    
    // 3. Update the specific row in the HTML table [cite: 525]
    const divCell = document.getElementById(`div-cell-${rank}`);
    const groupCell = document.getElementById(`group-cell-${rank}`);
    
    if (divCell && groupCell) {
        divCell.textContent = divisionName;
        groupCell.textContent = groupName;
    }

    // 4. Update the total number of choices display
    updateTable(); // Replaced old counter update with a dedicated function [cite: 598]

    // 5. Show the success ALERT [cite: 543]
    const suffix = (rank === 1) ? "st" : (rank === 2) ? "nd" : (rank === 3) ? "rd" : "th";
    alert(`You have chosen ${groupName} as your ${rank}${suffix} chosen group in ${divisionName} successfully`);
    
    // 6. Clear the input box after successful submission
    currentRankInput.value = '';
}

// 1. Attach click listener to every "rank of choice" button
rankButtons.forEach(btn => {
    btn.addEventListener("click", handleRankChoice);
});

/**
 * Calculates the Total Number of Groups Applied and updates the counter display.
 * This stands in for a dedicated updateTable() function required by instructions[cite: 598].
 */
function updateTable() {
    const totalApplied = chosenRanks.size;
    // We only update the counter text for the Total Number of Groups Applied [cite: 598]
    choicesCounter.textContent = `Total Number of Groups Applied: ${totalApplied}`; 
    // You could optionally add logic here to display the "Last change time" if your HTML includes that element.
}


// =================================================================
// PART 3: SUBMIT AND RESET LOGIC (UPDATED)
// =================================================================


// --- A. SUBMIT BUTTON LOGIC (Gap Check) ---
submitBtn.addEventListener("click", function() {
    // Clear previous message [cite: 623]
    submissionMsg.innerHTML = ""; 
    submissionMsg.style.color = "red"; 

    // 1. CONVERT AND SORT: Get only the ranks that have been chosen
    const ranksArray = Array.from(chosenRanks).sort((a, b) => a - b); 

    // 2. CHECK FOR EMPTY APPLICATION [cite: 624]
    if (ranksArray.length === 0) {
        // Display message using innerHTML (not alert) 
        submissionMsg.innerHTML = "You have not chosen any group."; 
        return;
    }
    
    // 3. CHECK FOR GAPS (The Core Logic) [cite: 632]
    for (let i = 0; i < ranksArray.length; i++) {
        const actualRank = ranksArray[i];
        const expectedRank = i + 1; // Expected ranks must be sequential: 1, 2, 3...
        
        // If the rank found is not the expected one (e.g., found 3 when expecting 2)
        if (actualRank !== expectedRank) {
            // Find the missing rank, which is the expected rank
            const missingRank = expectedRank; 
            
            // Format the ordinal suffix for the missing rank
            const suffix = (missingRank === 1) ? "st" : (missingRank === 2) ? "nd" : (missingRank === 3) ? "rd" : "th";
            
            // Display gap error message [cite: 674, 675]
            submissionMsg.innerHTML = `You have not chosen your ${missingRank}${suffix} chosen group, you can not leave a gap between your chosen groups`;
            return; // Stop and display error
        }
    }

    // 4. SUCCESS: If the loop finishes, no gaps were found. [cite: 676]
    const timestamp = new Date().toLocaleTimeString();
    submissionMsg.innerHTML = `You have successfully submitted your application at time ${timestamp}`; // [cite: 677]
    submissionMsg.style.color = "green";
});


// --- B. RESET BUTTON LOGIC ---
resetBtn.addEventListener("click", function() {
    
    // 1. Reset the tracking variables (Sets)
    chosenRanks.clear();
    chosenGroups.clear();
    
    // 2. Reset the application data array
    applicationData.fill(null);
    
    // 3. Re-initialize the table (clears the content cells)
    initializeTable(); // Re-creates the 1-10 rows with blank group/division columns
    
    // 4. Reset the message area
    submissionMsg.innerHTML = "";
    submissionMsg.style.color = "black";
});