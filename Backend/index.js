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
const FILEPELICULASRENTADAS = 'peliculasRentadas.json';
const FILEPELICULASSINRENTAR = 'peliculasSinRentar.json';
const FILEHISTORIAL = 'historial.json';

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

let dataUsuarios = [];
let dataPeliculas = [];
let dataComentarios = [];
let dataPeliculasRentas = [];
let dataPeliculasSinRentar = [];
let dataHistorial = [];

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

if(!fs.existsSync(FILEPELICULASRENTADAS)) {
    fs.writeFileSync(FILEPELICULASRENTADAS, JSON.stringify(dataPeliculasRentas));
} else {
    const fileData = fs.readFileSync(FILEPELICULASRENTADAS, 'utf-8');
    dataPeliculasRentas = JSON.parse(fileData);
}

if(!fs.existsSync(FILEPELICULASSINRENTAR)) {
    fs.writeFileSync(FILEPELICULASSINRENTAR, JSON.stringify(dataPeliculasSinRentar));
} else {
    const fileData = fs.readFileSync(FILEPELICULAS, 'utf-8');
    const fileDataExiste = fs.readFileSync(FILEPELICULASSINRENTAR, 'utf-8');
    const contenido = fs.statSync(FILEPELICULASSINRENTAR);
    if (contenido.size === 2) {
        dataPeliculasSinRentar = JSON.parse(fileData);
    } else {
        dataPeliculasSinRentar = JSON.parse(fileDataExiste);
    }
    
}

if(!fs.existsSync(FILEHISTORIAL)) {
    fs.writeFileSync(FILEHISTORIAL, JSON.stringify(dataHistorial));
} else {
    const fileData = fs.readFileSync(FILEHISTORIAL, 'utf-8');
    dataHistorial = JSON.parse(fileData);
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

function updateDataPeliculasRentadas(){
    fs.writeFileSync(FILEPELICULASRENTADAS, JSON.stringify(dataPeliculasRentas));
}

function updateDataPeliculasSinRentar(){
    fs.writeFileSync(FILEPELICULASSINRENTAR, JSON.stringify(dataPeliculasSinRentar));
}

function updateDataHistorial(){
    fs.writeFileSync(FILEHISTORIAL, JSON.stringify(dataHistorial));
}

app.get("/usuarios", (req, res) => {
    res.json(dataUsuarios);
});

app.get("/peliculas", (req, res) => {
    res.json(dataPeliculasSinRentar);
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
    nuevoComentario.posicion = contador;
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

app.delete('/comentarios/:posicion', (req, res) => {
    const posicion = parseInt(req.params.posicion, 10);
    const index = dataComentarios.findIndex(comentario => {
        if (comentario.posicion === posicion) {
            return comentario
        }
    });
    if (index === -1) {
        res.status(404).send({response: 'Comentario no encontrado'});
    } else {
        dataComentarios.splice(index, 1);
        updateDataComentarios();
        res.send({response: 'Comentario eliminado correctamente'});
    }
});

app.post('/login', (req, res) => {
    const data = req.body;
    const usuario = dataUsuarios.find(usuario => {
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

app.post('/rentar/:titulo', (req, res) => {
    const titulo = req.params.titulo;
    const data = req.body;
    const pelicula = dataPeliculasRentas.find(pelicula => pelicula.titulo === titulo);

    if (pelicula) {
        res.status(404).send({response: 'Pelicula fuera de renta'});
        return;
    }

    const personaAlquilando = dataPeliculasRentas.some(pelicula => pelicula.persona === data.persona);

    if (personaAlquilando) {
        res.status(404).send({response: 'Usted ya ha alquilado una pelicula'});
        return;
    }

    const rentada = dataPeliculasSinRentar.findIndex(pelicula => pelicula.titulo === titulo)

    dataPeliculasSinRentar.splice(rentada, 1)
    updateDataPeliculasSinRentar()

    data.titulo = titulo;
    dataPeliculasRentas.push(data);
    updateDataPeliculasRentadas();

    const fechaActual = new Date();
    const fecha = fechaActual.toLocaleString();

    const Fecha48 = new Date(fechaActual.getTime() + 48 * 60 * 60 * 1000);
    const fecha48 = Fecha48.toLocaleString();

    data.fechaInicio = fecha;
    data.fechaFin = fecha48;
    data.estado = "En alquiler";
    dataHistorial.push(data);
    updateDataHistorial();
    
    res.status(202).send({response: "Pelicula rentada correctamente", data: dataPeliculasSinRentar});
    
});

app.delete('/devolver/:titulo', (req, res) => {
    const titulo = req.params.titulo;
    const index = dataHistorial.findIndex(pelicula => pelicula.titulo === titulo);
    const pelicula = dataPeliculas.find(pelicula => pelicula.titulo === titulo)
    if (index === -1) {
        res.status(404).send({response: 'Pelicula no encontrada'});
    } 

    const peliculaHistorial = dataHistorial[index];
    const peliculaRentasIndex = dataPeliculasRentas.findIndex(pelicula => pelicula.titulo === titulo);

    if (peliculaRentasIndex === -1) {
        return res.status(404).send({ response: 'Pelicula no encontrada en rentas' });
    }

    const moment = require('moment');
    const fechaActual = moment();
    let mora = 0;

    const fechaInicio = peliculaHistorial.fechaInicio

    const fechaInicioMoment = moment(fechaInicio, 'DD/M/YYYY, h:mm:ss a');

    if (fechaInicioMoment.isValid()) {
        const diferenciaMilisegundos = fechaActual.diff(fechaInicioMoment);
        const diferenciaDias = fechaActual.diff(fechaInicioMoment, 'days');

        if (diferenciaDias >= 2) {
            const diasAdicionales = diferenciaDias - 1;
            mora = diasAdicionales * 5;
            peliculaHistorial.estado = "Devuelto tarde"
        } else {
            peliculaHistorial.estado = "Devuelto"
        }
    } else {
        console.log('Fecha de inicio no válida');
    }
    const fechaFormato = moment(fechaActual);
    const fechaFormateada = fechaFormato.format('DD/MM/YYYY, h:mm:ss a');
    peliculaHistorial.fechaEntrega = fechaFormateada;
    peliculaHistorial.mora = mora;
    peliculaHistorial.precioTotal = peliculaHistorial.precioAlquiler + mora;
    updateDataHistorial();

    dataPeliculasSinRentar.push(pelicula);
    updateDataPeliculasSinRentar();

    dataPeliculasRentas.splice(peliculaRentasIndex, 1);
    updateDataPeliculasRentadas();

    res.json({ response: 'Pelicula devuelta correctamente'});
});

app.get('/historial', (req, res) => {
    res.json(dataHistorial);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})