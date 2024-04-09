const { default: mongoose } = require("mongoose");

const AttModel = require("../schemas/att.model");

exports.get = async () => {
  return await AttModel.find({}).sort({ _id: 1 });
};

exports.add = async (data) => {
  const createdDataAtt = new AttModel(data);
  const newData = await createdDataAtt.save();
  return newData;
};

exports.addMany = async (dataArray) => {
  try {
    // Utiliza el método insertMany de Mongoose para insertar varios documentos a la vez
    const newData = await AttModel.insertMany(dataArray);
    return newData;
  } catch (error) {
    throw new Error("Error al insertar datos en la base de datos");
  }
};
