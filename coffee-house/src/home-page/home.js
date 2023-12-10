const sliderContainer = document.getElementsByClassName(
  "favorite-coffee-sliders"
)[0];
const slidersList = document.querySelectorAll(".favorite-coffee-slider");
const arrowBackElement = document.getElementById("arrow-back");
const arrowNextElement = document.getElementById("arrow-next");
const bars = document.querySelectorAll(".line");
let countSlider = 0;

/* function nextSlider() {
  if (countSlider === sliders.children.length - 1) {
    sliders.children[countSlider].style.display = "none";
    countSlider = 0;
    sliders.children[0].style.display = "block";
  } else {
    sliders.children[countSlider].style.display = "none";
    sliders.children[countSlider + 1].style.display = "block";
    countSlider++;
  }
} */

/* setInterval(nextSlider, 2000); */

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
  interval = setInterval(timer, 1500);
  function timer() {
    nextSlider();
    handleBars();
  }
}

autoSliding();

sliderContainer.addEventListener("mouseover", function () {
  clearInterval(interval);
});

sliderContainer.addEventListener("mouseout", autoSliding);

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
