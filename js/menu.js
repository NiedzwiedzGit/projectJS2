const menuBtn = document.querySelector(".logo");
const aBack = document.querySelector(".aBack");

const header = document.querySelector(".container");
const navItems = document.querySelectorAll(".btn");
const soundMute = document.querySelector(".btn-2");
const sound = document.querySelector(".myAudio");
//const video = document.querySelector(".video");
const playArrow = document.querySelector(".playArrow");
const pauseArrow = document.querySelector(".pauseArrow");
const containerBtn = document.querySelectorAll(".container .go");
const leftSideContent = document.querySelector(".leftSideContent");

let showMenu = false;
let showSubMenu = false;

menuBtn.addEventListener("click", toggleMenu);
function toggleMenu() {
  if (showMenu == false) {
    console.log(showMenu);
    menuBtn.classList.add("close");
    header.classList.add("show");
    menuBtn.classList.add("show");
    aBack.classList.add("show");
    navItems.forEach(item => item.classList.add("show"));
    //set menu state
    showMenu = true;
  } else {
    console.log("tyt222");
    $(document).ready(function() {
      $(".leftSideContent").load("pages/gameTutorial.php");
    });
    menuBtn.classList.remove("close");
    aBack.classList.remove("show");
    menuBtn.classList.remove("show");
    header.classList.remove("show");
    leftSideContent.classList.remove("show");
    navItems.forEach(item => item.classList.remove("show"));
    //set menu state
    showMenu = false;
    showSubMenu = false;
  }
}
pauseArrow.style.visibility = "hidden";
soundMute.addEventListener("click", soundControl);
function soundControl() {
  if (!showMenu) {
    sound.pause();
    playArrow.style.visibility = "visible";
    pauseArrow.style.visibility = "hidden";
    //set menu state
    showMenu = true;
  } else {
    sound.play();
    pauseArrow.style.visibility = "visible";
    playArrow.style.visibility = "hidden";
    //set menu state
    showMenu = false;
    showSubMenu = false;
  }
}

containerBtn.forEach(item => item.addEventListener("click", loadingContent));
function loadingContent() {
  if (!showSubMenu) {
    leftSideContent.classList.add("show");

    //set menu state
    showSubMenu = true;
  }
}
