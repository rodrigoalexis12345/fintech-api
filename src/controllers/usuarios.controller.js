import { pool } from "../db.js"; // Asegúrate de que el importe de la configuración de la base de datos sea correcto.

export const getAllUsuarios = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM usuarios");
  res.json(rows);
};

export const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query("SELECT * FROM usuarios WHERE id = $1", [
    id,
  ]);

  if (rows.length === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json(rows[0]);
};

export const createUsuario = async (req, res) => {
  const { nombre, email, mensaje } = req.body;
  const { rows } = await pool.query(
    "INSERT INTO usuarios (nombre, email, mensaje) VALUES ($1, $2, $3) RETURNING *",
    [nombre, email, mensaje]
  );
  res.json(rows[0]);
};

export const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  const { rows, rowCount } = await pool.query(
    "DELETE FROM usuarios WHERE id = $1 RETURNING *",
    [id]
  );

  if (rowCount === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json({ message: "Usuario eliminado correctamente" });
};

export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, mensaje } = req.body;
  const { rows } = await pool.query(
    "UPDATE usuarios SET nombre = $1, email = $2, mensaje = $3 WHERE id = $4 RETURNING *",
    [nombre, email, mensaje, id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json(rows[0]);
};
