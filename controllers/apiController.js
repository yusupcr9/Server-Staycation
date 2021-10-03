const Item = require("../models/Item");
const Treasure = require("../models/Activity");
const Traveler = require("../models/Booking");
const Category = require("../models/Category");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const mostPicked = await Item.find()
        .select("_id title country city price unit imageId")
        .limit(5)
        .populate({ path: "imageId", select: "_id imageUrl" });

      const traveler = await Traveler.find();
      const treasure = await Treasure.find();
      const city = await Item.find();

      const category = await Category.find()
        .select("_id name")
        .limit(3)
        .populate({
          path: "itemId",
          select: "_id title country city isPopular imageId",
          perDocumentLimit: 4,
          option: { sort: { sumBooking: -1 } },
          populate: {
            path: "imageId",
            select: "_id imageUrl",
            perDocumentLimit: 1,
          },
        });

      for (let i = 0; i < category.length; i++) {
        for (let x = 0; x < category[i].itemId.length; x++) {
          const item = await Item.findById(category[i].itemId[x]._id);
          item.isPopular = false;
          await item.save();
          if (category[i].itemId[0] === category[i].itemId[x]) {
            item.isPopular = true;
            await item.save();
          }
        }
      }

      const testiomnial = {
        _id: "asd129uasdads1",
        imageUrl: "images/testimonial12.jpg",
        name: "Happy Family",
        rate: 4.55,
        content:
          "What a great trip with my family and i should try again next time soon ...",
        familyName: "Angga",
        familyOccupation: "Product Designer",
      };
      res.status(200).json({
        hero: {
          traveler: traveler.length,
          treasure: treasure.length,
          city: city.length,
        },
        mostPicked,
        category,
        testiomnial,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
