let ground = document.getElementById("ground");
let catState = 1;

let cat1 = document.getElementById("cat1"); //display: block
let cat2 = document.getElementById("cat2"); //display: none
let pos = 0;

function moveRight(moveCat) {
    if (pos >= 445) {
        pos = 0;
    }
    pos += 16;
    moveCat.style.left = pos + "px";
}

function catSwitch() {
    let catDisplay = window.getComputedStyle(cat1).getPropertyValue("display");
    if (catDisplay == "none") {
        moveRight(cat1);
        cat1.style.display = "block";
        cat2.style.display = "none";
    } else {
        moveRight(cat2);
        cat1.style.display = "none";
        cat2.style.display = "block";
    }
}

let intervalID = setInterval(catSwitch, 500);