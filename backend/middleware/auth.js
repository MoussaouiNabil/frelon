const jwt = require('jsonwebtoken');
const userCtrl = require("../controllers/user")
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, userCtrl.key);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error, message: "Vous devez vous authentifier avant d'accéder à cette ressource" });
   }
};