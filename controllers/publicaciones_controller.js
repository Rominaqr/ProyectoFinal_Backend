
import publicacionesModel from '../models/publicaciones.js';
import comentariosModel from '../models/comentarios.js';

// Create a new publicacion
const createPublicacion = async (req, res) => {
    try {
        const publicacion = new publicacionesModel({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen
            /*comentarios: req.body.comentarios*/
            /* [
                 {
                     usuario: req.body.comentarios.usuario,
                     contenido: req.body.comentarios.contenido
                 }
             ]*/

        })

        if (req.body.comentarios) {
            const comentario = new comentariosModel(

                {
                    usuario: req.body.comentarios[0].usuario,
                    contenido: req.body.comentarios[0].contenido
                }

            );

            // Agregar el comentario a la publicación y guardarlo por separado
            publicacion.comentarios.push(comentario);
            const docomentario = await comentario.save();

        }

        const documento = await publicacion.save()
        res.json(documento)

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating the publicaciones' });

    }
}

// Retrieve all publicaciones
const getAllPublicaciones = async (req, res) => {
    try {
        const publicacion = await publicacionesModel.find()
        res.json(publicacion)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving the publicacion' });
    }

};

// Retrieve a single publicacion by ID
const getPublicacionById = async (req, res) => {

    try {
        const publicacion = await publicacionesModel.findById(req.params.id)


        if (publicacion === null) {
            res.status(404).json({ error: 'Publicación not found' });
        } else {
            res.status(200).json(publicacion);
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving publicación' });
    }
};


// Update a publicación by ID using PUT
const updatePublicacionById = async (req, res) => {

    try {
        const publicacion = await publicacionesModel.updateOne({ _id: req.params.id }, req.body)

       /* if (publicacion.modifiedCount === 0) {
            return res.status(404).json({ error: 'publicación not found' });
        }*/

        res.status(200).json(publicacion);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating publicación' });
    }
};


const deletePublicacionById = async (req, res) => {
    const publicacionId = req.params.id;
    try {
        const publicacion = await publicacionesModel.deleteOne({ _id: publicacionId })
        if (publicacion.deletedCount === 0) {
            return res.status(404).json({ error: 'Publicacion not found' });
        }
        res.json(publicacion)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting publicación' });
    }

};

export { createPublicacion, getAllPublicaciones, deletePublicacionById, updatePublicacionById, getPublicacionById }
