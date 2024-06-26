const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { FILE } = require('dns');

const app = express();
const PORT = 5000;

const FILEUSUARIOS = 'Usuarios.json';
const FILEPELICULAS = 'peliculas.json';
const FILECOMENTARIOS = 'Comentarios.json';

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

let dataUsuarios = [];
let dataPeliculas = [];
let dataComentarios = [];

let contador = 0

if(!fs.existsSync(FILEUSUARIOS)) {
    fs.writeFileSync(FILEUSUARIOS, JSON.stringify(dataUsuarios));
} else {
    const fileData = fs.readFileSync(FILEUSUARIOS, 'utf-8');
    dataUsuarios = JSON.parse(fileData);
}

if(!fs.existsSync(FILEPELICULAS)) {
    fs.writeFileSync(FILEPELICULAS, JSON.stringify(dataPeliculas));
} else {
    const fileData = fs.readFileSync(FILEPELICULAS, 'utf-8');
    dataPeliculas = JSON.parse(fileData);
}

if(!fs.existsSync(FILECOMENTARIOS)) {
    fs.writeFileSync(FILECOMENTARIOS, JSON.stringify(dataComentarios));
} else {
    const fileData = fs.readFileSync(FILECOMENTARIOS, 'utf-8');
    dataComentarios = JSON.parse(fileData);
}

function updateDataUsuarios() {
    fs.writeFileSync(FILEUSUARIOS, JSON.stringify(dataUsuarios));
}

function updateDataPeliculas(){
    fs.writeFileSync(FILEPELICULAS, JSON.stringify(dataPeliculas));
}

function updateDataComentarios(){
    fs.writeFileSync(FILECOMENTARIOS, JSON.stringify(dataComentarios));
}

app.get("/usuarios", (req, res) => {
    res.json(dataUsuarios);
});

app.get("/peliculas", (req, res) => {
    res.json(dataPeliculas);
});

app.get("/comentarios", (req, res) => {
    res.json(dataComentarios);
});

app.get("/usuarios/:correo", (req, res) => {
    const correo = req.params.correo;
    const usuario = dataUsuarios.find(usuario => usuario.correo === correo);
    if(!usuario) {
        res.status(404).send({response: 'Usuario no encontrado'});
    }else {
        res.json(usuario);
    }
});

app.get("/peliculas/:titulo", (req, res) => {
    const titulo = req.params.titulo;
    const pelicula = dataPeliculas.find(pelicula => pelicula.titulo === titulo);
    if(!pelicula) {
        res.status(404).send({response: 'Pelicula no encontrada'});
    }else {
        res.json(pelicula);
    }
});

app.get("/comentarios/:titulo", (req, res) => {
    const titulo = req.params.titulo;
    const comentario = dataComentarios.find(comentario => comentario.titulo === titulo);
    if(!comentario) {
        res.status(404).send({response: 'Comentarios no encontrados'});
    }else {
        res.json(comentario);
    }
});

app.post("/usuarios", (req, res) => {
    const nuevoUsuario = req.body;
    dataUsuarios.push(nuevoUsuario);
    updateDataUsuarios();
    const response = {
        success: true,
        user: nuevoUsuario
    }
    res.json(response);
});

app.post("/peliculas", (req, res) => {
    const nuevaPelicula = req.body;
    dataPeliculas.push(nuevaPelicula);
    updateDataPeliculas();
    res.status(201).send({ response: 'Pelicula creada correctamente.'});
});

app.post("/comentarios", (req, res) => {
    const nuevoComentario = req.body;
    nuevoComentario.posicion= contador;
    dataComentarios.push(nuevoComentario);
    updateDataComentarios();
    contador = contador + 1;
    res.status(201).send({ response: 'Comentario creado correctamente.'});
});

app.put("/usuarios/:correo", (req, res) => {
    const correo = req.params.correo;
    const actualizarUsuario = req.body;
    const index = dataUsuarios.findIndex(usuario => usuario.correo === correo);
    if (index === -1) {
        res.status(404).send({response: 'Usuario no encontrado'});
    } else {
        dataUsuarios[index].nombre = actualizarUsuario.nombre;
        dataUsuarios[index].apellido = actualizarUsuario.apellido;
        dataUsuarios[index].genero = actualizarUsuario.genero;
        dataUsuarios[index].contraseña = actualizarUsuario.contraseña;
        dataUsuarios[index].fechaNacimiento = actualizarUsuario.fechaNacimiento;
        updateDataUsuarios();
        res.send({respose: 'Usuario actualizado correctamente'});
    }
});

app.put("/peliculas/:titulo", (req, res) => {
    const titulo = req.params.titulo;
    const actualizarPelicula = req.body;
    const index = dataPeliculas.findIndex(pelicula => pelicula.titulo === titulo);
    if (index === -1) {
        res.status(404).send({response: 'Pelicula no encontrada'});
    } else {
        dataPeliculas[index].titulo = actualizarPelicula.titulo;
        dataPeliculas[index].sinopsis= actualizarPelicula.sinopsis;
        dataPeliculas[index].preciodealquiler = actualizarPelicula.preciodealquiler;
        dataPeliculas[index].director = actualizarPelicula.director;
        dataPeliculas[index].añodeestreno = actualizarPelicula.añodeestreno;
        dataPeliculas[index].duracion = actualizarPelicula.duracion;
        dataPeliculas[index].genero = actualizarPelicula.genero;
        dataPeliculas[index].imagen =  actualizarPelicula.imagen;
        updateDataPeliculas();
        res.send({respose: 'Usuario actualizado correctamente'});
    }
});

app.put("/comentarios/:posicion", (req, res) => {
    const posicion = parseInt(req.params.posicion, 10);
    const actualizarComentario = req.body;
    const index = dataComentarios.findIndex(comentario => comentario.posicion === posicion);
    if (index === -1) {
        res.status(404).send({response: 'Comentario no encontrada'});
    } else {
        dataComentarios[index].titulo = actualizarComentario.titulo;
        dataComentarios[index].persona = actualizarComentario.persona;
        dataComentarios[index].texto= actualizarComentario.texto;
        updateDataComentarios();
        res.send({respose: 'Comentario editado correctamente'});
    }
});


app.delete('/usuarios/:correo', (req, res) => {
    const correo = req.params.correo;
    const index = dataUsuarios.findIndex(usuario => {
        if (usuario.correo === correo) {
            console.log("Usuario encontrado")
            return usuario
        }
    });
    if (index === -1) {
        res.status(404).send({response: 'Usuario no encontrado'});
    } else {
        dataUsuarios.splice(index, 1);
        updateDataFile();
        res.send({response: 'Usuario eliminado correctamente'});
    }
});

app.delete('/peliculas/:titulo', (req, res) => {
    const titulo = req.params.titulo;
    const index = dataPeliculas.findIndex(pelicula => {
        if (pelicula.titulo === titulo) {
            console.log("Pelicula encontrada")
            return pelicula
        }
    });
    if (index === -1) {
        res.status(404).send({response: 'Pelicula no encontrada'});
    } else {
        dataPeliculas.splice(index, 1);
        updateDataPeliculas();
        res.send({response: 'Pelicula eliminada correctamente'});
    }
});

app.post('/login', (req, res) => {
    const data = req.body;
    console.log(data)
    const usuario = dataUsuarios.find(usuario => {
        console.log(usuario.correo)
        console.log(usuario.contraseña)
        if (usuario.correo === data.correo && usuario.contraseña === data.contraseña) {
            return usuario
        }
    });
    if (!usuario) {
        const response = {
            success: false,
            user: null
        }
        res.status(404).send(response);
    } else {
        const response = {
            success: true,
            user: usuario
        }
        res.json(response);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})