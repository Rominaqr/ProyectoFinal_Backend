
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const TokenMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'No posee Token' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, usuario) => {
      if (err) {
        return res.status(401).json({ message: 'Token invalido' });
      }

      req.user = usuario;

      next();
    });
  } catch (err) {
    console.log("Token invalido");
    /*throw new Error(`HTTP error! Status: ${res.status}`);*/
    return res.status(401).json({ message: 'Token invalido' });
  }

};

export default TokenMiddleware;