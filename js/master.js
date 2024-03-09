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