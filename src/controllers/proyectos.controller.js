import { pool } from "../db.js"; // Asegúrate de que el importe de la configuración de la base de datos sea correcto.

export const getAllProyectos = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM proyectos");
  res.json(rows);
};

export const getProyectoById = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query("SELECT * FROM proyectos WHERE id = $1", [
    id,
  ]);

  if (rows.length === 0) {
    return res.status(404).json({ message: "Proyecto no encontrado" });
  }
  res.json(rows[0]);
};

export const createProyecto = async (req, res) => {
  const { nombre, descripcion } = req.body;
  const { rows } = await pool.query(
    "INSERT INTO proyectos (nombre, descripcion) VALUES ($1, $2) RETURNING *",
    [nombre, descripcion]
  );
  res.json(rows[0]);
};

export const deleteProyecto = async (req, res) => {
  const { id } = req.params;
  const { rows, rowCount } = await pool.query(
    "DELETE FROM proyectos WHERE id = $1 RETURNING *",
    [id]
  );

  if (rowCount === 0) {
    return res.status(404).json({ message: "Proyecto no encontrado" });
  }
  res.json({ message: "Proyecto eliminado correctamente" });
};

export const updateProyecto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  const { rows } = await pool.query(
    "UPDATE proyectos SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *",
    [nombre, descripcion, id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Proyecto no encontrado" });
  }
  res.json(rows[0]);
};
