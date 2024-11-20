import { format } from "date-fns";
import { pool } from "../db.js"; // Asegúrate de ajustar el importe a la configuración correcta de tu base de datos.

// obtener todos los eventos
export const getAllEventos = async (req, res) => {
  try {
    // Consulta para obtener todos los eventos ordenados por id ascendente
    const { rows } = await pool.query(
      "SELECT id, nombre, descripcion, fecha, ubicacion FROM eventos ORDER BY id ASC"
    );

    // Formatear la fecha de cada evento
    const eventos = rows.map((evento) => ({
      ...evento,
      fecha: format(new Date(evento.fecha), "dd-MM-yyyy"),
    }));

    // Enviar la respuesta con los eventos formateados
    res.json(eventos);
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    res.status(500).json({ message: "Error al obtener los eventos" });
  }
};
//Obtener todos los eventos

// Obtener evento por ID
export const getEventoById = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query(
      "SELECT id, nombre, descripcion, fecha, ubicacion FROM eventos WHERE id = $1",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    // Formatear la fecha del evento
    const evento = rows[0];
    evento.fecha = format(new Date(evento.fecha), "dd-MM-yyyy");

    res.json(evento);
  } catch (error) {
    console.error("Error al obtener el evento:", error);
    res.status(500).json({ message: "Error al obtener el evento" });
  }
};
//Obtener evento por ID

//Crear evento
export const createEvento = async (req, res) => {
  const { nombre, descripcion, fecha, ubicacion } = req.body;

  try {
    const { rows } = await pool.query(
      "INSERT INTO eventos (nombre, descripcion, fecha, ubicacion) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, descripcion, fecha, ubicacion]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "No se pudo crear el evento" });
    }

    // Formatear la fecha antes de enviarla en la respuesta
    const eventoCreado = rows[0];
    eventoCreado.fecha = format(new Date(eventoCreado.fecha), "dd-MM-yyyy");

    res.status(201).json(eventoCreado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el evento" });
  }
};
//Crear evento
export const deleteEvento = async (req, res) => {
  const { id } = req.params;
  const { rows, rowCount } = await pool.query(
    "DELETE FROM eventos WHERE id = $1 RETURNING *",
    [id]
  );

  if (rowCount === 0) {
    return res.status(404).json({ message: "Evento no encontrado" });
  }
  res.json({ message: "Evento eliminado correctamente" });
};

// Actualizar evento
export const updateEvento = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, fecha, ubicacion } = req.body;

  try {
    const { rows } = await pool.query(
      "UPDATE eventos SET nombre = $1, descripcion = $2, fecha = $3, ubicacion = $4 WHERE id = $5 RETURNING *",
      [nombre, descripcion, fecha, ubicacion, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    // Formatear la fecha antes de enviarla en la respuesta
    const eventoActualizado = rows[0];
    eventoActualizado.fecha = format(
      new Date(eventoActualizado.fecha),
      "dd-MM-yyyy"
    );

    res.json(eventoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el evento" });
  }
};
