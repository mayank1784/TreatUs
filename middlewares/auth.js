require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY
const jwt = require("jsonwebtoken");
const auth = (req,res,next) => {
    try{
        // let token = req.headers.authorization;
        // if(token){
        //     token = token.split(" ")[1];
        //     let user = jwt.verify(token, SECRET_KEY)
        //     req.userId = user.id;
        // }
        let token = req.cookies.token;
        if (token) {
            console.log(token);
        // req.headers.authorization = `Bearer ${token}`;
        // token = token.split(" ")[1];
        let user = jwt.verify(token, SECRET_KEY)
        req.userId = user.id;
            }
        else{
            res.status(401).json({message: "Unauthorised user"});
        }
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({message: "Unauthorised user"});
    }
}
module.exports = auth;