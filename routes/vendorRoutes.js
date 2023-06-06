const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static('public'));
const vendorRouter = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const vendorController = require("../controllers/vendorController");
vendorRouter.post('/signup/:role', userController.signup);
vendorRouter.post('/signin', userController.signin);
vendorRouter.post('/newItem', auth, vendorController.createMenu);
vendorRouter.get("/vendorHome", auth, vendorController.displayVendor);
vendorRouter.post("/updateLocation", auth, vendorController.updateLocation);










module.exports = vendorRouter;