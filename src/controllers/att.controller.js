const express = require("express");
const router = express.Router();
const attService = require("../services/att.service");

router.post("", async (req, res) => {
  try {
    const url =
      "https://tarifas.att.gob.bo/index.php/tarifaspizarra/tarifasInternetFijo";

    // Hacer la solicitud GET a la URL especificada
    const response = await fetch(url); // Utiliza fetch para hacer la solicitud
    const body = await response.text();

    // Extraer el valor de la variable dataJSONArray del cuerpo de la respuesta
    const dataString = body.match(
      /var dataJSONArray = JSON.parse\('([^']+)'\);/
    )[1];
    const datos = JSON.parse(dataString);

    // Filtrar los campos "OTROS_BENEFICIOS" y "DESCRIPCION" de cada objeto
    const dataFilter = datos.map(
      ({ OTROS_BENEFICIOS, DESCRIPCION, ...rest }) => ({
        ...rest,
        FECHA_AGREGACION: req.body.FECHA_AGREGACION, // Agregar la fecha de agregación proporcionada en la solicitud
      })
    );

    // Almacenar los datos en la base de datos MongoDB
    const savedData = await attService.addMany(dataFilter);

    // Verificar si los datos se guardaron correctamente
    if (savedData) {
      return res
        .status(200)
        .json({ ok: true, message: "Datos guardados correctamente" });
    } else {
      return res.status(500).json({
        ok: false,
        message: "Error al guardar los datos en la base de datos",
      });
    }
  } catch (error) {
    // Manejar cualquier error que ocurra durante la solicitud
    console.error("Error al recuperar los datos:", error);
    return res
      .status(500)
      .json({ ok: false, message: "Ocurrió un error al recuperar los datos" });
  }
});

router.get("/", async (req, res) => {
  try {
    // Obtener todos los datos de la base de datos
    const data = await attService.get();

    // Verificar si se obtuvieron los datos correctamente
    if (data) {
      return res.status(200).json({ ok: true, data });
    } else {
      return res
        .status(404)
        .json({ ok: false, message: "No se encontraron datos" });
    }
  } catch (error) {
    // Manejar cualquier error que ocurra durante la solicitud
    console.error("Error al obtener los datos:", error);
    return res
      .status(500)
      .json({ ok: false, message: "Ocurrió un error al obtener los datos" });
  }
});

router.get("/file", async (req, res) => {
  try {
    // Obtener todos los datos de la base de datos
    const data = await attService.get();

    // Verificar si se obtuvieron los datos correctamente
    if (data) {
      // Establecer el encabezado Content-Type
      res.setHeader("Content-Type", "application/json");

      // Enviar la respuesta como un archivo JSON
      res.status(200).send(JSON.stringify(data));
    } else {
      return res
        .status(404)
        .json({ ok: false, message: "No se encontraron datos" });
    }
  } catch (error) {
    // Manejar cualquier error que ocurra durante la solicitud
    console.error("Error al obtener los datos:", error);
    return res
      .status(500)
      .json({ ok: false, message: "Ocurrió un error al obtener los datos" });
  }
});

module.exports = router;
