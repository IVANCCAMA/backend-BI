const { default: mongoose } = require("mongoose");

const AttModel = require("../schemas/att.model");

exports.get = async () => {
  return await AttModel.find({}).sort({ _id: 1 });
};

/* exports.search = async (fecha) => {
  const regex = new RegExp(fecha, "i");
  return AttModel.find({ fecha: regex });
}; */

exports.add = async (data) => {
  const createdDataAtt = new AttModel(data);
  const newData = await createdDataAtt.save();
  return newData;
};

/* exports.edit = async (id_level, level) => {
  const levelDB = await AttModel.findById(id_level);
  const newLevel = await AttModel.findByIdAndUpdate(id_level, level, {
    new: true,
  });
  return newLevel;
}; */

/* exports.delete = async (id_data) => {
  const DataDB = await AttModel.findById(id_data);
  if (!DataDB) throw { status: 400, message: "El data no existe" };
  return await AttModel.findByIdAndUpdate(id_data, { new: true });
};
 */
