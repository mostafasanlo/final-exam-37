"us strict"

const foodData = function (category) {
    fetch(`http://localhost:3131/foods/${category}`)
    .then((response)=> response.json())
    .then((data)=> {renderFoodCards(data);
    return data; });
    };

const renderFoodCards= (data)=>{
    const foodContainer= document.querySelector(".food-container");
    foodContainer.innerHTML= "";
    data.forEach((food)=>{
    console.log(food.name);
    const foodCard= document.createElement("div");
    foodCard.className= "food-card";

    const img= document.createElement("img");
    img.setAttribute("alt", food.name);
    img.setAttribute("src", food.image);

    const h3= document.createElement("h3");
    h3.textContent= food.name;

    const price= document.createElement("p");
    price.className= "price";
    price.textContent= food.price;

    const ingredients= document.createElement("p");
    ingredients.className= "ingredients";
    ingredients.textContent= food.ingredients;

    const cartButtons= document.createElement("div");
    cartButtons.className= "cart-buttons";

    const minusButton= document.createElement("button");
    minusButton.className= "minus";
    minusButton.textContent= "-";
    minusButton.addEventListener("click", function () {
      updateQuantity(food.id, -1, data);
    });

    const quantity= document.createElement("span");
    quantity.className= "quantity";
    quantity.innerText= food.id;
    quantity.id= `quantity-${food.id}`;

    const plusButton= document.createElement("button");
    plusButton.className= "plus";
    plusButton.textContent= "+";
    plusButton.addEventListener("click", function () {
      updateQuantity(food.id, 1, data);
    });

    const cartIndicator= document.createElement("div");
    cartIndicator.className= "cart-indicator";
    foodContainer.appendChild(foodCard);
    foodCard.appendChild(img);
    foodCard.appendChild(h3);
    foodCard.appendChild(price);
    foodCard.appendChild(ingredients);
    foodCard.appendChild(cartIndicator);
    foodCard.appendChild(cartButtons);

    cartButtons.appendChild(minusButton);
    cartButtons.appendChild(quantity);
    cartButtons.appendChild(plusButton);
  });
};

const updateQuantity= (productId, change, data)=> {
    const food= data.find((f) => f.id== productId);
    if (food) {
    let qty= Number(
    document.getElementById(`quantity-${productId}`).textContent );
    qty+= change;
    if (qty < 0) {
      qty= 0;
     }
    document.getElementById(`quantity-${productId}`).textContent= qty;
    }
};