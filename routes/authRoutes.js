const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for registering a user
router.post('/register', authController.registerUser);

// Route for logging in a user
router.post('/login', authController.loginUser);


// Optional GET route for testing purposes (or you can remove it if unnecessary)
router.get('/register', (req, res) => {
  res.send('Registration endpoint');
});

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// router.post('/register', authController.registerUser);

// router.post('/login', authController.loginUser);

// router.get('/register', (req, res) => {
    


// // Route for Forgot Password
// router.post('/forgot-password', forgotPassword);

// // Route for Reset Password
// router.post('/reset-password', resetPassword);

// });


// module.exports = router;
