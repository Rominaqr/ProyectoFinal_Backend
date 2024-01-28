import usuariosModel from "../models/usuarios.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const createUsuarios = async (req, res) => {
    try {
        const usuario = new usuariosModel({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            usuario: req.body.usuario,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        })

        const dato = await usuario.save()
        res.json(dato)

    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            res.status(400).send({ message: "El email ya está registrado.'", stack: err.stack })
        } else {
            if (err.code === 11000 && err.keyPattern && err.keyPattern.usuario) {
                res.status(400).send({ message: "El usuario ya está registrado.", stack: err.stack });
            } else {
                res.status(500).send({ message: "Error creando usuario.", stack: err.stack });
            }
        }
    }
}

const getUsuarioByEmail = async (req, res) => {

    try {
        /*const email = new $regex(req.params.email);*/
        const usuario = await usuariosModel.findOne({ email: { $regex: req.params.email, $options: 'i' } })

        if (usuario === null) {
            res.status(404).json({ error: 'usuario not found' });
        } else {
            res.status(200).json(usuario);
        }

    } catch (err) {
        res.status(500).json({ error: 'Error retrieving usuario.' });
    }
};

const getLogin = async (req, res) => {

    try {
        const email = req.params.email;
        const password = req.params.password;
        const usuario = await usuariosModel.findOne({ email: { $regex: email, $options: 'i' } })

        if (usuario === null) {
            res.status(404).json({ error: 'usuario no encontrado.' });
        } else {
            const isPasswordMatch = await bcrypt.compare(password, usuario.password);

            if (isPasswordMatch) {
                /*si password es correcta devuelvo token*/
                const secret_key = process.env.SECRET_KEY;
                const token = jwt.sign({ email: usuario.email, usuario: usuario.usuario }, secret_key, { expiresIn: '1h' })
                res.status(200).json({ usuario: usuario.usuario, nombre: usuario.nombre, apellido: usuario.apellido, token: token });
            } else {
                res.status(404).json({ error: 'Password incorrecta' });
            }
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al mostrar usuario.' });
    }
};



export { createUsuarios, getUsuarioByEmail, getLogin }