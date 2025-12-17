class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    getInfo() {
        console.log(`The car brand is ${this.brand}`);
        console.log(`The car model is ${this.model}`);
        console.log(`The car year is ${this.year}`);
    }

    drive() {
        console.log("The car start drive");
    }
}

module.exports = Car;
