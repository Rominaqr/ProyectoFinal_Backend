import publicacionesModel from '../models/publicaciones.js';
import comentariosModel from '../models/comentarios.js';

const agregarComentario = async (req, res) => {
    try {
        const { publicacionId, usuario, contenido } = req.body;

        const publicacion = await publicacionesModel.findById(publicacionId);

        if (!publicacion) {
            return res.status(404).json({ error: 'Publicación no encontrada' });
        }

        const nuevoComentario = new comentariosModel({
            usuario,
            contenido
        });

        const comentario = await nuevoComentario.save();

        publicacion.comentarios.push(comentario);
        await publicacion.save();

        res.status(201).json({ mensaje: 'Comentario agregado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el comentario' });
    }
};

export {agregarComentario}