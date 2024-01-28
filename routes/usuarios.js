import express from 'express';
import { createUsuarios, getUsuarioByEmail, getLogin } from '../controllers/usuarios_controller.js';
const router = express.Router();

router.post('/', createUsuarios);
router.get('/:email', getUsuarioByEmail);
router.get('/:email/:password', getLogin);

export default router;