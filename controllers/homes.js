const registeredHomes = [];
const home = require('../models/home');


exports.getAddHome = (req, res, next) => {
    res.render('../views/host/add-Home', { pageTitle: 'Add Home to airbnb', currentPage: 'addHome' });
};
exports.postAddHome = (req, res, next) => {
    const { houseName, price, location, rating, photoUrl } = req.body;
    console.log(houseName, price, location, rating, photoUrl);
    const newHome = new home(houseName, price, location, rating, photoUrl);
    newHome.save();
    registeredHomes.push(req.body);
    res.render('../views/host/home-Added', { pageTitle: 'Home Added Successfully', currentPage: 'homeAdded' });
};
exports.getHomes = (req, res, next) => {
    const registeredHomes = home.fetchAll(registeredHomes => {
        res.render('../views/store/home-list.ejs', { registeredHomes: registeredHomes, pageTitle: 'airbnb Home', currentPage: 'Home' });
    });
};
exports.getBookings = (req, res, next) => {
    const registeredHomes = home.fetchAll(registeredHomes => {
        res.render('../views/store/bookings.ejs', { registeredHomes: registeredHomes, pageTitle: 'My Bookings', currentPage: 'bookings' });
    });
};