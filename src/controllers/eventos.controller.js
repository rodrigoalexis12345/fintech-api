import { pool } from "../db.js"; // Asegúrate de ajustar el importe a la configuración correcta de tu base de datos.

export const getAllEventos = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM eventos");
  res.json(rows);
};

export const getEventoById = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query("SELECT * FROM eventos WHERE id = $1", [
    id,
  ]);

  if (rows.length === 0) {
    return res.status(404).json({ message: "Evento no encontrado" });
  }
  res.json(rows[0]);
};

export const createEvento = async (req, res) => {
  const { nombre, descripcion, fecha, ubicacion } = req.body;
  const { rows } = await pool.query(
    "INSERT INTO eventos (nombre, descripcion, fecha, ubicacion) VALUES ($1, $2, $3, $4) RETURNING *",
    [nombre, descripcion, fecha, ubicacion]
  );
  res.json(rows[0]);
};

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

export const updateEvento = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, fecha, ubicacion } = req.body;
  const { rows } = await pool.query(
    "UPDATE eventos SET nombre = $1, descripcion = $2, fecha = $3, ubicacion = $4 WHERE id = $5 RETURNING *",
    [nombre, descripcion, fecha, ubicacion, id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Evento no encontrado" });
  }
  res.json(rows[0]);
};
