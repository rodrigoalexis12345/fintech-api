import { pool } from "../db.js"; // Asegúrate de que el importe de la configuración de la base de datos sea correcto.

export const getAllColaboraciones = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM colaboraciones");
  res.json(rows);
};

export const getColaboracionById = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    "SELECT * FROM colaboraciones WHERE id = $1",
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Colaboración no encontrada" });
  }
  res.json(rows[0]);
};

export const createColaboracion = async (req, res) => {
  const data = req.body;
  const { rows } = await pool.query(
    "INSERT INTO colaboraciones (nombre, email, tipo_colaboracion, mensaje) VALUES ($1, $2, $3, $4) RETURNING *",
    [data.nombre, data.email, data.tipo_colaboracion, data.mensaje]
  );
  res.json(rows[0]);
};

export const deleteColaboracion = async (req, res) => {
  const { id } = req.params;
  const { rows, rowCount } = await pool.query(
    "DELETE FROM colaboraciones WHERE id = $1 RETURNING *",
    [id]
  );

  if (rowCount === 0) {
    return res.status(404).json({ message: "Colaboración no encontrada" });
  }
  res.json({ message: "Colaboración eliminada correctamente" });
};

export const updateColaboracion = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { rows } = await pool.query(
    "UPDATE colaboraciones SET nombre = $1, email = $2, tipo_colaboracion = $3, mensaje = $4 WHERE id = $5 RETURNING *",
    [data.nombre, data.email, data.tipo_colaboracion, data.mensaje, id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Colaboración no encontrada" });
  }
  res.json(rows[0]);
};
