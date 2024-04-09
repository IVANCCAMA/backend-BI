const router = require("express").Router();
const LevelController = require("../src/controllers/level.controller");
const AttController = require("../src/controllers/att.controller");

router.use("/levels", LevelController);
router.use("/att", AttController);
module.exports = router;
