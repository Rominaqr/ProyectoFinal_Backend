import express from 'express';
const router = express.Router();
import { createPublicacion, getAllPublicaciones, deletePublicacionById, updatePublicacionById, getPublicacionById } from '../controllers/publicaciones_controller.js';

/**
 * @swagger
 *  components:
 *      schemas:
 *          publicaciones:
 *              type: object
 *              properties:
 *                  titulo:
 *                      type: string
 *                  imagen:
 *                      type: string
 *                  descripcion:
 *                      type: string
 *                  
 *              example:
 *                  titulo: prueba
 *                  imagen: url
 *                  descripcion: prueba
 *
 */

/**
* @swagger
* /publicaciones:
*  post:
*   summary: Crear nueva publicación
*   tags: [Publicación]
*   requestBody:
*    content:
*     application/json:
*      schema:
*        type: object
*        $ref: '#/components/schemas/publicaciones'
*   responses:
*     200:
*       description: Creación correcta.
*       content:
*          application/json:
*           schema:
*             type: object
*             $ref: '#/components/schemas/publicaciones'
*     500:
*       description: Error al intentar crear una nueva publicación.
*/

router.post('/', createPublicacion);

/**
 * @swagger
 *  components:
 *      schemas:
 *          publicaciones_comentarios_ALL:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  titulo:
 *                      type: string
 *                  imagen:
 *                      type: string
 *                  descripcion:
 *                      type: string
 *                  comentarios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       usuario:
 *                           type: string
 *                       contenido:
 *                           type: string
 *                       _id:
 *                           type: string
 *              example:
 *                 - _id: "658988e2edbf493f3fd4c737"
 *                   titulo: prueba
 *                   imagen: url
 *                   descripcion: prueba
 *                   comentarios: 
 *                    - usuario: "RQUISPE"
 *                      contenido: "adoro los colores, fascinante lugar!"
 *                      _id: "658988e2edbf493f3fd4c737"
 *                    - usuario: "RQUISPE"
 *                      _id: "658f6f0f33440fd7d46252b2"
 *                 - _id: "otroId"
 *                   titulo: "Otro Lugar"
 *                   descripcion: "Descripción del otro lugar."
 *                   imagen: "https://example.com/imagen.jpg"
 *                   comentarios: []
 *
 */

/**
* @swagger
* /publicaciones:
*  get:
*    summary: Retorna toda las publicaiones
*    tags: [Publicación]
*    responses:
*      200:
*        description: array con todas las publicaciones
*        content:
*          application/json:
*            schema:
*              type: array
*              items: 
*                $ref: '#/components/schemas/publicaciones_comentarios_ALL'
*      500:
*         description: Error al devolver todas las publicaciones.
*/
router.get('/', getAllPublicaciones);


/**
 * @swagger
 *  components:
 *      schemas:
 *          publicaciones_comentarios:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  titulo:
 *                      type: string
 *                  imagen:
 *                      type: string
 *                  descripcion:
 *                      type: string
 *                  comentarios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       usuario:
 *                           type: string
 *                       contenido:
 *                           type: string
 *                       _id:
 *                           type: string
 *              example:
 *                ejemplo1:
 *                 value:
 *                   _id: "658988e2edbf493f3fd4c737"
 *                   titulo: prueba
 *                   imagen: url
 *                   descripcion: prueba
 *                   comentarios: 
 *                    - usuario: "RQUISPE"
 *                      contenido: "adoro los colores, fascinante lugar!"
 *                      _id: "658988e2edbf493f3fd4c737"
 *                    - usuario: "RQUISPE"
 *                      _id: "658f6f0f33440fd7d46252b2"
 *                ejemplo2:
 *                  value:
 *                    _id: "otroId"
 *                    titulo: "Otro Lugar"
 *                    descripcion: "Descripción del otro lugar."
 *                    imagen: "https://example.com/imagen.jpg"
 *                    comentarios: []
 *
 */


/**
* @swagger
* /publicaciones/{id}:
*  get:
*   summary: Retorna una unica publicación
*   tags: [Publicación]
*   parameters:
*     - in: path
*       name: id
*       schema:
*         type: string
*       required: true
*       description: Id publicación
*   responses:
*     200:
*       description: Devuelve los datos de una publicación. 
*       content:
*         application/json:
*           schema:
*             type: object
*             $ref: '#/components/schemas/publicaciones_comentarios'
*     404: 
*       description: Publicación no encotrada 
*     500:
*       description: Error al devolver publicación.
*/

router.get('/:id', getPublicacionById );

/**
* @swagger
* /publicaciones/{id}:
*  delete:
*   summary: Eliminar publicación
*   tags: [Publicación]
*   parameters:
*     - in: path
*       name: id
*       schema:
*         type: string
*       required: true
*       description: Id publicación
*   responses:
*     200:
*       description: Eliminado correctamente.
*     404: 
*       description: Publicación no encontrada.
*     500:
*       description: Error al intentar eliminar un registro de la tabla de publicaciones.
*/
router.delete('/:id', deletePublicacionById );

/**
* @swagger
* /publicaciones/{id}:
*  put:
*   summary: Actualiza publicación.
*   tags: [Publicación]
*   parameters:
*     - in: path
*       name: id
*       schema:
*         type: string
*       required: true
*       description: Id publicación
*   responses:
*     200:
*       description: Actualizado correctamente.
*       content:
*         application/json:
*           schema:
*             type: object
*             $ref: '#/components/schemas/publicaciones'
*     404: 
*       description: Publicación no encontrada.
*     500:
*       description: Error al intentar eliminar un registro de la tabla de publicaciones.
*/

router.put('/:id', updatePublicacionById );

export default router;