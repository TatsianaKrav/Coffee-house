const burger = document.getElementById("burger");
const headerMenuList = document.getElementsByClassName("header-menu-list")[0];

burger.onclick = () => {
  burger.classList.toggle("active");
  headerMenuList.classList.toggle("active");

  if (burger.classList.contains("active")) {
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
  } else {
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
  }
};

document.querySelectorAll("#menu *").forEach((item) => {
  item.onclick = () => {
    headerMenuList.classList.remove("active");
    burger.classList.remove("active");
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
  };
});

/* const mediaQuery = window.matchMedia("(max-width: 768px)");

if (mediaQuery.matches) {
  console.log(1);
  const menuElement = document.getElementsByClassName("header-menu-links")[0];
  const btnHeader = document.getElementsByClassName("header-menu")[0];
  const btnHeaderInBurger = document.createElement("div");
  btnHeaderInBurger.className = "header-menu menu-item menu-in-burger";
  btnHeaderInBurger.innerHTML = btnHeader.innerHTML;
  btnHeaderInBurger.style.display = "flex";

  menuElement.appendChild(btnHeaderInBurger);
} */
