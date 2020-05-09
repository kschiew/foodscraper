class Restaurant {
    constructor(company, name, image, timeAway) {
        this.company = company;
        this.name = name;
        this.image = image;
        this.timeAway = timeAway;
    }

    updateFoods(foods) {
        this.foods = foods;
    }

}


module.exports = Restaurant;