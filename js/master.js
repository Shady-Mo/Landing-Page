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

/* Start Side Bar */

/* Start Settings Box */

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

/* End Settings Box */

/* Start Nav Bullet */

// Get All Bullets
let bullets = document.querySelectorAll("aside .nav-bullet .bullet");
// Get Header Links
let headerLinks = document.querySelectorAll("header .container .landing-page .header-area .links li a");
// Iterate Over Each Bullet Item
bullets.forEach((item) => {
    // Make Event When Hover On Any Bullet
    item.onmouseenter = function(event) {
        bullets.forEach((item) => {
            // Remove Hovered Bullet Class Name From All Bullets
            item.classList.remove("hovered-bullet");
        });
        // Get Clicked Bullet Element
        let element = event.target;
        // Add Hovered Bullet Class Name To Clicked Element
        element.classList.add("hovered-bullet");
        // Get Clicked Element's Before
        let elementBefore = findCssRule("aside div.nav-bullet .hovered-bullet::before");
        // Get Index Of Current Header Link
        let idx = element.dataset.index;
        // Get Content Name
        let contentName = headerLinks[idx - 1].textContent;
        // Add Content Name To All Bullet Items
        elementBefore.setProperty("content", `"${contentName}"`);
    }
    // Make Event When Remove Hover From Any Bullet
    item.onmouseleave = function(event) {
        bullets.forEach((item) => {
            // Remove Hovered Bullet Class Name From All Bullets
            item.classList.remove("hovered-bullet");
        });
    }
    // Make Event When Click On Any Bullet
    item.onclick = function(event) {
        // Get Target Section Name
        let targetSectionName = item.dataset.section;
        // Get Target Section
        let targetSection = document.querySelector(`section.${targetSectionName}`);
        // Scroll To Clicked Section
        targetSection.scrollIntoView({
            behavior: "smooth",
        });
    }
});

window.addEventListener("scroll", (event) => {
    // Get All Sections
    let sections = document.querySelectorAll("section");
    // Get Target Section
    let targetSection = "none";
    sections.forEach((item) => {
        if (item.getBoundingClientRect().top < 1) {
            targetSection = item.className;
        }
    });
    if (targetSection === "none") {
        // Iterate Over Bullets Elements
        bullets.forEach((item) => {
            // Remove Clicked Bullet Class Name From All Bullets
            item.classList.remove("clicked-bullet");
            // Remove Children From All Bullets
            if (item.childNodes.length) {
                item.removeChild(item.firstChild);
            }
        });
        return;
    }
    // Get Target Element
    let targetElement = document.querySelector(`aside .nav-bullet .bullet[data-section='${targetSection}']`);
    // Iterate Over Bullets Elements
    bullets.forEach((item) => {
        // Remove Clicked Bullet Class Name From All Bullets
        item.classList.remove("clicked-bullet");
        // Remove Children From All Bullets
        if (item.childNodes.length) {
            item.removeChild(item.firstChild);
        }
    });
    // Add Clicked Bullet Class Name To Target Element
    targetElement.classList.add("clicked-bullet");
    // Create An Element
    let trueFontAwesomeCreated = document.createElement("i");
    // Set Class Name To True Font Awesome Element
    trueFontAwesomeCreated.setAttribute("class", "fa fa-check");
    // Append Created Element To Clicked Element
    targetElement.append(trueFontAwesomeCreated);
});

/* End Nav Bullet */

/* End Side Bar */

/* Start Header */

// Get Links Container Icon
let linksContainerIcon = document.querySelector("header .container .landing-page .header-area .links-container .icon");
// Get UL Nav Links
let ulNavLinks = document.querySelector("header .container .landing-page .header-area .links-container ul")
// Get All Nav Links
let NavLinks = document.querySelectorAll("header .container .landing-page .header-area .links-container ul li");
// Make Event When Click On Links Container
linksContainerIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    // Add/Remove Open Class Name To UL Nav Links
    ulNavLinks.classList.toggle("open");
});
// Make Event When Click On Anywhere
document.addEventListener("click", (event) => {
    let element = event.target;
    if (element !== linksContainerIcon && element !== ulNavLinks) {
        if (ulNavLinks.classList.contains("open")) {
            // Remove Open Class Name From UL Nav Links
            ulNavLinks.classList.remove("open");
        }
    }
});

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

/* End Header */

/* Start Main */

/* Start Our Skills Section */

// Select Skills Element
let ourSkills = document.querySelector("main .skills .container .skills");
// Select Box Of Our Skills Element
let ourSkillsBox = document.querySelector("main .skills .container .box");
// Select Skills Progress Items
let skillsProgress = document.querySelectorAll("main .skills .container .skills .skill-box .skill-progress");
// Get The Amount Of Scrolling To reach The Top Of Our Skills Element
let ourSkillsOffsetTop = ourSkills.offsetTop;
// For Checking counter
let doneCounter = false;
// Make Event When Scrolling
window.addEventListener("scroll", (event) => {
    if (window.innerHeight > ourSkillsBox.getBoundingClientRect().top) {
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
});
if (window.innerHeight > ourSkillsBox.getBoundingClientRect().top) {
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

/* End Our Skills Section */

/* Start Gallery Section */

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
// Get Arrow Scrolling
let arrowScrollImages = document.querySelectorAll("main .container .images-box i");
// Add Class Name Counter To All Images
function countImage() {
    // Get All Images
    let images = document.querySelectorAll("main .container .images-box .scrolling-images img");
    // Iterate Over Images Items
    for (let i = 1; i <= images.length; i++) {
        // Add Class Name Counter To All Images
        images[i - 1].setAttribute("class", i);
    }
}
// Execute Function
countImage();
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
    // Get Images
    let images = document.querySelectorAll("main .container .images-box .scrolling-images img");
    // Iterate Over Images Items
    images.forEach((item) => {
        // Add Dragging Class Name To All Items
        item.classList.add("dragging");
    });
    // Move Scrolling Images Horizontally
    scrollingImages.scrollLeft = startScrollLeft - (event.pageX - startX);
    // Make Click Cancel To Be True
    clickCancel = true;
    // Get Scrolling Images Style
    let scrollingImagesStyle = findCssRule("main section .container .images-box .scrolling-images");
    // Remove scroll-snap-type Property
    scrollingImagesStyle.removeProperty("scroll-snap-type");
    // Remove scroll-behavior Property
    scrollingImagesStyle.removeProperty("scroll-behavior");
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
        // Remove Dragging Class Name To All Items
        item.classList.remove("dragging");
    });
    isDragging = false;
    // Get Scrolling Images Style
    let scrollingImagesStyle = findCssRule("main section .container .images-box .scrolling-images");
    // Add scroll-snap-type Property
    scrollingImagesStyle.setProperty("scroll-snap-type", "x mandatory");
    // Add scroll-behavior Property
    scrollingImagesStyle.setProperty("scroll-behavior", "smooth");
}
// Iterate Over Arrow Scrolling Items
arrowScrollImages.forEach((item) => {
    item.onclick = function(event) {
        // Get First Image
        let image = document.querySelector("main .container .images-box .scrolling-images img");
        // Get Width Of First Image
        let imageWidth = image.offsetWidth;
        // Move Scrolling Images By Width Image Horizontally
        scrollingImages.scrollLeft += (item.classList.contains("left") ? -imageWidth : imageWidth);
    }
});
// Make Event When Scrolling Images Is Scrolling
scrollingImages.onscroll = function() {
    // Select The Distance Between Left Edge Of Scrolling Images And Left Window
    let scrollingImagesLeft = Math.floor(scrollingImages.getBoundingClientRect().left);
    // Select The Distance Between Right Edge Of Scrolling Images And Right Window
    let scrollingImagesRight = Math.floor(scrollingImages.getBoundingClientRect().right);
    // Select Left Most Image Right Most Image
    let leftMostImage, rightMostImage;
    // Get All Images
    let images = document.querySelectorAll("main .container .images-box .scrolling-images img");
    // Iterate Over All Images As Items
    images.forEach((item) => {
        let imageRect = item.getBoundingClientRect();
        if (Math.floor(imageRect.left) === scrollingImagesLeft) {
            leftMostImage = item;
        }
        if (Math.floor(imageRect.right) === scrollingImagesRight) {
            rightMostImage = item;
        }
    });
    if (leftMostImage && rightMostImage) {
        if (leftMostImage.className === "1") {
            // Get Left Arrow
            let leftArrow = arrowScrollImages[0];
            // Add Disabled Class Name To Left Arrow
            leftArrow.classList.add("disabled");
        }
        else {
            // Get Left Arrow
            let leftArrow = arrowScrollImages[0];
            // Remove Disabled Class Name To Left Arrow
            leftArrow.classList.remove("disabled");
        }
        if (rightMostImage.className === `${images.length}`) {
            // Get Left Arrow
            let rightArrow = arrowScrollImages[1];
            // Add Disabled Class Name To Left Arrow
            rightArrow.classList.add("disabled");
        }
        else {
            // Get Left Arrow
            let rightArrow = arrowScrollImages[1];
            // Remove Disabled Class Name To Left Arrow
            rightArrow.classList.remove("disabled");
        }
    }
}

/* End Gallery Section */

/* End Main */