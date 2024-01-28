import publicacionesModel from '../models/publicaciones.js';
import comentariosModel from '../models/comentarios.js';

const agregarComentario = async (req, res) => {
    try {
        const usuario = req.user.usuario; /*se obtiene del Midddleware del token*/
        const publicacionId = req.body.publicacionId;
        const contenido = req.body.contenido;

        /*const { publicacionId, usuario, contenido } = req.body;*/


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



const eliminarComentario = async (req, res) => {

    const idComentario = req.params.idComentario;
    const idPublicacion = req.params.idPublicacion;
    try {
        const publicacion = await publicacionesModel.updateOne(
            { _id: idPublicacion },
            { $pull: { comentarios: { _id: idComentario } } });

        if (publicacion.modifiedCount === 1) {
            const comentario = await comentariosModel.deleteOne({ _id: idComentario });
            res.status(200).json(publicacion);

        } else {
            res.status(400).json({ error: 'No se encontró la publicación o comentario.' });
        }

    } catch (err) {

        res.status(500).json({ error: 'Error deleting Comentario' });
    }
};

export { agregarComentario, eliminarComentario }