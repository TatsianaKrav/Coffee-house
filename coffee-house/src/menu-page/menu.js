import products from "../../data/products.json" assert { type: "json" };

const menuTabs = document.querySelectorAll(".menu-choice");

const allProducts = products;
showDrinks("coffee");

const listOfDrinks = document.getElementsByClassName("menu-list-drinks")[0];

function filterDrinks() {
  listOfDrinks.addEventListener("click", (e) => {
    const chosenDrink = e.target.innerText;

    menuTabs.forEach((tab) => tab.classList.remove("active"));
    e.target.classList.add("active");
    showDrinks(chosenDrink);
  });
}

function showDrinks(drink) {
  const coffeItemsElement = document.getElementsByClassName("coffee-items")[0];
  coffeItemsElement.innerHTML = "";

  let count = 1;
  if (allProducts && allProducts.length > 0) {
    const products = allProducts.filter(
      (product) =>
        product.category.toLocaleLowerCase() === drink.toLocaleLowerCase()
    );

    products.forEach((item) => {
      const coffeeItemElement = document.createElement("div");
      coffeeItemElement.className = "coffee-item";

      const coffeeItemImageElement = document.createElement("div");
      coffeeItemImageElement.className = "coffee-item-image";

      const imageElement = document.createElement("img");
      imageElement.setAttribute(
        "src",
        "../../assets/images/menu-page/" +
          item.category +
          "/" +
          item.category +
          "-" +
          count +
          ".png"
      );
      imageElement.setAttribute("alt", "coffee1");

      coffeeItemImageElement.appendChild(imageElement);

      const coffeeItemInfoElement = document.createElement("div");
      coffeeItemInfoElement.className = "coffee-item-info";

      const coffeeItemTitle = document.createElement("div");
      coffeeItemTitle.className = "coffee-item-title";
      coffeeItemTitle.innerText = item.name;

      const coffeeItemDescription = document.createElement("div");
      coffeeItemDescription.className = "coffee-item-description";
      coffeeItemDescription.innerText = item.description;

      const coffeeItemPrice = document.createElement("div");
      coffeeItemPrice.className = "coffee-item-price";
      coffeeItemPrice.innerText = "$" + item.price;

      coffeeItemInfoElement.append(coffeeItemTitle);
      coffeeItemInfoElement.append(coffeeItemDescription);
      coffeeItemInfoElement.append(coffeeItemPrice);

      coffeeItemElement.appendChild(coffeeItemImageElement);
      coffeeItemElement.appendChild(coffeeItemInfoElement);

      coffeItemsElement.append(coffeeItemElement);

      count++;
    });
  }

  const mediaQuery = window.matchMedia("(max-width: 768px)");

  if (count <= 5) {
    document.getElementById("load").style.display = "none";
  } else if (count > 5 && mediaQuery.matches) {
    document.getElementById("load").style.display = "flex";
  }
}

filterDrinks();

const loadProductsButton = document.getElementById("load");

loadProductsButton.onclick = () => {
  const hiddenProducts = document.querySelectorAll(
    ".coffee-item:nth-child(n+5)"
  );
  hiddenProducts.forEach((product) => (product.style.display = "block"));
  loadProductsButton.style.display = "none";
};

/* 
function handleTabletChange(e) {
    // Check if the media query is true
    if (e.matches) {
      // Then log the following message to the console
      console.log('Media Query Matched!')
    }
  }
   
  // Register event listener
  mediaQuery.addListener(handleTabletChange)
  
  // Initial check
  handleTabletChange(mediaQuery) */
