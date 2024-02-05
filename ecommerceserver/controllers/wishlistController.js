const {WishList} = require('../models/wishList')

exports.addToWishlist = async (req, res) => {

    try {
        const { productId, userId } = req.body;

        // Check if the item already exists in the wishlist
        const existingItem = await WishList.findOne({ productId, userId });
        console.log(existingItem)
        if (existingItem) {
            return res.status(400).json({ message: "The item is already in the wishlist" });
        }

        // Create a new wishlist item
        const wishListItem = new WishList({ productId, userId });
        await wishListItem.save();

        // Send a success response
        res.status(201).json({ message: "Item added to wishlist successfully" });
    } catch (err) {
        console.error("Error adding item to wishlist:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.removeFromWishList = async (req, res) => {
    try {
        const { productId, userId } = req.body;

        // Remove the item from the wishlist
        await WishList.deleteOne({ productId, userId });
        res.json({ message: "Item removed from wishlist successfully" });
    } catch (err) {
        console.error("Error removing item from wishlist:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.viewWishList = async (req, res) => {
    try {
        const viewAllProduct = await WishList.find();

        if (viewAllProduct.length > 0) {
            return res.status(200).json({
                message: "Success: View all the products",
                wishList: viewAllProduct
            });
        } else {
            return res.status(400).json({
                message: "There are no products in the wishlist"
            });
        }
    } catch (err) {
        console.error("Error viewing wishlist:", err);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
