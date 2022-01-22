import LunchMenu from './assets/LunchMenu';

const field = document.querySelector('.foodField');
const foodSubmit = document.querySelector('.foodSubmit');
let foodName = '';

const foods = [
  {name: 'Lingonberry jam', price: 4.00},
  {name: 'Mushroom and bean casserole', price: 5.50},
  {name: 'Chili-flavoured wheat', price: 3.00},
  {name: 'Vegetarian soup', price: 4.80},
  {name: 'Pureed root vegetable soup with smoked cheese', price: 8.00},
];

foodSubmit.addEventListener('click', function() {
  foodName = field.value;
  const regExp = /^[A-ZÖÄÅ][a-zöäå,.\s()]{3,64}$/;
  console.log(regExp.test(foodName));
});

foods.sort((a, b) => {
  return a.price - b.price;
});

const filterByPrice = (item) => {
  return item.price < 5;
};

const filtered = foods.filter(filterByPrice);
console.log(filtered);

const multiply = (item) => {
  return item.price *= 1.15;
};
const multiplied = foods.map(multiply);
console.log(multiplied);

console.log(foods);

const summed = foods.map(food => food.price).reduce((a, b) => a + b);
console.log(summed);

/**
 * Return true if passed item is vegan
 * @param item
 * @returns {boolean}
 */
const filteredByVeg = (item) => {
  return item.Diets.includes('Veg');
};

const temp = LunchMenu.LunchMenus[0].SetMenus;
let vegFilteredList = [];

/**
 * takes 2 parameters, input object and output object.
 * Loops through input and only adds those meals to output that get true from
 * the filteredByVeg filtering
 * @param object
 * @param outPut
 */
const looper = (object, outPut) => {
  for (let i = 0; i < object.length; i++) {
    const temp2 = object[i].Meals.filter(filteredByVeg);
    outPut.push(temp2);
  }
};

looper(temp, vegFilteredList);
console.log(vegFilteredList);
