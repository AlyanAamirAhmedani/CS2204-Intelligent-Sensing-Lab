# Intelligent Sensing Lab Website (CS2204)

This repository contains the complete coursework for **CS2204 Fundamentals of Internet Application Development**. The project is a fully functional, multi-page website designed for a fictional research laboratory ("Intelligent Sensing Lab").

This project demonstrates a full frontend development lifecycle, including semantic HTML structure, complex CSS styling (without modern frameworks), and dynamic JavaScript interactivity.

## 🚀 Project Overview

The website serves as an informational portal for the lab, allowing users to view research areas, watch promotional videos, book visits, and apply for internships using a complex ranking system.

## ✨ Key Features

### 🎨 Web Design & Layout (HTML5 / CSS3)
* **Multi-Page Architecture:** A complete site structure including Homepage, About, Apply, Visit, Information, Contact, and Design rationale pages.
* **Complex Layout Techniques:** Implemented multi-column layouts using **`float`** and **`display: inline-block`** to create responsive-like grids without using Flexbox or CSS Grid (per coursework constraints).
* **Consistent Styling:** A unified visual theme managed via `common.css`, featuring consistent navigation, headers, and footer styling across all pages.
* **Interactive UI:**
    * CSS-based hover effects on navigation bars and content cards.
    * Styled tables for displaying data.
    * Custom form layouts for user input.

### ⚡ Dynamic Functionality (JavaScript ES6)
* **Apply Page (`apply.js`):**
    * **Tab System:** Custom logic to switch between Research Divisions (Optical, Bio, Smart) dynamically.
    * **Ranking Engine:** A logic system allowing users to rank research groups.
    * **Validation:** Uses `Set` data structures to ensure no duplicate ranks or groups are selected.
    * **Gap Detection:** Algorithmic check to ensure users do not leave gaps in their ranking order (e.g., selecting 1 and 3 while skipping 2).
* **Visit Page (`visit.js`):**
    * **Form Validation:** Checks user inputs for dates, times, and visitor counts before submission.
    * **Feedback System:** Provides real-time, centered error or success messages to the user.
* **Info Page (`information.js`):**
    * **Video Looping:** Logic to automatically switch video sources when playback ends.
    * **Dynamic Banner:** A random text generator that rotates promotional messages every few seconds.

## 📂 Project Structure

This project is organized into specific folders.
/ ├── CSS/ # Stylesheets (common.css, apply.css, etc.) ├── CW1 Pages/ # HTML Webpages (index.html, apply.html, etc.) ├── image/ # Images and Icons ├── JS/ # JavaScript logic (information.js, visit.js, apply.js) └── README.md

### 💡 Note for the Reader
* **HTML Files:** All webpages are located inside the `CW1 Pages` folder.
* **Assets:** CSS, JS, and Images are located in their respective folders at the root level.

## 🛠️ Technologies Used

* **HTML5** (Semantic Tags, Forms, Tables, Media Elements)
* **CSS3** (Positioning, Floating, Box Model, Pseudo-classes)
* **JavaScript** (DOM Manipulation, Event Handling, ES6 Features)

## 👤 Author

**Alyan Aamir Ahmedani** City University of Hong Kong  
CS2204 - Semester A 2025-2026

---
*Disclaimer: This project is for educational purposes only. All images and text are used under fair use for academic assessment.*
