const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.find().then(([registeredHomes]) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find().populate('houseId').then(favourites => {
    const favouriteHomes = favourites.map(favourite => favourite.houseId);
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
  });
};

exports.postAddToFavourite = (req, res) => {
  const houseId = req.body.id;
  Favourite.findOne({ houseId: houseId })
    .then((existingFavourite) => {
      if (existingFavourite) {
        console.log("House is already in favourites");
        return res.redirect("/favourites");
      }
      const favourite = new Favourite({
        houseId: houseId,
      });
      return favourite.save().then(() => {
        console.log("Added to favourites");
        res.redirect("/favourites");
      });
    })
    .catch((error) => {
      console.log("Error while adding to favourites: ", error);
      res.redirect("/homes");
    });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const houseId = req.params.homeId;
  console.log("House ID to remove from favourites: ", houseId);
  Favourite.findOneAndDelete(houseId).then(() => {
    console.log("Removed from favourites"); 
  }).catch((error) => {
    console.log("Error while removing from favourites: ", error);
  });
  res.redirect("/favourites");
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
      });
    }
  });
};
