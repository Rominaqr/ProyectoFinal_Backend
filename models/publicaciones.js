
import mongoose from "../db/Mongodb.js"
import { comentariosSchema } from "../models/comentarios.js"

const publicacionesSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagen: String,
    usuario: { type: String},
    comentarios: [comentariosSchema]
});

const publicacionesModel = mongoose.model("publicaciones", publicacionesSchema);

export default publicacionesModel