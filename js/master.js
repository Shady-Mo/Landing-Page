function findCssRule(selectorString) {
    // helper function searches through the document stylesheets looking for selectorString
    // will also recurse through sub-rules (such as rules inside media queries)
    function recurse(node, selectorString) {
        if (node.cssRules) {
            for (var i = 0; i < node.cssRules.length; i++) {
                if (node.cssRules[i].selectorText == selectorString) {
                    return node.cssRules[i].style;
                }
                if (node.cssRules[i].cssRules) {
                    var found = recurse(node.cssRules[i], selectorString);
                    if (found) return found;
                }
            }
        }
        return false;
    }
    
    for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];
        if (sheet.cssRules) {
            var found = recurse(sheet,selectorString);
            if (found) return found;
        }
    }
    
    return false;
}

/* Start Side Bar Actions */

// Select Settings Box Element
let settingBox = document.querySelector("div.settings-box");

// Select Trigger Element
let trigger = document.querySelector("div.settings-box .trigger");

// Make Event When Click On Trigger Element
trigger.onclick = function(event) {
    // Toggle Open Class Name
    settingBox.classList.toggle("open");

    //Make Gear Rotate 360deg
    let gear = trigger.firstElementChild;
    if (settingBox.classList.contains("open")) {
        gear.style.setProperty("animation-name", "cycle");
    }
    else {
        gear.style.removeProperty("animation-name");
    }
}

// Select Colors List Items
let colorsItems = document.querySelectorAll("aside .settings-box .box .settings-container ul li");

// Set Default To Main Color From Local Storage
let mainColor = window.localStorage.getItem("main-color");
if (mainColor) {
    colorsItems.forEach((item) => {
        if (item.dataset.color === mainColor) {
            // Set Clicked Element
            item.classList.add("active");
            // Make a Mark On Clicked Element
            item.innerHTML = '<i class="fa fa-check"></i>';
            // Set Main Color To Color Of Clicked Element
            document.documentElement.style.setProperty("--main-color", item.dataset.color);
        }
    });
}
else {
    let item = colorsItems[0];
    // Set Clicked Element
    item.classList.add("active");
    // Make a Mark On Clicked Element
    item.innerHTML = '<i class="fa fa-check"></i>';
    // Set Main Color To Color Of Clicked Element
    document.documentElement.style.setProperty("--main-color", item.dataset.color);
}

// Make Event When Click On Colors List Items
colorsItems.forEach((item) => {
    item.onclick = function() {
        // Get Clicked Element
        let element = item;
        // Clear All
        for (let i = 0; i < colorsItems.length; i++) {
            colorsItems[i].classList.remove("active");
            colorsItems[i].innerHTML = '';
        }
        // Set Clicked Element
        element.classList.add("active");
        // Make a Mark On Clicked Element
        element.innerHTML = '<i class="fa fa-check"></i>';
        // Set Main Color To Color Of Clicked Element
        document.documentElement.style.setProperty("--main-color", element.dataset.color);
        // Set Color To Local Storage
        window.localStorage.setItem("main-color", element.dataset.color);
    }
});

/* End Side Bar */

/* Start Header Actions */

// Select Images
let imgsArr = ["../images/Coding.jpg", "../images/CSS_Coding.jpg", "../images/Laptop.jpg", "../images/NoteBook.jpg"];
// Get Items Of Random Backgrounds
let randomBackgrounds = document.querySelectorAll("aside .settings-box .box .settings-container .option-box div p");
// Select Header Selector From CSS File
let headerSelector = findCssRule("header");
// Selector Variable
let selector;
// ID Of Set Interval For change Background Function
let backgroundInterval;
// Set Default To Background Image From Local Storage
let backgroundSelector = window.localStorage.getItem("background-selector");
if (backgroundSelector) {
    randomBackgrounds.forEach((item) => {
        item.classList.remove("active");
        if (item.dataset.backgroundSelector === backgroundSelector) {
            // Set Clicked Element
            item.classList.add("active");
        }
    });
    // Set Last Selected Image To Background
    headerSelector.setProperty("background-image", `url(${window.localStorage.getItem("background-image")})`);
    // Set Default To Selector
    selector = backgroundSelector;
}
else {
    let item = randomBackgrounds[0];
    // Set Clicked Element
    item.classList.add("active");
    // Set Default To Selector
    selector = "yes";
}

// Make Event When Click On Random Backgrounds Items
randomBackgrounds.forEach((item) => {
    item.onclick = function() {
        let elements = randomBackgrounds;
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove("active");
        }
        // Add Active Class Name To Clicked Selector
        item.classList.add("active");
        // Set Background Image Selector To Local Storage
        window.localStorage.setItem("background-selector", item.dataset.backgroundSelector);
        // Set Item Selector To Selector Variable
        selector = item.dataset.backgroundSelector;
        // Check If Random Background Selected Or Not
        if (selector === "yes") {
            // Do Function After Every 10s
            backgroundInterval = setInterval(changeBackground, 10000);
        }
        else {
            window.clearInterval(backgroundInterval);
        }
    }
});

// Change Background Images Funciton
function changeBackground() {
    // Get Image URL
    let url = headerSelector.getPropertyValue("background-image");
    url = url.substring(url.indexOf('"') + 1, url.lastIndexOf('"'));
    // Get Random Image
    let index;
    let prevIndex = imgsArr.indexOf(url);
    do {
        index = Math.floor(Math.random() * imgsArr.length);
    } while (index === prevIndex)
    headerSelector.setProperty("background-image", `url(${imgsArr[index]})`);
    // Set Last Background Image URL To Local Storage
    window.localStorage.setItem("background-image", imgsArr[index]);
}

if (selector === "yes") {
    // Do Function After Every 10s
    backgroundInterval = setInterval(changeBackground, 10000);
}

/* End Header Actions */

/* Start Main */

// Select Skills Element
let ourSkills = document.querySelector("main .our-skills .container .skills");

// Select Skills Progress Items
let skillsProgress = document.querySelectorAll("main .our-skills .container .skills .skill-box .skill-progress");
// Get The Amount Of Scrolling To reach The Top Of Our Skills Element
let ourSkillsOffsetTop = ourSkills.offsetTop;
// For Checking counter
let doneCounter = false;

// Make Event When Scrolling
window.onscroll = function() {
    if (window.scrollY >= ourSkillsOffsetTop - 650) {
        skillsProgress.forEach((item) => {
            // Get Skill Name
            let skillName = item.classList[1];
            // Get After Selector For Each Element
            let elementAfter = findCssRule(`main section .container .skills .skill-box .${skillName}::after`);
            // Get Amount Of Width For Each Element
            let elementWidth = item.dataset.progress;
            elementAfter.setProperty("width", elementWidth);
            // Check If Counter Is Written Or Not
            if (!doneCounter) {
                // Get Before Selector For Each Element
                let elementBefore = findCssRule(`main section .container .skills .skill-box .${skillName}::before`);
                let count = 0;
                let targetCount = elementWidth.substring(0, elementWidth.length - 1);
                let duration = 1550;
                let intervalTime = duration / targetCount;
                // Function to update counter
                function updateCounter() {
                    count++;
                    elementBefore.setProperty("content", `'${count}%'`);
                    if (count < targetCount) {
                        // Continue updating until the target count is reached
                        setTimeout(updateCounter, intervalTime);
                    }
                }
                // Start the counter
                setTimeout(updateCounter, intervalTime);
            }
        });
        doneCounter = true;
    }
}

if (window.scrollY >= ourSkillsOffsetTop - 650) {
    skillsProgress.forEach((item) => {
        // Get Skill Name
        let skillName = item.classList[1];
        // Get After Selector For Each Element
        let elementAfter = findCssRule(`main section .container .skills .skill-box .${skillName}::after`);
        // Get Amount Of Width For Each Element
        let elementWidth = item.dataset.progress;
        // elementAfter.style.setProperty("width", "20px");
        elementAfter.setProperty("width", elementWidth);
        // Check If Counter Is Written Or Not
        if (!doneCounter) {
            // Get Before Selector For Each Element
            let elementBefore = findCssRule(`main section .container .skills .skill-box .${skillName}::before`);
            let count = 0;
            let targetCount = elementWidth.substring(0, elementWidth.length - 1);
            let duration = 1550;
            let intervalTime = duration / targetCount;
            // Function to update counter
            function updateCounter() {
                count++;
                elementBefore.setProperty("content", `'${count}%'`);
                if (count < targetCount) {
                    // Continue updating until the target count is reached
                    setTimeout(updateCounter, intervalTime);
                }
            }
            // Start the counter
            setTimeout(updateCounter, intervalTime);
        }
    });
    doneCounter = true;
}

// Get All Images Of Gallery
let ourGalleryImages = document.querySelectorAll("main section .container .images-box .scrolling-images img");
// Canceling Click If Dragging Is Executed
let clickCancel = false;
ourGalleryImages.forEach((item) => {
    item.onclick = function(event) {
        if (!clickCancel) {
            // Create Overlay Element
            let overlayCreated = document.createElement("div");
            // Add Class Name To Overlay
            overlayCreated.classList.add("popup-overlay");
            // Append Overlay To The Body
            document.body.append(overlayCreated);
            // Create Popup Box Element
            let popupBoxCreated = document.createElement("div");
            // Add Class Name To Popup Box
            popupBoxCreated.classList.add("popup-box");
            if (item.getAttribute("alt")) {
                // Create Image Heading
                let imageHeading = document.createElement("h3");
                // Create Text For Heading
                let headingText = document.createTextNode(item.getAttribute("alt"));
                // Append Text To Heading
                imageHeading.append(headingText);
                // Append Image Heading To Popup Box
                popupBoxCreated.append(imageHeading);
            }
            // Create Popup Image
            let popupImageCreated = document.createElement("img");
            // Add Class Name To Popup Image
            popupImageCreated.classList.add("popup-image");
            // Get Src Of Clicked Image
            let imageSrc = item.getAttribute("src");
            // Set Src Of Clicked Image To Popup Image
            popupImageCreated.setAttribute("src", imageSrc);
            // Append Popup Image to Popup Box
            popupBoxCreated.append(popupImageCreated);
            // Append Popup Box To Body
            document.body.append(popupBoxCreated);
            // Create Close Button
            let closeButtonCreated = document.createElement("div");
            // Create X char
            let closeTextCreated = document.createTextNode("X");
            // Append Close Text To Close Button
            closeButtonCreated.append(closeTextCreated);
            // Add Class Name To Close Button
            closeButtonCreated.classList.add("close-button");
            // Append Close Button To Popup Box
            popupBoxCreated.append(closeButtonCreated);
        }
    }
});

// Close Popup
document.addEventListener("click", function(event) {
    let element = event.target;
    if (element.classList.contains("close-button")) {
        // Get Popup Box Element
        let popupBox = document.querySelector("div[class='popup-box']");
        // Remove Popup Box Element From Body
        popupBox.remove();
        // Get Overlay Element
        let overlay = document.querySelector("div[class='popup-overlay']");
        // Remove Overlay Element From Body
        overlay.remove();
    }
    // Make Click Cancel To Be False
    clickCancel = false;
});

// Get Scrolling Images
let scrollingImages = document.querySelector("main .container .images-box .scrolling-images");
// Check If Dragging Is Executed Or Not
let isDragging = false;
// Variables For Move Scrolling Images Horizontally
let startX, startScrollLeft;
// Make Event When Pressing Mouse Button to Scrolling Images
scrollingImages.onmousedown = function(event) {
    isDragging = true;
    // Get Images
    let images = document.querySelectorAll("main .container .images-box .scrolling-images img");
    // Iterate Over Images Items
    images.forEach((item) => {
        // Set Draggable Attribute With Value False To All Items
        item.setAttribute("draggable", "false");
    });
    startX = event.pageX;
    startScrollLeft = scrollingImages.scrollLeft;
}
// Make Event When Moving Mouse According to Scrolling Images
scrollingImages.onmousemove = function(event) {
    if (!isDragging) return;
    // Add Dragging Class Name To Scrolling Images
    scrollingImages.classList.add("dragging");
    // Move Scrolling Images Horizontally
    scrollingImages.scrollLeft = startScrollLeft - (event.pageX - startX);
    // Make Click Cancel To Be True
    clickCancel = true;
}
// Make Event When Releasing Mouse Button From Scrolling Images
scrollingImages.onmouseup = function(event) {
    // Add Dragging Class Name To Scrolling Images
    scrollingImages.classList.remove("dragging");
    // Get Images
    let images = document.querySelectorAll("main .container .images-box .scrolling-images img");
    // Iterate Over Images Items
    images.forEach((item) => {
        // Remove Draggable Attribute From All Items
        item.removeAttribute("draggable");
    });
    isDragging = false;
}

// Get Arrow Scrolling
let arrowScrollImages = document.querySelectorAll("main .container .images-box i");
// Iterate Over Arrow Scrolling Items
arrowScrollImages.forEach((item) => {
    item.onclick = function(event) {
        let image = document.querySelector("main .container .images-box .scrolling-images img");
        let imageWidth = image.offsetWidth;
        scrollingImages.scrollLeft += (item.classList.contains("left") ? -imageWidth : imageWidth);
    }
});

/* End Main */