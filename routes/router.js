const router = require("express").Router();
/* const JobController = require("../src/controllers/job.controller"); */
const AttController = require("../src/controllers/att.controller");

/* router.use("/job", JobController); */
router.use("/att", AttController);
module.exports = router;
