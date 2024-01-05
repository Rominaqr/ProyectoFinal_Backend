import express from 'express';
const router = express.Router();
import {agregarComentario} from '../controllers/comentarios_controller.js';

/**
 * @swagger
 *  components:
 *      schemas:
 *          comentarios:
 *              type: object
 *              properties:
 *                  publicacionId:
 *                      type: string
 *                  usuario:
 *                      type: string
 *                  contenido:
 *                      type: string
 *                  
 *              example:
 *                  publicacionId: 658988e2edbf493f3fd4c737
 *                  usuario: rquispe
 *                  contenido: prueba
 *
 */

/**
* @swagger
* /Comentarios:
*  post:
*   summary: Agregar comentario a una publicación
*   tags: [Comentario]
*   requestBody:
*    content:
*     application/json:
*      schema:
*        type: object
*        $ref: '#/components/schemas/comentarios'
*   responses:
*     200:
*       description: Creación correcta.
*       content:
*          application/json:
*           schema:
*             type: object
*             $ref: '#/components/schemas/comentarios'
*     500:
*       description: Error al intentar insertar comentario a una publicación.
*/

router.post('/', agregarComentario);

export default router;