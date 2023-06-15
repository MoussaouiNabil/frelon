const express = require("express");
const trapCtrl = require("../controllers/trap");
const router = express.Router();
const auth = require("../middleware/auth");
const download = require("../middleware/download");

router.post("/", auth, trapCtrl.create);
router.get("/mytraps", auth, trapCtrl.mytraps);
router.get("/:id", trapCtrl.getspecifiedtrap);
router.get("/", trapCtrl.alltraps);
router.put("/:id/addcapt", auth, trapCtrl.addCapture);
router.put("/:id", auth, trapCtrl.update);
router.delete("/:id", auth, trapCtrl.delete);
router.put("/image/add/:id", auth, download, trapCtrl.addImg);
router.put("/image/rm/:id", auth, trapCtrl.deleteImg);

module.exports = router;
