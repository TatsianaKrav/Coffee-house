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
};git

document.querySelectorAll("#menu *").forEach((item) => {
  item.onclick = () => {
    headerMenuList.classList.remove("active");
    burger.classList.remove("active");
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
  };
});
