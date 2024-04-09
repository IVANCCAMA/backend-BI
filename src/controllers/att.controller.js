const router = require("express").Router();
const axios = require("axios");
const { request, response, text } = require("express");

const attService = require("../services/att.service");

router.get("", async (req, res) => {
  try {
    const url =
      "https://tarifas.att.gob.bo/index.php/tarifaspizarra/tarifasInternetFijo";

    // Hacer la solicitud GET a la URL especificada
    const response = await axios.get(url);

    // Verificar que la solicitud haya tenido éxito (código de estado 200)
    if (response.status === 200) {
      // Los datos de la página estarán en response.data
      // Puedes procesarlos según tus necesidades
      const datos = response.data;

      // Enviar los datos recuperados como respuesta
      return res.status(200).json({ ok: true, datas: datos });
    } else {
      // Enviar un mensaje de error si la solicitud no tuvo éxito
      return res
        .status(response.status)
        .json({ ok: false, message: "No se pudieron recuperar los datos" });
    }
  } catch (error) {
    // Manejar cualquier error que ocurra durante la solicitud
    console.error("Error al recuperar los datos:", error);
    return res
      .status(500)
      .json({ ok: false, message: "Ocurrió un error al recuperar los datos" });
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
