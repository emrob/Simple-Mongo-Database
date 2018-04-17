var FoodView = function(){
  this.food = [];
}

FoodView.prototype.addFood = function(quote) {
  this.food.push(food);
  this.render(food);
}

FoodView.prototype.clear = function(food) {
  this.food = [];
  const ul = document.querySelector('#food');
  ul.innerHTML = '';
}

FoodView.prototype.render = function(food){
    const ul = document.querySelector('#food');
    const li = document.createElement('li');
    const text = document.createElement('p');
    text.innerText = `${food.meal} - "${food.type}"`;
    li.appendChild(text);
    ul.appendChild(li);
}

 module.exports = FoodView;
