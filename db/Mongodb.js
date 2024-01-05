
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/db', { useNewUrlParser: true, useUnifiedTopology: true }) 
.then(result => {console.log("Conexión exitosa de la base de datos Mongo")})
.catch(err=>{console.log(err)})

export default mongoose; 