const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());


//CREAMOS LA CONEXION CON LA BASE DE DATOS
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "libreria"
});

//RUTA PARA REGISTRAR UNA NUEVA AREA
//Ruta: http://localhost:3002/crearAreas
app.post("/crearArea", (req, res) =>{
    const nombre = req.body.nombre;
    const ubicacion = req.body.ubicacion;

    const queryCheck = 'SELECT * FROM areas where Nombre = ? and Ubicacion = ?;';
    db.query(queryCheck, [nombre, ubicacion], (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send("ERROR EN LA BASE DE DATOS!");
        } else {
            if(result.length > 0){
                return res.status(409).json({message: 'El nombre de esa ubicacion ya se encuentra en la base de datos!, por favor eliga otro nombre o ubicacion.'});
            } else {
                const queryInsert = 'INSERT INTO areas (nombre, ubicacion) values (?,?);';
                db.query(queryInsert, [nombre, ubicacion], (err, result) => {
                    if(err){
                        console.log(err);
                        res.status(500).send("Error en registrar la nueva area!");
                    } else {
                        res.json({message: "Area registrada con exito!"});
                    }
                });
            }
        }
    }); 
});

//RUTA PARA ENLISTAR TODAS LAS AREAS
//Ruta: http://localhost:3002/mostrarAreas
app.get("/mostrarAreas", (req, res) => {
    const queryObtain = "SELECT id, Nombre, Ubicacion FROM areas WHERE activo = 1;";

    db.query(queryObtain, (err, result) => {
        if(err){
            console.log("ERROR EN LA BASE DE DATOS!");
            return res.status(500).json({success: false, message: "Error en la base de datos!"});
        } 
        res.json(result);
    });
});

//RUTA PARA MODIFICAR UNA AREA 
//Ruta: http://localhost:3002/modificarArea
app.put("/modificarArea", (req, res) =>{

    const id = req.body.id;
    const nombre = req.body.Nombre;
    const ubicacion = req.body.Ubicacion;
    const query = "UPDATE areas SET Nombre = ?, Ubicacion = ? where id = ?;";

    db.query( query, [nombre, ubicacion, id], (err, result) =>{
        if(err){
            console.log("Error en la base de datos!");
            return res.status(500).json({success: false, message: "Error en la base de datos!"});
        } else {
            console.log("Area midificada!");
            res.json({succes: true, message:"Area modificada con exito!"});
        }
    });

});

//RUTA PARA ELIMINAR UNA AREA
app.put("/eliminarArea", (req, res) => {
    const id = req.body.id;
    const query = "UPDATE areas SET activo = 0 WHERE id = ?;";

    db.query(query, [id], (err, result) =>{
        if(err){
            console.log("Error en la base de datos!");
            return res.status(500).json({succes: false, message: "Error en la base de datos!"});
        } else {
            console.log("Area Eliminada!");
            res.json({succes: true, message: "Area eliminada exitosamente!"});
        }
    });
});

//RUTA PARA MOSTRAR TODOS LIBROS
//Ruta: http://localhost:3002/mostrarLibros
app.get("/mostrarLibros", (req, res) => {
    const query = `SELECT 
                    l.id, 
                    l.NombreCorto, 
                    l.Descripcion, 
                    l.Serie, 
                    l.Color, 
                    l.FechaAdquisicion, 
                    l.TipoAdquisicion, 
                    l.Observaciones, 
                    a.Nombre AS Areas
                FROM libro l
                JOIN areas a ON l.areas_id = a.id
                    where l.activo = 1
                ;`;
    db.query( query, (err, result) => {
        if(err){
            console.log("Error en la base de datos!");
            return res.status(500).json({succes: false, message: "Error en la base de datos!"});
        }
        res.json(result);
    });
});

//RUTA PARA INGRESAR UN NUEVO LIBRO
//Ruta: http://localhost:3002/agregarLibro
app.put("/agregarLibro", (req, res) => {
    const {
      NombreCorto,
      Descripcion,
      Serie,
      Color,
      FechaAdquisicion,
      TipoAdquisicion,
      Observaciones,
      areaNombre,
    } = req.body;
  
    const queryIdArea = "SELECT id FROM areas WHERE nombre = ?";
  
    db.query(queryIdArea, [areaNombre], (err, result) => {
      if (err) {
        console.log("Error en la base de datos (queryIdArea):", err); 
        return res.status(500).json({ success: false, message: "Error en la base de datos!" });
      }

      if (result.length === 0) {
        console.log("Área no encontrada.");
        return res.status(404).json({ success: false, message: "Área no encontrada." });
      }
  
      const areas_id = result[0].id;
      console.log("ID del área:", areas_id); 
  
      datoRepetido(areas_id);
    });
  
    function datoRepetido(areas_id) {
      const queryCheck = "SELECT * FROM libro WHERE NombreCorto = ? AND Descripcion = ? AND Serie = ? AND Color = ? AND FechaAdquisicion = ? AND TipoAdquisicion = ? AND Observaciones = ? AND areas_id = ?;";
  
      db.query(queryCheck, [NombreCorto, Descripcion, Serie, Color, FechaAdquisicion, TipoAdquisicion, Observaciones, areas_id], (err, result) => {
        if (err) {
          console.log("Error en la base de datos (queryCheck):", err);
          return res.status(500).json({ success: false, message: "Error en la base de datos!" });
        }
  
        if (result.length === 0) {
          insertLibro(areas_id);
        } else {
          console.log("El libro ya existe.");
          res.status(400).json({ success: false, message: "El libro ya existe." });
        }
      });
    }
  
    function insertLibro(areas_id) {
      const query = `INSERT INTO libro (NombreCorto, Descripcion, Serie, Color, FechaAdquisicion, TipoAdquisicion, Observaciones, activo, areas_id) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
      console.log("Datos para insertar libro:", [NombreCorto, Descripcion, Serie, Color, FechaAdquisicion, TipoAdquisicion, Observaciones, 1, areas_id]);
  
      db.query(query, [NombreCorto, Descripcion, Serie, Color, FechaAdquisicion, TipoAdquisicion, Observaciones, 1, areas_id], (err, result) => {
        if (err) {
          console.log("Error en la base de datos (insertLibro):", err); 
          return res.status(500).json({ success: false, message: "Error en la base de datos!" });
        } else {
          console.log("Libro insertado con éxito!");
          res.json({ success: true, message: "Libro insertado con éxito!" });
        }
      });
    }
  });
  
  

//RUTA PARA MODIFICAR EL LIBRO
//Ruta: http://localhost:3002/modificarLibro
app.put("/modificarLibro", (req, res) => {
    const { id, NombreCorto, Descripcion, Serie, Color, FechaAdquisicion, TipoAdquisicion, Observaciones, areaNombre } = req.body;

    // Consultar el ID del área
    const queryIdArea = "SELECT id FROM areas WHERE Nombre = ?";

    db.query(queryIdArea, [areaNombre], (err, result) => {
        if (err) {
            console.log("Error en la base de datos!");
            return res.status(500).json({ success: false, message: "Error en la base de datos!" });
        }

        // Si no se encuentra el área, retornar un error
        if (result.length === 0) {
            console.log("Área no encontrada.");
            return res.status(404).json({ success: false, message: "Área no encontrada." });
        }

        // Si se encuentra el área, pasamos el id del área a la función de modificación del libro
        modificarLibro(result[0].id);
    });

    // Función para modificar el libro en la base de datos
    function modificarLibro(area_id) {
        const query = `
            UPDATE libro
            SET 
                NombreCorto = ?, 
                Descripcion = ?, 
                Serie = ?, 
                Color = ?, 
                FechaAdquisicion = ?, 
                TipoAdquisicion = ?, 
                Observaciones = ?, 
                areas_id = ?
            WHERE id = ?;
        `;

        db.query(query, [NombreCorto, Descripcion, Serie, Color, FechaAdquisicion, TipoAdquisicion, Observaciones, area_id, id], (err, result) => {
            if (err) {
                console.log("Error en la base de datos!", err);
                return res.status(500).json({ success: false, message: "Error en la base de datos!" });
            } else {
                console.log("Libro modificado exitosamente!");
                res.json({ success: true, message: "Libro modificado exitosamente!" });
            }
        });
    }
});



//RUTA PARA ELIMINAR LOS LIBROS 
//Ruta: http://localhost:3002/eliminarLibro
app.put("/eliminarLibro", (req, res) => {
    const id = req.body.id;

    const query = "UPDATE libro SET activo = 0 where id = ?;";

    db.query( query, [id], (err, result) => {
        if(err){
            console.log("Error en la base de datos!");
            res.status(500).json({succes: false, message: "Error en la base de datos!"});
        } else {
            console.log("Libro eliminado exitosamente!");
            res.json({succes: true, message: "Libro eliminado exitosamente!"});
        }
    });
});

//RUTA PARA MOSTRAR TODOS LOS NOMBRES DE LAS AERAS
//Ruta: http://localhost:3002/listaAreas
app.get( "/listaAreas", (req, res) => {
    const query = "SELECT Nombre FROM areas where activo = 1;";

    db.query( query, (err, result) => {
        if(err){
            console.log("Error en la base de datos!");
            res.status(500).json({succes: false, message: "Error en la base de datos!"});
        } 
        res.json(result);
    });
});

//ACTIVAMOS EL SERVIDOR EN EL PUEROT 3001
app.listen(3002, () =>{
    console.log("Corriendo el servidor en el puerto 3002!")
});