const FoodView = require('./views/foodView');
const Request = require('./services/request.js');

const foodView = new FoodView();
const request = new Request('http://localhost:3000/api/food');

const appStart = function(){

}

document.addEventListener('DOMContentLoaded', appStart);
