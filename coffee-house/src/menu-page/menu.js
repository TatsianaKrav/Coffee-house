import products from "../../data/products.json" assert { type: "json" };

window.onload = () => {
  const allProducts = products;
  const menuTabs = document.querySelectorAll(".menu-choice");
  const listOfDrinks = document.getElementsByClassName("menu-list-drinks")[0];
  const loadProductsButton = document.getElementById("load");
  const modal = document.getElementById("modal");
  const modalWindowElement = document.getElementById("modal-window");

  showDrinks("coffee");
  filterDrinks();
  loadMoreProducts();
  /* handleModal(); */

  function filterDrinks() {
    listOfDrinks.addEventListener("click", (e) => {
      const chosenDrink = e.target.innerText;

      menuTabs.forEach((tab) => tab.classList.remove("active"));
      e.target.classList.add("active");
      showDrinks(chosenDrink);
    });
  }

  function showDrinks(drink) {
    const coffeItemsElement =
      document.getElementsByClassName("coffee-items")[0];
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
        coffeeItemElement.setAttribute("data-name", item.name);

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

      const allCards = document.querySelectorAll(".coffee-item");
      /*    modal.style.cssText = `
        display: flex;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.5s ease`; */

      allCards.forEach((card) => {
        card.onclick = (e) => {
          /*   modal.style.visibility = "visible";
        modal.style.opacity = 1; */

          const targetElement = e.currentTarget;
          modal.style.display = "flex";

          showModal(targetElement);
          document.getElementsByTagName("body")[0].style.overflowY = "hidden";
        };
      });
    }

    const mediaQuery = window.matchMedia("(max-width: 768px)");

    if (count <= 5) {
      document.getElementById("load").style.display = "none";
    } else if (count > 5 && mediaQuery.matches) {
      document.getElementById("load").style.display = "flex";
    }
  }

  function showModal(elem) {
    modalWindowElement.innerHTML = "";
    const product = products.find(
      (product) => product.name === elem.dataset.name
    );

    modalWindowElement.innerHTML = `
     <div class="product-image">
    <img
      src="../../assets/images/menu-page/coffee/coffee-1.png"
      alt=${product.name}
    />
  </div>
  <div class="product-info">
    <div class="product-name">${product.name}</div>
    <div class="product-info-wrap">
      <div class="product-description">${product.description}</div>
      <div class="product-size">
        <span>Size</span>
        <div class="size-choice">
          <ul class="tabs">
            <li class="tab">
              <div class="size">S</div>
              <div class="btn-text">200 ml</div>
            </li>
            <li class="tab">
              <div class="size">M</div>
              <div class="btn-text">300 ml</div>
            </li>
            <li class="tab">
              <div class="size">L</div>
              <div class="btn-text">400 ml</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="product-additives">
        <span>Additives</span>
        <div class="additives-choice">
          <ul class="tabs">
            <li class="tab">
              <div class="size">1</div>
              <div class="btn-text">Sugar</div>
            </li>
            <li class="tab">
              <div class="size">2</div>
              <div class="btn-text">Cinnamon</div>
            </li>
            <li class="tab">
              <div class="size">3</div>
              <div class="btn-text">Syrup</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="total">
        <span>Total:</span>
        <span class="total-price">$${product.price}</span>
      </div>
      <div class="note">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_268_9647)">
            <path
              d="M8 7.66663V11"
              stroke="#403F3D"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 5.00667L8.00667 4.99926"
              stroke="#403F3D"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.99992 14.6667C11.6818 14.6667 14.6666 11.6819 14.6666 8.00004C14.6666 4.31814 11.6818 1.33337 7.99992 1.33337C4.31802 1.33337 1.33325 4.31814 1.33325 8.00004C1.33325 11.6819 4.31802 14.6667 7.99992 14.6667Z"
              stroke="#403F3D"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_268_9647">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p>
          The cost is not final. Download our mobile app to see the
          final price and place your order. Earn loyalty points and
          enjoy your favorite coffee with up to 20% discount.
        </p>
      </div>
      <button id="modal-close">Close</button>
    </div>
  </div> 
  `;

    handleModal();
  }

  function loadMoreProducts() {
    loadProductsButton.onclick = () => {
      const hiddenProducts = document.querySelectorAll(
        ".coffee-item:nth-child(n+5)"
      );
      hiddenProducts.forEach((product) => (product.style.display = "block"));
      loadProductsButton.style.display = "none";
    };
  }

  function handleModal() {
    const modalCloseButton = document.getElementById("modal-close");
    
    function closeModal(e) {
      if (e.target === modal || e.target === modalCloseButton) {
        modal.style.display = "none";
        document.getElementsByTagName("body")[0].style.overflowY = "auto";
      }
    }

    modal.addEventListener("click", closeModal);
    modalCloseButton.addEventListener("click", closeModal);
  }
};

/* function showModal(elem) {
  modal.innerHTML = "";
  const product = products.find(
    (product) => product.name === elem.dataset.name
  );

  const tabsSize = [
    {
      size: "S",
      ml: "200ml",
    },

    {
      size: "M",
      ml: "300ml",
    },
    {
      size: "L",
      ml: "400ml",
    },
  ];

  const tabsAdd = [
    {
      s: "1",
      ml: "Sugar",
    },

    {
      s: "2",
      ml: "Lemon",
    },
    {
      s: "3",
      ml: "Syrup",
    },
  ];

  const productImageElement = document.createElement("div");
  productImageElement.className = "product-image";

  const imageProduct = document.createElement("img");
  imageProduct.setAttribute(
    "src",
    "../../assets/images/menu-page/coffee/coffee-1.png"
  );
  imageProduct.setAttribute("alt", "coffee-1");

  productImageElement.appendChild(imageProduct);

  const productInfoElement = document.createElement("div");
  productInfoElement.className = "product-info";

  const productNameElement = document.createElement("div");
  productInfoElement.className = "product-name";
  productInfoElement.innerText = product.name;

  const productInfoWrapElement = document.createElement("div");
  productInfoWrapElement.className = "product-info-wrap";

  productInfoElement.appendChild(productNameElement);

  const productDescriptionElement = document.createElement("div");
  productDescriptionElement.className = "product-description";
  productDescriptionElement.innerText = product.description;

  const productSizeElement = document.createElement("div");
  productSizeElement.className = "product-size";

  const productSizeSpan = document.createElement("span");
  productSizeSpan.innerText = "Size";

  const sizeChoiceELement = document.createElement("div");
  sizeChoiceELement.className = "size-choice";

  const tabsELement = document.createElement("ul");
  tabsELement.className = "tabs";

  for (let i = 0; i < tabsSize.length; i++) {
    const tabELement = document.createElement("li");
    tabsELement.className = "tab";

    const sizeELement = document.createElement("div");
    sizeELement.className = "size";
    sizeELement.innerText = tabsSize[i].size;

    const btnTextELement = document.createElement("div");
    btnTextELement.className = "btn-text";
    sizeELement.innerText = tabsSize[i].size;

    tabELement.appendChild(sizeELement);
    tabELement.appendChild(btnTextELement);

    tabsELement.appendChild(tabELement);
  }

  sizeChoiceELement.appendChild(tabsELement);

  const productAdditivesELement = document.createElement("div");
  productAdditivesELement.className = "product-additives";

  const productAdditivesSpan = document.createElement("span");
  productAdditivesSpan.innerText = "Additives";

  const additivesChoiceELement = document.createElement("div");
  additivesChoiceELement.className = "additives-choice";

  const tabsAddELement = document.createElement("ul");
  tabsAddELement.className = "tabs";

  for (let i = 0; i < tabsAdd.length; i++) {
    const tabELement = document.createElement("li");
    tabsELement.className = "tab";

    const sizeELement = document.createElement("div");
    sizeELement.className = "size";
    sizeELement.innerText = tabsAdd[i].size;

    const btnTextELement = document.createElement("div");
    btnTextELement.className = "btn-text";
    sizeELement.innerText = tabsAdd[i].size;

    tabELement.appendChild(sizeELement);
    tabELement.appendChild(btnTextELement);

    tabsAddELement.appendChild(tabELement);
  }

  productAdditivesELement.appendChild(tabsELement);

  const totalELement = document.createElement("div");
  totalELement.className = "total";

  const totalSpanText = document.createElement("span");
  totalSpanText.innerText = "Total:";

  const totalSpanPrice = document.createElement("span");
  totalSpanPrice.className = "total-price";
  totalSpanPrice.innerText = "$" + +product.price;

  totalELement.appendChild(totalSpanText);
  totalELement.appendChild(totalSpanPrice);

  const noteELement = document.createElement("div");
  noteELement.className = "note";

  const svgELement = document.createElement("img");
  svgELement.setAttribute(
    "src",
    "../../assets/images/menu-page/info-empty.svg"
  );
  svgELement.setAttribute("alt", "empty");

  const noteText = document.createElement("p");
  noteText.innerText = `
The cost is not final. Download our mobile app to see the
                  final price and place your order. Earn loyalty points and
                  enjoy your favorite coffee with up to 20% discount.`;

  noteELement.appendChild(svgELement);
  noteELement.appendChild(noteText);

  const buttonCloseElement = document.createElement("button");
  buttonCloseElement.setAttribute("id", "modal-close");
  buttonCloseElement.innerText = "Close";

  productInfoWrapElement.appendChild(productDescriptionElement);
  productInfoWrapElement.appendChild(productSizeElement);
  productInfoWrapElement.appendChild(productAdditivesELement);
  productInfoWrapElement.appendChild(totalELement);
  productInfoWrapElement.appendChild(noteELement);
  productInfoWrapElement.appendChild(buttonCloseElement);

  productInfoElement.appendChild(productInfoWrapElement);

  modalWindowElement.appendChild(productImageElement);
  modalWindowElement.appendChild(productInfoElement);

  const modalCloseButton = document.getElementById("modal-close");
  console.log(modalWindowElement);


 /*  handleModal(); */

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
