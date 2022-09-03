const express = require("express");
const router = express.Router();
const user = require("../controller/userController")
const middleware = require("../middleware/tokenVerification")
router.post("/user",user.create);  // for now used as public api to create user
router.put("/user",middleware.verify,user.update);
router.delete("/user",middleware.verify,user.delete);
router.get("/user",user.list);
router.post("/login");
module.exports=router;