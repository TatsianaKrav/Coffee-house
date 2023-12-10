const sliderContainer = document.getElementsByClassName(
  "favorite-coffee-sliders"
)[0];
const slidersList = document.querySelectorAll(".favorite-coffee-slider");
const arrowBackElement = document.getElementById("arrow-back");
const arrowNextElement = document.getElementById("arrow-next");
const bars = document.querySelectorAll(".line");
let countSlider = 0;

arrowNextElement.addEventListener("click", nextSlider);

let start = 0;
let end = 0;

function nextSlider() {
  slidersList[countSlider].style.animation = "next1 0.5s linear forwards";
  if (countSlider >= slidersList.length - 1) {
    countSlider = 0;
  } else {
    countSlider++;
  }
  slidersList[countSlider].style.animation = "next2 0.5s linear forwards";

  if (start >= 1500) {
    start = 0;
    end = 0;
  }
  start = Date.now();

  handleBars();
}

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

function autoSliding() {
  interval = setInterval(function () {
    nextSlider();
    handleBars();
  }, 1500);
  /* 
  interval = setInterval(timer, 1500);

  function timer() {
    nextSlider();
    handleBars();
  } */
}

autoSliding();

let diff = 0;
slidersList.forEach((slide) => {
  slide.addEventListener("mouseover", function (e) {
    e.preventDefault();
    end = Date.now();
    let diff = end - start;
    console.log(diff);
    clearInterval(interval);
    document.querySelector(".line.active").style.animationPlayState = "paused";
  });

  slide.addEventListener("mouseout", function () {
   /*  console.log(diff); */
    document.querySelector(".line.active").style.animationPlayState = "running";
    document.querySelector(".line.active").style.animation = `moveBars ${1500 - diff}ms linear infinite forwards`;
    
    start = 0;
  });

  slide.addEventListener("mouseout", autoSliding);
});

function handleBars() {
  for (let i = 0; i < bars.length; i++) {
    bars[i].classList.remove("active");
  }
  bars[countSlider].classList.add("active");
}

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
