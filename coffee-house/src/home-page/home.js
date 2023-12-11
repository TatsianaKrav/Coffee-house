const sliderContainer = document.getElementsByClassName(
  "favorite-coffee-sliders"
)[0];
const slidersList = document.querySelectorAll(".favorite-coffee-slider");
const arrowBackElement = document.getElementById("arrow-back");
const arrowNextElement = document.getElementById("arrow-next");
const bars = document.querySelectorAll(".line");
let countSlider = 0;

//click on arrowNext
arrowNextElement.addEventListener("click", nextSlider);

function nextSlider() {
  slidersList[countSlider].style.animation = "next1 0.5s linear forwards";
  if (countSlider >= slidersList.length - 1) {
    countSlider = 0;
  } else {
    countSlider++;
  }
  slidersList[countSlider].style.animation = "next2 0.5s linear forwards";

  handleBars();
}

//click on arrowBack
arrowBackElement.addEventListener("click", prevSlider);

function prevSlider() {
  slidersList[countSlider].style.animation = "prev1 0.5s linear forwards";
  if (countSlider === 0) {
    countSlider = slidersList.length - 1;
  } else {
    countSlider--;
  }
  slidersList[countSlider].style.animation = "prev2 0.5s linear forwards";
  handleBars();
}

//set interval for autosliding
function autoSliding() {
  interval = setInterval(timer, 5000);

  function timer() {
    nextSlider();
    handleBars();
  }
}

/* autoSliding();
 */
//hover effect - stop animation
function handleAnimation() {
  slidersList.forEach((slide) => {
    let leftTimeAnimation = 0;
    let fulledBarArea = 0;

    slide.addEventListener("mouseover", function (e) {
      e.stopPropagation();
      clearInterval(interval);

      /* let list = e.currentTarget.parentNode.nextElementSibling.children;
          let activeBar = null;
          Array.from(list).forEach((item) => {
            if (item.children[0].classList.contains("active")) {
              activeBar = item.children[0];
            }
          });
          let styles = getComputedStyle(activeBar);
          let activeBarWidth = parseInt(styles.width);
      
          fulledBarArea = (activeBarWidth * 100) / 40;
          let leftFullBarArea = 100 - fulledBarArea;
      
          leftTimeAnimation = (leftFullBarArea * 1500) / 100;
       */
      document.querySelector(".line.active").style.animationPlayState =
        "paused";
    });

    /* const removeBars = `
      @keyframes removeBars {
          from {
            width: ${fulledBarArea}%;
          }
          to {
            width: 100%;
          }
        }
      `; */

    slide.addEventListener("mouseout", function () {
      document.querySelector(".line.active").style.animationPlayState =
        "running";
      /*  document.querySelector(
            ".line.active"
          ).style.animation = `removeBars ${450}ms linear infinite `; */
      /*  document
            .querySelector(".line.active")
            .animate([
              { width: `${fulledBarArea}`},
              { width: "100%" },
            ],
            {
              duration: leftTimeAnimation,
              iterations: Infinity
            }); */
    });

    slide.addEventListener("mouseout", autoSliding);
  });
}

handleAnimation();

//handle active/inactive bar
function handleBars() {
  for (let i = 0; i < bars.length; i++) {
    bars[i].classList.remove("active");
  }
  bars[countSlider].classList.add("active");
}

//switch sliders with bars
function switchSlider() {
  for (let i = 0; i < bars.length; i++) {
    bars[i].onclick = (e) => {
      e.target.classList.add("active");
      sliderId = e.target.getAttribute("attr");

      if (sliderId > countSlider) {
        slidersList[countSlider].style.animation = "next1 0.5s linear forwards";
        countSlider = sliderId;
        slidersList[countSlider].style.animation = "next2 0.5s linear forwards";
      } else if (sliderId === countSlider) {
        return;
      } else {
        slidersList[countSlider].style.animation = "prev1 0.5s linear forwards";
        countSlider = sliderId;
        slidersList[countSlider].style.animation = "prev2 0.5s linear forwards";
      }
      handleBars();
    };
  }
}

switchSlider();

var initialPoint;
var finalPoint;
document.getElementsByClassName("favorite-coffee-sliders")[0].addEventListener(
  "touchstart",
  function (event) {
    event.preventDefault();
    event.stopPropagation();
    initialPoint = event.changedTouches[0];
  },
  false
);
document.getElementsByClassName("favorite-coffee-sliders")[0].addEventListener(
  "touchend",
  function (event) {
    event.preventDefault();
    event.stopPropagation();
    finalPoint = event.changedTouches[0];
    var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    if (xAbs > 20 || yAbs > 20) {
      if (xAbs > yAbs) {
        if (finalPoint.pageX < initialPoint.pageX) {
          console.log("right");
          nextSlider();
          clearInterval(interval);
        } else {
          console.log("left");
          prevSlider();
          clearInterval(interval);
        }
      }
    }
  },
  false
);

document
  .getElementsByClassName("favorite-coffee-sliders")[0]
  .addEventListener("touchend", autoSliding);
