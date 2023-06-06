const express = require('express');
const app = express();
const customerRouter = require('./routes/customerRoutes');
const vendorRouter = require('./routes/vendorRoutes');
const db = require('./db/config');
const cookieParser = require('cookie-parser');
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use((req,res,next) =>{
    console.log("HTTP Method - "+req.method + " ,URL - "+req.url);
    next();
})
app.set("view engine", "ejs");
app.use(express.static('public'));

// Routes
app.use('/customers',customerRouter);
app.use('/vendors',vendorRouter);
app.get("/", (req,res) => {
    res.render("index");
});
app.get("/login", (req,res) => {
    res.render("login");
});
app.get("/vendorsignin", (req,res) =>{
    res.render("vendorlogin");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
