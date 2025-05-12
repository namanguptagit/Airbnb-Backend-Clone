const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  houseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("Favourite", favouriteSchema);

// module.exports = class Favourite {
//   constructor(houseId) {
//     this.houseId = houseId;
//   }

//   save() {
//     const db = getDb();
//     return db.collection("favourites").find({ houseId: this.houseId }).next().then((existingFavourite) => {
//       if (!existingFavourite) {
//         return db.collection("favourites").insertOne(this);
//       }
//       return Promise.resolve();
//     }).catch((error) => {
//       console.log("Error while checking existing favourite: ", error);
//     });
//   }

//   static getFavourites() {
//     const db = getDb();
//     return db.collection("favourites").find().toArray().then((homes) => {
//       return homes;
//     }).catch((error) => {
//       console.log("Error while fetching homes: ", error);
//     });
//   }

//   static deleteById(deleteHouseId) {
//     const db = getDb();
//     return db.collection("favourites").deleteOne({ houseId: deleteHouseId });
//   }
// };
