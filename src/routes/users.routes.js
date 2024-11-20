import { Router } from "express";
import {
  createColaboracion,
  deleteColaboracion,
  getAllColaboraciones,
  getColaboracionById,
  updateColaboracion,
} from "../controllers/colaboracion.controllers.js"; //Nombre del controler
//Eventos
import {
  createEvento,
  deleteEvento,
  getAllEventos,
  getEventoById,
  updateEvento,
} from "../controllers/eventos.controller.js";
//Eventos
//Proyectos
import {
  createProyecto,
  deleteProyecto,
  getAllProyectos,
  getProyectoById,
  updateProyecto,
} from "../controllers/proyectos.controller.js";
//Proyectos

//Usuarios
import {
  createUsuario,
  deleteUsuario,
  getAllUsuarios,
  getUsuarioById,
  updateUsuario,
} from "../controllers/usuarios.controller.js";
//Usuarios
const router = Router();

router.get("/colaboraciones", getAllColaboraciones);
router.get("/colaboraciones/:id", getColaboracionById);
router.post("/colaboraciones", createColaboracion);
router.delete("/colaboraciones/:id", deleteColaboracion);
router.put("/colaboraciones/:id", updateColaboracion);

// Ruta para obtener todos los eventos
router.get("/eventos", getAllEventos);
// Ruta para obtener un evento por ID
router.get("/eventos/:id", getEventoById);
// Ruta para crear un nuevo evento
router.post("/eventos", createEvento);
// Ruta para eliminar un evento por ID
router.delete("/eventos/:id", deleteEvento);
// Ruta para actualizar un evento por ID
router.put("/eventos/:id", updateEvento);

//Proyectos
router.get("/proyectos", getAllProyectos);
router.get("/proyectos/:id", getProyectoById);
router.post("/proyectos", createProyecto);
router.delete("/proyectos/:id", deleteProyecto);
router.put("/proyectos/:id", updateProyecto);
//proyectos

//usuarios
router.get("/usuarios", getAllUsuarios);
router.get("/usuarios/:id", getUsuarioById);
router.post("/usuarios", createUsuario);
router.delete("/usuarios/:id", deleteUsuario);
router.put("/usuarios/:id", updateUsuario);
//usuarios
export default router;
