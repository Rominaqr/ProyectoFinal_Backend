import mongoose from "../db/Mongodb.js"

const comentariosSchema = new mongoose.Schema({
    usuario: { type: String/*, required: true*/ },
    contenido: { type: String/*, required: true */}
});

const comentariosModel = mongoose.model("comentarios", comentariosSchema);

export default comentariosModel
export { comentariosSchema }