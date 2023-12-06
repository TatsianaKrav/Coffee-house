const burger = document.getElementById("burger");
const headerMenuList = document.getElementsByClassName("header-menu-list")[0];

burger.onclick = () => {
  burger.classList.toggle("active");
  headerMenuList.classList.toggle("active");
};

document.querySelectorAll("#menu *").forEach((item) => {
  item.onclick = () => {
    headerMenuList.classList.remove("active");
    burger.classList.remove("active");
  };
});
