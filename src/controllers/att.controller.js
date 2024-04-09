const router = require("express").Router();
const { request, response, text } = require("express");

const attService = require("../services/att.service");

router.get("", async (req = request, res = response) => {
  try {
    const datas = await attService.get();
    return res.status(200).json({
      ok: true,
      datas,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error in server",
    });
  }
});

router.post("", async (req = request, res = response) => {
  try {
    const data = await attService.add(req.body);
    return res.status(200).json(data);
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error in server",
    });
  }
});

module.exports = router;
