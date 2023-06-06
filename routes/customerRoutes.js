const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static('public'));
const customerRouter = express.Router();   
const userController = require("../controllers/userController"); 
const auth = require("../middlewares/auth")
const customerController = require("../controllers/customerController");
customerRouter.post('/signup/:role', userController.signup);
customerRouter.post('/signin', userController.signin);
customerRouter.get('/customerHome', auth, customerController.getNearbyStalls);














module.exports = customerRouter;