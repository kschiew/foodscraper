class Restaurant {
    constructor(company, name, foods, timeAway, categories) {
        this.company = company;
        this.name = name;
        this.foods = foods;
        this.timeAway = timeAway;
        this.categories = categories;
    }

    updateFoods(foods) {
        this.foods = foods;
    }

}


module.exports = Restaurant;