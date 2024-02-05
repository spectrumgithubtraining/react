const express = require('express')

const router = express.Router()

const wishlistController = require('../controllers/wishlistController')


router.post('/add', wishlistController.addToWishlist);

// POST route to remove item from wishlist
router.post('/remove', wishlistController.removeFromWishList);

router.get('/view',wishlistController.viewWishList)

module.exports = router;